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
            $data[] = [
                'id' => $alumno->getId(),
                'nombre' => $alumno->getNombre(),
                'apellidos' => $alumno->getApellidos(),
                'fecha_nac' => $alumno->getFechaNac()->format('d-m-Y') //Tengo que devolver la fecha en formato String
            ];
        }

        return $this->json($data);
    }

    //Dar de alta a un alumno
    #[Route("/tutor/addAlumno", name: "alumno_new", methods: ["POST"])]
    public function newAlumno(ManagerRegistry $doctrine, Request $request): Response
    {
        //Recogemos los datos que vienen en la Request
        $jsonData = $request->getContent();
        $data = json_decode($jsonData);
        $nombre = $data->nombre;
        $apellidos = $data->apellidos;

        //Transformamos la fecha de nacimiento
        $fechaString = $data->fecha_nac;
        $timestamp = strtotime($fechaString);
        $fecha_nac = new DateTime();
        $fecha_nac->setTimestamp($timestamp);

        //Recuperamos el id del tutor y lo convertimos en un objeto Usuario
        $tutor = $doctrine->getRepository(Usuario::class)->find($data->tutor);

        //Creamos el entityManager
        $entityManager = $doctrine->getManager();

        //Creamos alumno y guardamos los datos
        $alumno = new Alumno();
        $alumno->setNombre($nombre);
        $alumno->setApellidos($apellidos);
        $alumno->setFechaNac($fecha_nac);
        $alumno->setTutor($tutor);

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

    //Mostrar los cursos en los que puede solicitar matricula
    #[Route("/tutor/cursosDisp/{id_alumno}", name: "tutor_lista_cursos_disponibles", methods: ["GET"])]
    public function mostrarCursosActivos(ManagerRegistry $doctrine, int $id_alumno): Response
    {
        //Obtenemos todos los cursos
        $cursos = $doctrine
            ->getRepository(Curso::class)
            ->findAll();

        $data = [];

        //Recorremos el array de cursos para buscar aquellos que no hayan sido solicitados por el alumno
        foreach ($cursos as $curso) {
            $matriculado = false;

            foreach ($curso->getMatriculas() as $matricula) {

                if ($matricula->getSolicitadaPor()->getId() == $id_alumno) {
                    $matriculado = true;
                    break;
                }
            }
            if (!$matriculado) {
                $data[] = [
                    'id' => $curso->getId(),
                    'nombre' => $curso->getNombre(),
                    'fecha_inicio' => $curso->getFechaInicio()->format('Y-m-d'),
                    'fecha_fin' => $curso->getFechaFin()->format('Y-m-d'),
                    'precio' => $curso->getPrecio(),
                    'estado' => $curso->getEstado()
                ];
            }
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






}
