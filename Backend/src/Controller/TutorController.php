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
use App\Entity\Matricula;
use DateTime;
use Symfony\Component\HttpFoundation\Request;


class TutorController extends AbstractController
{

    //Obtener todos los alumnos de un tutor
    #[Route("/tutor/getAlumnos/{id}", name: "alumnos_lista_por_tutor", methods: ["GET"])]
    public function index(ManagerRegistry $doctrine, int $id): Response
    {
        $tutor = $doctrine->getRepository(Usuario::class)->find($id);
        $alumnos = $tutor->getAlumnos();

        $data = [];

        foreach ($alumnos as $alumno) {
            if ($alumno->getFoto()) {
                $data[] = [
                    'id' => $alumno->getId(),
                    'nombre' => $alumno->getNombre(),
                    'apellidos' => $alumno->getApellidos(),
                    'fecha_nac' => $alumno->getFechaNac()->format('d-m-Y'),
                    'foto' => $alumno->getFoto()
                ];
            } else {
                $data[] = [
                    'id' => $alumno->getId(),
                    'nombre' => $alumno->getNombre(),
                    'apellidos' => $alumno->getApellidos(),
                    'fecha_nac' => $alumno->getFechaNac()->format('d-m-Y'),
                    'foto' => "fotoDefecto.png"
                ];
            }
        }

        return $this->json($data);
    }

    //Dar de alta a un alumno
    #[Route("/tutor/addAlumno", name: "alumno_new", methods: ["POST"])]
    public function newAlumno(ManagerRegistry $doctrine, Request $request): Response
    {
        //Recogemos los datos que vienen en la Request
        $nombre = $request->request->get('nombre');
        $apellidos = $request->request->get('apellidos');
        $tutor_id = $request->request->get('tutor');
        $file = $request->files->get('file');

        //Transformamos la fecha de nacimiento
        $fechaString = $request->request->get('fecha_nac');
        $timestamp = strtotime($fechaString);
        $fecha_nac = new DateTime();
        $fecha_nac->setTimestamp($timestamp);

        //Recuperamos el id del tutor y lo convertimos en un objeto Usuario
        $tutor = $doctrine->getRepository(Usuario::class)->find($tutor_id);

        //Creamos el entityManager
        $entityManager = $doctrine->getManager();

        //Creamos alumno y guardamos los datos
        $alumno = new Alumno();
        $alumno->setNombre($nombre);
        $alumno->setApellidos($apellidos);
        $alumno->setFechaNac($fecha_nac);
        $alumno->setTutor($tutor);

        //Comprobamos si hay una imágen en el campo foto
        if ($file) {
            $fileName = uniqid() . '.' . $file->guessExtension();
            $file->move($this->getParameter('kernel.project_dir') . '/public/fotos/', $fileName);
            $alumno->setFoto($fileName);
        } else {
            $alumno->setFoto('fotoDefecto.png');
        }


        //Introducimos el alumno que acabamos de crear en el objeto Usuario (tutor)
        $tutor->addAlumno($alumno);

        $entityManager->persist($alumno);
        $entityManager->flush();

        return $this->json('Alumno ' . $alumno->getNombre() . ' creado con id ' . $alumno->getId());
    }


    //Editar los datos de un alumno
    #[Route("/tutor/editAlumno/{id}", name: "alumnot_edit", methods: ["PUT"])]
    public function edit(ManagerRegistry $doctrine, Request $request, int $id): Response
    {
        $entityManager = $doctrine->getManager();
        $alumno = $entityManager->getRepository(Alumno::class)->find($id);

        if (!$alumno) {
            return $this->json('Ningún alumno encontrado por el id ' . $id, 404);
        }
        //Recogemos los datos que vienen en la Request
        $jsonData = $request->getContent();
        $data = json_decode($jsonData);

        $nombre = $data->nombre;
        $apellidos = $data->apellidos;

        //Comprobamos si trae imagen
        $file = $request->files->get('file');

        if ($file) {
            $fileName = uniqid() . '.' . $file->guessExtension();
            $file->move($this->getParameter('kernel.project_dir') . '/public/fotos/', $fileName);
            $alumno->setFoto($fileName);
        }

        //Transformamos la fecha de nacimiento
        $fechaString = $data->fecha_nac;
        $timestamp = strtotime($fechaString);
        $fecha_nac = new DateTime();
        $fecha_nac->setTimestamp($timestamp);

        $alumno->setNombre($nombre);
        $alumno->setApellidos($apellidos);

        //Insertamos fecha
        $alumno->setFechaNac($fecha_nac);
        //Hacemos cambios
        $entityManager->flush();

        $respuesta =  [
            'id' => $alumno->getId(),
            'nombre' => $alumno->getNombre(),
            'apellidos' => $alumno->getApellidos(),
            'fecha_nac' => $alumno->getFechaNac()
        ];

        return $this->json($respuesta);
    }

