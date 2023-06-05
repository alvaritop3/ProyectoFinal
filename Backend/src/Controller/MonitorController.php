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

class MonitorController extends AbstractController
{
    //Mostrar los cursos en los que puede solicitar matricula (que estén activos y no haya solicitado matricula)
    #[Route("/monitor/cursos/{id_monitor}", name: "monitor_lista_cursos_impartidos", methods: ["GET"])]
    public function mostrarCursosActivos(ManagerRegistry $doctrine, int $id_monitor): Response
    {
        $entityManager = $doctrine->getManager();
        $monitor = $entityManager->getRepository(Usuario::class)->find($id_monitor);

        if (!$monitor) {
            return $this->json('Ningún monitor encontrado por el id ' . $id_monitor, 404);
        }

        //Obtenemos todas las sesiones del monitor
        $sesiones = $monitor->getSesiones();

        //Almaceno el id de los cursos
        $arrayIdCursos = [];
        $data = [];

        foreach ($sesiones as $sesion) {
            $idCurso = $sesion->getCurso()->getId();
            if (!in_array($idCurso, $arrayIdCursos)) {
                $arrayIdCursos[] = $idCurso;
                $data[] = [
                    'id' => $sesion->getCurso()->getId(),
                    'nombre' => $sesion->getCurso()->getNombre(),
                    'fecha_inicio' => $sesion->getCurso()->getFechaInicio()->format('Y-m-d'),
                    'fecha_fin' => $sesion->getCurso()->getFechaFin()->format('Y-m-d'),
                    'precio' => $sesion->getCurso()->getPrecio(),
                    'estado' => $sesion->getCurso()->getEstado(),
                    'hora'=> $sesion->getHoraInicio(),
                    'monitor' =>$sesion->getMonitor()->getNombre()
                ];
            }
        }

        return $this->json($data);
    }

     //Mostrar sesiones de un curso
     #[Route("/monitor/sesiones/{id_curso}", name: "monitor_sesiones_por_curso", methods: ["GET"])]
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
                     "monitor" => $sesion->getMonitor()->getNombre() . " " . $sesion->getMonitor()->getApellidos()
                 ];
             }
         }
 
         return $this->json($data);
     }

     //Mostrar Detalles del Curso por id
    #[Route("/monitor/curso/{id}", name: "monitor_curso_por_id", methods: ["GET"])]
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

     //Mostrar todas las sesiones de un monitor en la fecha actual
     #[Route("/monitor/sesionesHoy/{id_monitor}", name: "monitor_sesiones_por_dia_actual", methods: ["GET"])]
     public function sesionesHoy(ManagerRegistry $doctrine, int $id_monitor): Response
     {
         $monitor = $doctrine->getRepository(Usuario::class)->find($id_monitor);
 
         if (!$monitor) {
             return $this->json('Ningun monitor encontrado por el id ' . $id_monitor, 404);
         }
 
         $sesiones = $monitor->getSesiones();
         
         $fechaActual = new DateTime();
         $data = [];
 
         foreach ($sesiones as $sesion) {
            $fechaSesion = $sesion->getFecha(); // Suponiendo que la fecha de la sesión está almacenada en una propiedad llamada "fecha"
    
            // Comparamos solo la fecha sin tener en cuenta la hora
            if ($fechaSesion->format('Y-m-d') === $fechaActual->format('Y-m-d')) {
                $data[] = [
                    "id" => $sesion->getId(),
                    "fecha" => $sesion->getFecha()->format('Y-m-d'),
                    "hora_inicio" => $sesion->getHoraInicio()
                ];
            }
        }
    
        return $this->json($data);
     }
}
