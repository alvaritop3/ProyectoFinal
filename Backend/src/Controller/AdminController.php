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

    //Mostrar monitor por id
    #[Route("/admin/monitor/{id}", name: "monitor_show", methods: ["GET"])]
    public function show(ManagerRegistry $doctrine, int $id): Response
    {
        $monitor = $doctrine->getRepository(Usuario::class)->find($id);

        if (!$monitor) {

            return $this->json('Ningun Monitor encontrado con id ' . $id, 404);
        }

        $data =  [
            'nombre' => $monitor->getNombre(),
            'apellidos' => $monitor->getApellidos(),
            'email' => $monitor->getEmail(),
            'telefono' => $monitor->getTelefono(),
            'fecha_incorp' => $monitor->getFechaIncorp()->format('d/m/Y'),
            'direccion' => $monitor->getDireccion()
        ];

        return $this->json($data);
    }

    //Editar Monitor
    #[Route("/admin/editarMonitor/{id}", name: "monitor_edit", methods: ["PUT"])]
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
    //Crear un nuevo curso y sus sesiones
    #[Route("/admin/addCurso", name: "add_curso", methods: ["POST"])]
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
}
