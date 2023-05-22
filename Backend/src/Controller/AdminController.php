<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Response;
use App\Entity\Usuario;
use App\Entity\Alumno;
use App\Entity\Curso;
use App\Entity\Sesion;
use App\Entity\Matricula;
use App\Entity\Asistencia;
use DateTime;
use Symfony\Component\HttpFoundation\Request;


class AdminController extends AbstractController
{

    //Mostrar los cursos
    #[Route("/admin/cursos", name: "admin_lista_cursos", methods: ["GET"])]
    public function mostrarCursos(ManagerRegistry $doctrine): Response
    {
        $cursos = $doctrine
            ->getRepository(Curso::class)
            ->findAll();

        $data = [];

        foreach ($cursos as $curso) {
            $data[] = [
                'id' => $curso->getId(),
                'nombre' => $curso->getNombre(),
                'fecha_inicio' => $curso->getFechaInicio()->format('Y-m-d'),    //Devuelvo en formato diferente
                'fecha_fin' => $curso->getFechaFin()->format('Y-m-d'),
                'precio' => $curso->getPrecio(),
                'estado' => $curso->getEstado()
            ];
        }

        return $this->json($data);
    }

    //Mostrar Curso por id
    #[Route("/admin/curso/{id}", name: "admin_curso_por_id", methods: ["GET"])]
    public function mostrarCurso(ManagerRegistry $doctrine, int $id): Response
    {
        $curso = $doctrine->getRepository(Curso::class)->find($id);

        if (!$curso) {

            return $this->json('Ningun Curso encontrado con id ' . $id, 404);
        }

        $data = [
            'id' => $curso->getId(),
            'nombre' => $curso->getNombre(),
            'fecha_inicio' => $curso->getFechaInicio()->format('Y-m-d'),    //Devuelvo en formato diferente
            'fecha_fin' => $curso->getFechaFin()->format('Y-m-d'),
            'precio' => $curso->getPrecio(),
            'estado' => $curso->getEstado()
        ];

        return $this->json($data);
    }

    //Crear un nuevo curso y sus sesiones
    #[Route("/admin/addCurso", name: "admin_add_curso", methods: ["POST"])]
    public function newCurso(ManagerRegistry $doctrine, Request $request): Response
    {
        $entityManager = $doctrine->getManager();

        //Recogemos los datos que vienen en la Request
        $jsonData = $request->getContent();
        $data = json_decode($jsonData);
        $nombre = $data->nombre;
        $estado = $data->estado;
        $id_monitor = $data->monitor;
        $tipo = $data->tipo;
        $hora = $data->hora;

        //Transformamos la fecha de inicio
        $fechaString = $data->fecha_inicio;
        $timestamp = strtotime($fechaString);
        $fecha_inicio = new DateTime();
        $fecha_inicio->setTimestamp($timestamp);

        //Transformamos la fecha de fin
        $fechaString = $data->fecha_fin;
        $timestamp = strtotime($fechaString);
        $fecha_fin = new DateTime();
        $fecha_fin->setTimestamp($timestamp);

        //Obtenemos el objeto monitor
        $monitor = $entityManager->getRepository(Usuario::class)->find($id_monitor);

        //Creamos el curso
        $curso = new Curso();

        //Guardamos los datos
        $curso->setNombre($nombre);

        /**
         * Calculamos el precio a partir del tipo
         * 1->CM L y X
         * 2->CM M y J
         * 3->CM V y S
         * 4->CM L
         * 5->CM M
         * 6->CM X
         * 7->CM J
         * 8->CM V
         * 9->CM S
         */
        if ($tipo < 3) {
            $precio = 120;
        } else {
            $precio = 90;
        }

        $curso->setPrecio($precio);
        $curso->setFechaInicio($fecha_inicio);
        $curso->setFechaFin($fecha_fin);
        $curso->setEstado($estado);

        $entityManager->persist($curso);
        $entityManager->flush();

        //Para poder ir aumentando la fecha de las sesiones
        $fecha = new DateTime($data->fecha_inicio);

        //Dependiendo del tipo de curso, añadimos las sesiones
        if ($tipo < 4) {
            //Dos dias
            if ($tipo < 3) {
                for ($i = 0; $i < 8; $i++) {
                    $sesion = new Sesion();
                    $sesion->setHoraInicio($hora);
                    $sesion->setMonitor($monitor);
                    $sesion->setFecha($fecha);
                    $curso->addSesion($sesion);
                    $sesion->setCurso($curso);
                    $entityManager->persist($sesion);
                    $entityManager->flush();

                    if ($i % 2 == 0) {
                        //Sumamos 7 días a la fecha
                        $fecha->modify('+2 days');
                    } else {
                        $fecha->modify('+5 days');
                    }
                }
            } else {
                //En caso de que sean V y S
                for ($i = 0; $i < 8; $i++) {
                    $sesion = new Sesion();
                    $sesion->setHoraInicio($hora);
                    $sesion->setMonitor($monitor);
                    $sesion->setFecha($fecha);

                    $curso->addSesion($sesion);
                    $sesion->setCurso($curso);
                    $entityManager->persist($sesion);
                    $entityManager->flush();

                    if ($i % 2 == 0) {
                        //Sumamos 7 días a la fecha
                        $fecha->modify('+1 days');
                    } else {
                        $fecha->modify('+6 days');
                    }
                }
            }
        } else {
            //Un día a la semana
            for ($i = 0; $i < 4; $i++) {
                $sesion = new Sesion();
                $sesion->setHoraInicio($hora);
                $sesion->setMonitor($monitor);
                $sesion->setFecha($fecha);

                //Sumamos 7 días a la fecha
                $fecha->modify('+7 days');

                $curso->addSesion($sesion);
                $sesion->setCurso($curso);
                $entityManager->persist($sesion);
                $entityManager->flush();
            }
        }
        $entityManager->flush();

        $data = [
            "nombre" => $nombre,
            "precio" => $precio,
            "estado" => $estado,
            "id_monitor" => $id_monitor,
            "tipo" => $tipo,
            "hora" => $hora,
            "fecha_inicio" => $fecha_inicio->format('Y-m-d'),
            "fecha_fin" => $fecha_fin,
            "fecha_inicio_mas_dos_dias" => $fecha->format('Y-m-d H:i:s')
        ];
        return $this->json($data);


        //return $this->json('Curso ' . $curso->getNombre() . ' creado con id ' . $curso->getId());
    }

