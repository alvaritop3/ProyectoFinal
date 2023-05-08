<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use DateTime;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Entity\Curso;


class CursoController extends AbstractController
{

    #[Route("/cursos", name: "cursos_lista", methods: ["GET"])]
    public function index(ManagerRegistry $doctrine): Response
    {
        $cursos = $doctrine
            ->getRepository(Curso::class)
            ->findAll();

        $data = [];

        foreach ($cursos as $curso) {
            $data[] = [
                'id' => $curso->getId(),
                'nombre' => $curso->getNombre(),
                'fecha_inicio' => $curso->getFechaInicio()->format('d-m-Y'),
                'fecha_fin' => $curso->getFechaFin()->format('d-m-Y'),
                'precio'=> $curso->getPrecio(),
                'estado'=> $curso->getEstado()
            ];
        }

        return $this->json($data);
    }

    #[Route("/curso", name: "curso_new", methods: ["POST"])]
    public function new(ManagerRegistry $doctrine, Request $request): Response
    {
        //Recogemos los datos que vienen en la Request
        $jsonData = $request->getContent();
        $data = json_decode($jsonData);
        $nombre = $data->nombre;
        $precio = $data->precio;
        $estado = $data->estado;
        

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
        
        
        //Creamos el entityManager
        $entityManager = $doctrine->getManager();
        
        //Creamos curso y guardamos los datos
        $curso = new Curso();
        $curso->setNombre($nombre);
        $curso->setFechaInicio($fecha_inicio);
        $curso->setFechaFin($fecha_fin);
        $curso->setPrecio($precio);
        $curso->setEstado($estado);
        
        $entityManager->persist($curso);
        $entityManager->flush();
        
        return $this->json('Curso '. $curso->getNombre().' creado con id ' . $curso->getId());
    }

    #[Route("/curso/{id}", name: "curso_show", methods: ["GET"])]
    public function show(ManagerRegistry $doctrine, int $id): Response
    {
        $curso = $doctrine->getRepository(Curso::class)->find($id);

        if (!$curso) {

            return $this->json('Ningun curso encontrado con el id ' . $id, 404);
        }

        $data[] = [
            'id' => $curso->getId(),
            'nombre' => $curso->getNombre(),
            'fecha_inicio' => $curso->getFechaInicio()->format('d-m-Y'),
            'fecha_fin' => $curso->getFechaFin()->format('d-m-Y'),
            'precio'=> $curso->getPrecio(),
            'estado'=> $curso->getEstado()
        ];

        return $this->json($data);
    }

    #[Route("/curso/{id}", name: "curso_edit", methods: ["PUT"])]

    public function edit(ManagerRegistry $doctrine, Request $request, int $id): Response
    {
        $entityManager = $doctrine->getManager();
        $curso = $entityManager->getRepository(Curso::class)->find($id);

        if (!$curso) {
            return $this->json('Ningun curso encontrado por el id ' . $id, 404);
        }

        //Recogemos los datos que vienen en la Request
        $jsonData = $request->getContent();
        $data = json_decode($jsonData);
        $nombre = $data->nombre;
        $precio = $data->precio;
        $estado = $data->estado;
        

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

        //Asignamos los valores
        $curso->setNombre($nombre);
        $curso->setFechaInicio($fecha_inicio);
        $curso->setFechaFin($fecha_fin);
        $curso->setPrecio($precio);
        $curso->setEstado($estado);

        //Hacemos cambios
        $entityManager->flush();

        $respuesta =  [
            'id' => $curso->getId(),
            'nombre' => $curso->getNombre(),
            'fecha_inicio' => $curso->getFechaInicio()->format('d-m-Y'),
            'fecha_fin' => $curso->getFechaFin()->format('d-m-Y'),
            'precio'=> $curso->getPrecio(),
            'estado'=> $curso->getEstado()
        ];

        return $this->json($respuesta);
    }

    #[Route("/curso/{id}", name: "curso_delete", methods: ["DELETE"])]
    public function delete(ManagerRegistry $doctrine, int $id): Response
    {
        $entityManager = $doctrine->getManager();
        $curso = $entityManager->getRepository(Curso::class)->find($id);

        if (!$curso) {
            return $this->json('Ningun curso encontrado con el id ' . $id, 404);
        }

        $entityManager->remove($curso);
        $entityManager->flush();

        return $this->json('Curso eliminado con el id ' . $id);
    }

}
