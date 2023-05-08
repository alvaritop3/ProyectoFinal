<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Response;
use App\Entity\Usuario;
use App\Entity\Alumno;
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
    public function new(ManagerRegistry $doctrine, Request $request): Response
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
        
        return $this->json('Alumno '. $alumno->getNombre().' creado con id ' . $alumno->getId());
    }

    //Devolvemos los datos del usuario según su email
    #[Route("/tutor/{email}", name: "tutor_por_email", methods: ["GET"])]
    public function getTutorByEmail(ManagerRegistry $doctrine, string $email){
       //Creamos el entityManager
       $entityManager = $doctrine->getManager();

        $userRepository = $entityManager->getRepository(Usuario::class);

        // busca el usuario según su correo electrónico
        $user = $userRepository->findOneBy(['email' => $email]);

        // comprueba si se encontró el usuario
        if (!$user) {
            return new JsonResponse(['error' => 'Usuario no encontrado'], 404);
        }

        // devuelve los datos del usuario
        return new JsonResponse([
            'id' => $user->getId(),
            'name' => $user->getNombre()
            //Aquí puedo añadir más datos que quiera devolver

        ]);
    }
}
