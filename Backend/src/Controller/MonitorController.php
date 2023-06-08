<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Response;
use App\Entity\Usuario;
use App\Entity\Alumno;
use App\Entity\Curso;
use App\Entity\Sesion;
use App\Entity\Asistencia;
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
                    'hora' => $sesion->getHoraInicio(),
                    'monitor' => $sesion->getMonitor()->getNombre()
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

    //Devuelve las asistencias de una sesión
    #[Route("/monitor/asistenciaDeSesion/{id_sesion}", name: "monitor_asistencias_de_sesion", methods: ["GET"])]
    public function asistenciasDeSesion(ManagerRegistry $doctrine, int $id_sesion): Response
    {
        $sesion = $doctrine->getRepository(Sesion::class)->find($id_sesion);

        if (!$sesion) {
            return $this->json('Ninguna asistencia encontrada por el id ' . $id_sesion, 404);
        }

        $asistencias = $sesion->getAsistencias();
        $data = [];
        foreach ($asistencias as $asistencia) {
            $data[] = [
                "id" => $asistencia->getId(),
                "asiste" => $asistencia->getAsiste(),
                "motivo" => $asistencia->getMotivo(),
                "alumno_id" => $asistencia->getAlumno()->getId()
            ];
        }

        return $this->json($data);
    }

    //Mostrar Alumno por id
    #[Route("/monitor/alumno/{idAlumno}", name: "monitor_alumno_por_id", methods: ["GET"])]
    public function mostrarAlumnoPorId(ManagerRegistry $doctrine, int $idAlumno): Response
    {
        $alumno = $doctrine->getRepository(Alumno::class)->find($idAlumno);

        if (!$alumno) {

            return $this->json('Ningun Curso encontrado con id ' . $idAlumno, 404);
        }
        if ($alumno->getFoto()) {
            $data = [
                'id' => $alumno->getId(),
                'nombre' => $alumno->getNombre(),
                'apellidos' => $alumno->getApellidos(),
                'fecha_nac' => $alumno->getFechaNac()->format('Y-m-d'),
                'tutor_nombre' => $alumno->getTutor()->getNombre(),
                'tutor_id' => $alumno->getTutor()->getId(),
                'foto' => $alumno->getFoto()
            ];
        } else {
            $data = [
                'id' => $alumno->getId(),
                'nombre' => $alumno->getNombre(),
                'apellidos' => $alumno->getApellidos(),
                'fecha_nac' => $alumno->getFechaNac()->format('Y-m-d'),
                'tutor_nombre' => $alumno->getTutor()->getNombre(),
                'tutor_id' => $alumno->getTutor()->getId(),
                'foto' => "fotoDefecto.png"
            ];
        }


        return $this->json($data);
    }

    //Cambiar asistencia de un alumno en una sesion
    #[Route("/monitor/editarAsistencia/{id_asistencia}", name: "monitor_cambiar_estado_asistencia", methods: ["PUT"])]
    public function cambiarEstadoCurso(ManagerRegistry $doctrine, Request $request, int $id_asistencia): Response
    {
        $entityManager = $doctrine->getManager();
        $asistencia = $entityManager->getRepository(Asistencia::class)->find($id_asistencia);

        if (!$asistencia) {
            return $this->json('Ninguna asistencia encontrada por el id ' . $id_asistencia, 404);
        }

        //Recogemos los datos que vienen en la Request
        $jsonData = $request->getContent();
        $data = json_decode($jsonData);
        $motivo = $data->motivo;
        $asiste = $data->asiste;

        $asistencia->setMotivo($motivo);
        $asistencia->setAsiste($asiste);

        try {
            //Hacemos cambios
            $entityManager->flush();
        } catch (\Exception $e) {
            $data = 'Ha ocurrido un error: ' . $e->getMessage();
            return $this->json($data, 404);
        }


        return $this->json('Estado de la asistencia ' . $id_asistencia . ' cambiado correctamente', 200);
    }

    //Para mostrar los datos del monitor
    #[Route("/monitor/misDatos/{id}", name: "monitor_mis_datos", methods: ["GET"])]
    public function showMonitor(ManagerRegistry $doctrine, int $id): Response
    {
        $usuario = $doctrine->getRepository(Usuario::class)->find($id);

        if (!$usuario) {

            return $this->json('Ningun Monitor encontrado con id ' . $id, 404);
        }

        $data =  [
            'id' => $usuario->getId(),
            'nombre' => $usuario->getNombre(),
            'apellidos' => $usuario->getApellidos(),
            'email' => $usuario->getEmail(),
            'telefono' => $usuario->getTelefono(),
            'fecha_incorp' => $usuario->getFechaIncorp()->format('d/m/Y'),
            'direccion' => $usuario->getDireccion(),
            'foto' => $usuario->getFoto()
        ];

        return $this->json($data);
    }

    //Editar Monitor
    #[Route("/monitor/editarMonitor/{id}", name: "monitor_edit", methods: ["PUT"])]
    public function editMonitor(ManagerRegistry $doctrine, Request $request, int $id): Response
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
        } catch (\Exception $e) {
            $data = 'Ha ocurrido un error: ' . $e->getMessage();
            return $this->json($data, 404);
        }

        return $this->json("Monitor editado correctamente", 200);
    }
}