    //Mostrar los cursos en los que puede solicitar matricula (que estén activos y no haya solicitado matricula)
    #[Route("/tutor/cursosDisp/{id_alumno}", name: "tutor_lista_cursos_disponibles", methods: ["GET"])]
    public function mostrarCursosActivos(ManagerRegistry $doctrine, int $id_alumno): Response
    {
        $entityManager = $doctrine->getManager();
        $alumno = $entityManager->getRepository(Alumno::class)->find($id_alumno);

        if (!$alumno) {
            return $this->json('Ningún alumno encontrado por el id ' . $id_alumno, 404);
        }

        $fechaActual = new \DateTime();

        // Obtenemos todos los cursos
        $cursos = $doctrine
            ->getRepository(Curso::class)
            ->findAll();

        $data = [];

        foreach ($cursos as $curso) {
            $matriculado = false;

            //comprobamos que el alumno no haya solicitado este curso
            foreach ($curso->getMatriculas() as $matricula) {
                if ($matricula->getSolicitadaPor()->getId() == $id_alumno) {
                    $matriculado = true;
                    break;
                }
            }

            //Comprobamos que el curso no ha comenzado
            if (!$matriculado && $curso->getFechaInicio() > $fechaActual) {
                $data[] = [
                    'id' => $curso->getId(),
                    'nombre' => $curso->getNombre(),
                    'fecha_inicio' => $curso->getFechaInicio()->format('Y-m-d'),
                    'fecha_fin' => $curso->getFechaFin()->format('Y-m-d'),
                    'precio' => $curso->getPrecio(),
                    'estado' => $curso->getEstado(),
                    'hora' => $curso->getSesiones()[0]->getHoraInicio(),
                    'monitor' => $curso->getSesiones()[0]->getMonitor()->getNombre()
                ];
            }
        }

        return $this->json($data);
    }

    //Mostrar el historial de cursos 
    #[Route("/tutor/historialCursos/{id_alumno}", name: "tutor_historial_cursos", methods: ["GET"])]
    public function mostrarHistorialCursos(ManagerRegistry $doctrine, int $id_alumno): Response
    {
        $entityManager = $doctrine->getManager();
        $alumno = $entityManager->getRepository(Alumno::class)->find($id_alumno);

        if (!$alumno) {
            return $this->json('Ningún alumno encontrado por el id ' . $id_alumno, 404);
        }

        $data = [];

        // Obtener los cursos matriculados por el alumno
        $matriculas = $alumno->getMatriculasRealizadas();

        foreach ($matriculas as $matricula) {
            $curso = $matricula->getCurso();

            $data[] = [
                'id' => $curso->getId(),
                'nombre' => $curso->getNombre(),
                'fecha_inicio' => $curso->getFechaInicio()->format('Y-m-d'),
                'fecha_fin' => $curso->getFechaFin()->format('Y-m-d'),
                'precio' => $curso->getPrecio(),
                'estado' => $curso->getEstado(), 'hora' => $curso->getSesiones()[0]->getHoraInicio(),
                'monitor' => $curso->getSesiones()[0]->getMonitor()->getNombre()
            ];
        }

        return $this->json($data);
    }

