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
use DateTime;
use Symfony\Component\HttpFoundation\Request;

class AdminController extends AbstractController
{
    //Mostrar los cursos en los que puede solicitar matricula
    #[Route("/admin/cursos", name: "admi_lista_cursos", methods: ["GET"])]
    public function mostrarCursosActivos(ManagerRegistry $doctrine): Response
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
                    'precio'=> $curso->getPrecio(),
                    'estado'=> $curso->getEstado()
                ];
            
        }
        
        return $this->json($data);
    }
}