    //Cambiar estado de un curso
    #[Route("/admin/cambiarEstadoCurso/{id_curso}", name: "admin_cambiar_estado_curso", methods: ["PUT"])]
    public function cambiarEstadoCurso(ManagerRegistry $doctrine, Request $request, int $id_curso): Response
    {
        $entityManager = $doctrine->getManager();
        $curso = $entityManager->getRepository(Curso::class)->find($id_curso);

        if (!$curso) {
            return $this->json('Ningun curso encontrado por el id ' . $id_curso, 404);
        }

        //Recogemos los datos que vienen en la Request
        $jsonData = $request->getContent();
        $data = json_decode($jsonData);
        $estado = $data->estado;

        //Modificamos el estado
        $curso->setEstado($estado);

        //Hacemos cambios
        $entityManager->flush();

        return $this->json('Estado del curso ' . $id_curso . ' cambiado correctamente', 200);
    }

    //Mostrar los monitores 
    #[Route("/admin/monitores", name: "admin_lista_monitores", methods: ["GET"])]
    public function mostrarMonitores(ManagerRegistry $doctrine): Response
    {
        $usuarios = $doctrine
            ->getRepository(Usuario::class)
            ->findAll();

        $data = [];

        //Recorremos el array de usuarios para devolver los monitores
        foreach ($usuarios as $monitor) {

            if ($monitor->getRoles()[0] == "ROLE_MONITOR") {
                $data[] = [
                    'id' => $monitor->getId(),
                    'nombre' => $monitor->getNombre(),
                    'apellidos' => $monitor->getApellidos(),
                    'email' => $monitor->getEmail(),
                    'telefono' => $monitor->getTelefono(),
                    'fecha_incorp' => $monitor->getFechaIncorp()->format('Y-m-d'),
                    'direccion' => $monitor->getDireccion(),
                    'roles' => $monitor->getRoles()
                ];
            }
        }

        return $this->json($data);
    }