    //Solicitar matricula de alumno en curso
    #[Route("/tutor/solicitarMatricula", name: "tutor_solicitar_matricula", methods: ["POST"])]
    public function solicitarMatricula(ManagerRegistry $doctrine, Request $request): Response
    {
        //Creamos entityManager
        $entityManager = $doctrine->getManager();

        //Recogemos los datos que vienen en la Request
        $jsonData = $request->getContent();
        $data = json_decode($jsonData);

        $id_curso = $data->id_curso;
        $id_alumno = $data->id_alumno;

        //Obtenemos el curso y el alumno a partir del id
        $alumno = $entityManager->getRepository(Alumno::class)->find($id_alumno);
        $cursoSolicitado = $entityManager->getRepository(Curso::class)->find($id_curso);


        //Comprobación de que el alumno no esté matriculado en el curso previamente 
        $matriculado = false;
        foreach ($cursoSolicitado->getMatriculas() as $matricula) {
            if ($matricula->getSolicitadaPor()->getId() == $id_alumno) {
                $matriculado = true;
                break;
            }
        }

        if ($matriculado) {
            return $this->json("El alumno con id " . $id_alumno . " ya ha solicitado este curso con id " . $id_curso, 404);
        } else {
            //Creamos la matrícula
            $matricula = new Matricula();

            $matricula->setEstado('Pendiente');
            $matricula->setFecha(new DateTime());
            $matricula->setSolicitadaPor($alumno);
            $matricula->setCurso($cursoSolicitado);

            try {
                $entityManager->persist($matricula);
                $entityManager->flush();

                return $this->json("Matricula solicitada correctamente", 200);
            } catch (\Exception $e) {
                $data = 'Ha ocurrido un error: ' . $e->getMessage();
                return $this->json($data, 404);
            }
        }
    }


    //Mostrar las matriculas de un alumno
    #[Route("/tutor/matriculas/{id_alumno}", name: "tutor_lista_matriculas", methods: ["GET"])]
    public function mostrarMatriculas(ManagerRegistry $doctrine, int $id_alumno): Response
    {
        $matriculas = $doctrine
            ->getRepository(Matricula::class)
            ->findAll();

        $data = [];

        foreach ($matriculas as $matricula) {
            if ($matricula->getSolicitadaPor()->getId() == $id_alumno) {
                $data[] = [
                    'id' => $matricula->getId(),
                    'estado' => $matricula->getEstado(),
                    'fecha' => $matricula->getFecha()->format('Y-m-d'),
                    'nombre_curso' => $matricula->getCurso()->getNombre()
                ];
            }
        }

        return $this->json($data);
    }

    //Editar los datos de un tutor
    #[Route("/tutor/editTutor/{email}", name: "tutor_edit_tutor", methods: ["PUT"])]
    public function editTutor(ManagerRegistry $doctrine, Request $request, string $email): Response
    {
        //Creamos el entityManager
        $entityManager = $doctrine->getManager();

        $userRepository = $entityManager->getRepository(Usuario::class);
        // busca el tutor según su correo electrónico
        $tutor = $userRepository->findOneBy(['email' => $email]);

        // comprueba si se encontró el usuario
        if (!$tutor) {
            return new JsonResponse(['error' => 'Usuario no encontrado'], 404);
        }

        //Recogemos los datos que vienen en la Request
        $jsonData = $request->getContent();
        $data = json_decode($jsonData);

        $nombre = $data->nombre;
        $apellidos = $data->apellidos;
        $email = $data->email;
        $telefono = $data->telefono;
        $direccion = $data->direccion;

        //Comprobamos que los datos no vengan vacíos
        if (!empty($nombre)) {
            $tutor->setNombre($nombre);
        } else {
            return $this->json('El nombre no puede estar vacio', 404);
        }

        if (!empty($apellidos)) {
            $tutor->setApellidos($apellidos);
        } else {
            return $this->json('Los apellidos no pueden estar vacios', 404);
        }

        if (!empty($email)) {
            $tutor->setEmail($email);
        } else {
            return $this->json('El email no puede estar vacio', 404);
        }

        if (!empty($telefono)) {
            $tutor->setTelefono($telefono);
        } else {
            return $this->json('El telefono no puede estar vacio', 404);
        }

        if (!empty($direccion)) {
            $tutor->setDireccion($direccion);
        } else {
            return $this->json('La direccion no puede estar vacia', 404);
        }

        try {
            //Hacemos cambios
            $entityManager->flush();
        } catch (\Exception $e) {
            $data = 'Ha ocurrido un error: ' . $e->getMessage();
            return $this->json($data, 404);
        }


        return $this->json('Datos modificados correctamente', 200);
    }
}