    //Mostrar usuario por id
    #[Route("/admin/usuario/{id}", name: "admin_usuario_por_id", methods: ["GET"])]
    public function mostrarMonitor(ManagerRegistry $doctrine, int $id): Response
    {
        $usuario = $doctrine->getRepository(Usuario::class)->find($id);

        if (!$usuario) {

            return $this->json('Ningun Usuario encontrado con id ' . $id, 404);
        }
        if($usuario->getRoles()[0] == "ROLE_MONITOR"){
            $data =  [
                'nombre' => $usuario->getNombre(),
                'apellidos' => $usuario->getApellidos(),
                'email' => $usuario->getEmail(),
                'telefono' => $usuario->getTelefono(),
                'fecha_incorp' => $usuario->getFechaIncorp()->format('d/m/Y'),
                'direccion' => $usuario->getDireccion()
            ];
        }else{
            $data =  [
                'nombre' => $usuario->getNombre(),
                'apellidos' => $usuario->getApellidos(),
                'email' => $usuario->getEmail(),
                'telefono' => $usuario->getTelefono(),
                'direccion' => $usuario->getDireccion()
            ];
        }

        return $this->json($data);
    }

    //Editar Monitor
    #[Route("/admin/editarMonitor/{id}", name: "admin_monitor_edit", methods: ["PUT"])]
    public function edit(ManagerRegistry $doctrine, Request $request, int $id): Response
    {
        $entityManager = $doctrine->getManager();
        $monitor = $entityManager->getRepository(Usuario::class)->find($id);

        if (!$monitor) {
            return $this->json('Ningun monitor encontrado por el id ' . $id, 404);
        }

        //Recogemos los datos que vienen en la Request
        $jsonData = $request->getContent();
        $data = json_decode($jsonData);

        $nombre = $data->nombre;
        $apellidos = $data->apellidos;
        $email = $data->email;
        $telefono = $data->telefono;
        $direccion = $data->direccion;

        //Comprobamos que la fecha no venga vacia
        if (isset($data->fecha_incorp)) {
            //Transformamos la fecha de incorporacion
            $fechaString = $data->fecha_incorp;
            $timestamp = strtotime($fechaString);
            $fecha_incorp = new DateTime();
            $fecha_incorp->setTimestamp($timestamp);

            $monitor->setFechaIncorp($fecha_incorp);
        }

        $monitor->setNombre($nombre);
        $monitor->setApellidos($apellidos);
        $monitor->setEmail($email);
        $monitor->setTelefono($telefono);
        $monitor->setDireccion($direccion);

        try {
            //Hacemos cambios
            $entityManager->flush();
            return $this->json("Monitor editado correctamente", 200);
        } catch (\Exception $e) {
            $data = 'Ha ocurrido un error: ' . $e->getMessage();
            return $this->json($data, 404);
        }
    }


    //Mostrar sesiones de un curso
    #[Route("/admin/sesiones/{id_curso}", name: "admin_sesiones_por_curso", methods: ["GET"])]
    public function mostrarSesiones(ManagerRegistry $doctrine, int $id_curso): Response
    {
        $curso = $doctrine->getRepository(Curso::class)->find($id_curso);

        if (!$curso) {
            return $this->json('Ningun curso encontrado por el id ' . $id_curso, 404);
        }

        $sesiones = $doctrine
            ->getRepository(Sesion::class)
            ->findAll();

        $data = [];

        //Recorremos el array de sesiones y devolvemos las que coincidan con el id del curso
        foreach ($sesiones as $sesion) {

            if ($sesion->getCurso()->getId() == $curso->getId()) {
                $data[] = [
                    "id" => $sesion->getId(),
                    "fecha" => $sesion->getFecha()->format('Y-m-d'),
                    "hora_inicio" => $sesion->getHoraInicio(),
                    //Devolvemos el nombre y apellidos del monitor que imparte la sesión
                    "monitor" => $sesion->getMonitor()->getNombre() . " " . $sesion->getMonitor()->getApellidos()
                ];
            }
        }

        return $this->json($data);
    }


    //Mostrar las matriculas
    #[Route("/admin/matriculas", name: "admin_lista_matriculas", methods: ["GET"])]
    public function mostrarMatriculas(ManagerRegistry $doctrine): Response
    {
        $matriculas = $doctrine
            ->getRepository(Matricula::class)
            ->findAll();

        $data = [];

        foreach ($matriculas as $matricula) {
            $data[] = [
                'id' => $matricula->getId(),
                'estado' => $matricula->getEstado(),
                'fecha' => $matricula->getFecha()->format('Y-m-d'),
                'alumno_id' => $matricula->getSolicitadaPor()->getId(),
                'curso_id' => $matricula->getCurso()->getId()
            ];
        }

        return $this->json($data);
    }



    //Mostrar Matricula por id
    #[Route("/admin/matricula/{id_matricula}", name: "admin_matricula_por_id", methods: ["GET"])]
    public function mostrarMatricula(ManagerRegistry $doctrine, int $id_matricula): Response
    {
        $matricula = $doctrine->getRepository(Matricula::class)->find($id_matricula);

        if (!$matricula) {

            return $this->json('Ningun Curso encontrado con id ' . $id_matricula, 404);
        }

        $data = [
            'id' => $matricula->getId(),
            'estado' => $matricula->getEstado(),
            'fecha' => $matricula->getFecha()->format('Y-m-d'),
            'alumno_id' => $matricula->getSolicitadaPor()->getId(),
            'curso_id' => $matricula->getCurso()->getId()
        ];

        return $this->json($data);
    }

    //Cambiar estado de una matricula
    #[Route("/admin/cambiarEstadoMatricula/{id_matricula}", name: "admin_cambiar_estado_matricula", methods: ["PUT"])]
    public function cambiarEstadoMatricula(ManagerRegistry $doctrine, Request $request, int $id_matricula): Response
    {
        $entityManager = $doctrine->getManager();
        $matricula = $entityManager->getRepository(Matricula::class)->find($id_matricula);

        if (!$matricula) {
            return $this->json('Ninguna matricula encontrado por el id ' . $matricula, 404);
        }

        //Recogemos los datos que vienen en la Request
        $jsonData = $request->getContent();
        $data = json_decode($jsonData);
        $estado = $data->estado;
        $id_curso = $data->curso_id;
        $id_alumno = $data->alumno_id;

        //Modificamos el estado
        $matricula->setEstado($estado);

        //Hacemos cambios
        $entityManager->flush();

        //Si la matricula ha sido aceptada
        if (strtolower($estado) == "aceptada") {
            //Creamos las asistencias de los alumnos a las sesiones
            $curso = $entityManager->getRepository(Curso::class)->find($id_curso);
            $alumno = $entityManager->getRepository(Alumno::class)->find($id_alumno);

            foreach ($curso->getSesiones() as $sesion) {
                $asistencia = new Asistencia();
                $asistencia->setAlumno($alumno);
                $asistencia->setSesion($sesion);
                $asistencia->setAsiste("");
                $asistencia->setMotivo("");
                $entityManager->persist($asistencia);
                $entityManager->flush();
            }
        }

        return $this->json('Estado de la matricula ' . $id_matricula . ' cambiada correctamente', 200);
    }


      //Mostrar los alumnos
      #[Route("/admin/alumnos", name: "admin_lista_alumnos", methods: ["GET"])]
      public function mostrarAlumnos(ManagerRegistry $doctrine): Response
      {
          $alumnos = $doctrine
              ->getRepository(Alumno::class)
              ->findAll();
  
          $data = [];
  
          foreach ($alumnos as $alumno) {
              $data[] = [
                  'id' => $alumno->getId(),
                  'nombre' => $alumno->getNombre(),
                  'apellidos' => $alumno->getApellidos(), 
                  'fecha_nac' => $alumno->getFechaNac()->format('Y-m-d'),
                  'tutor_nombre' => $alumno->getTutor()->getNombre(),
                  'tutor_id' => $alumno->getTutor()->getId()
              ];
          }

          return $this->json($data);
      }


      //Mostrar Alumno por id
    #[Route("/admin/alumno/{id}", name: "admin_alumno_por_id", methods: ["GET"])]
    public function mostrarAlumno(ManagerRegistry $doctrine, int $id): Response
    {
        $alumno = $doctrine->getRepository(Alumno::class)->find($id);

        if (!$alumno) {

            return $this->json('Ningun Curso encontrado con id ' . $id, 404);
        }

        $data = [
            'id' => $alumno->getId(),
            'nombre' => $alumno->getNombre(),
            'apellidos' => $alumno->getApellidos(), 
            'fecha_nac' => $alumno->getFechaNac()->format('Y-m-d'),
            'tutor_nombre' => $alumno->getTutor()->getNombre(),
            'tutor_id' => $alumno->getTutor()->getId()
        ];

        return $this->json($data);
    }

}
