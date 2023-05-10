<?php

namespace App\Controller;

use App\Entity\Usuario;
use DateTime;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;

class UsuarioController extends AbstractController
{

    #[Route("/usuarios", name: "usuarios_lista", methods: ["GET"])]
    public function listUsuarios(ManagerRegistry $doctrine): JsonResponse
    {

        $usuarios = $doctrine
            ->getRepository(Usuario::class)
            ->findAll();

        $data = [];

        foreach ($usuarios as $usuario) {
            $data[] = [
                'id' => $usuario->getId(),
                'nombre' => $usuario->getNombre(),
                'apellidos' => $usuario->getApellidos(),
                'email' => $usuario->getEmail(),
                'telefono' => $usuario->getTelefono(),
                'fecha_incorp' => $usuario->getFechaIncorp(),
                'direccion' => $usuario->getDireccion()
            ];
        }

        return $this->json($data);
    }

    #[Route("/usuario", name: "usuario_new", methods: ["POST"])]
    public function new(ManagerRegistry $doctrine, Request $request): Response
    {
        //Creamos el entityManager
        $entityManager = $doctrine->getManager();
        //Creamos usuario
        $usuario = new Usuario();

        //Recogemos los datos que vienen en la Request
        $jsonData = $request->getContent();
        $data = json_decode($jsonData);
        $nombre = $data->nombre;
        $apellidos = $data->apellidos;
        $email = $data->email;
        $telefono = $data->telefono;
        $direccion = $data->direccion;
        $password = $data->password;

        //Comprobamos que la fecha no venga vacia
        if (isset($data->fecha_incorp)) {
            //Transformamos la fecha de nacimiento
            $fechaString = $data->fecha_incorp;
            $timestamp = strtotime($fechaString);
            $fecha_incorp = new DateTime();
            $fecha_incorp->setTimestamp($timestamp);

            $usuario->setFechaIncorp($fecha_incorp);
        }

        $usuario->setNombre($nombre);
        $usuario->setApellidos($apellidos);
        $usuario->setEmail($email);
        $usuario->setTelefono($telefono);
        $usuario->setDireccion($direccion);

        //Transformamos la contraseña para encriptarla
        $password_encriptada = password_hash($password, PASSWORD_DEFAULT);
        $usuario->setPassword($password_encriptada);

        $entityManager->persist($usuario);
        $entityManager->flush();

        return $this->json('Usuario ' . $usuario->getNombre() . ' creado con id ' . $usuario->getId());
    }

    //Devolvemos los datos del usuario según su email
    #[Route("/usuario/{email}", name: "usuario_por_email", methods: ["GET"])]
    public function getTutorByEmail(ManagerRegistry $doctrine, string $email)
    {
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
            'nombre' => $user->getNombre(),
            'apellidos' => $user->getApellidos(),
            'email' => $user->getEmail(),
            'telefono' => $user->getTelefono()
            //Aquí puedo añadir más datos que quiera devolver

        ]);
    }

    #[Route("/usuario/{id}", name: "usuario_show", methods: ["GET"])]

    public function show(ManagerRegistry $doctrine, int $id): Response
    {
        $usuario = $doctrine->getRepository(Usuario::class)->find($id);

        if (!$usuario) {

            return $this->json('Ningun Usuario encontrado con id ' . $id, 404);
        }

        $data =  [
            'id' => $usuario->getTutorDe(),
            'nombre' => $usuario->getNombre(),
            'apellidos' => $usuario->getApellidos(),
            'email' => $usuario->getEmail(),
            'telefono' => $usuario->getTelefono(),
            //                'fecha_incorp' => $usuario->getFechaIncorp()->format('d/m/Y'),
            'direccion' => $usuario->getDireccion()
        ];

        return $this->json($data);
    }


    #[Route("/usuario/{id}", name: "usuario_edit", methods: ["PUT"])]

    public function edit(ManagerRegistry $doctrine, Request $request, int $id): Response
    {
        $entityManager = $doctrine->getManager();
        $usuario = $entityManager->getRepository(Usuario::class)->find($id);

        if (!$usuario) {
            return $this->json('Ningun usuario encontrado por el id ' . $id, 404);
        }

        //Recogemos los datos que vienen en la Request
        $jsonData = $request->getContent();
        $data = json_decode($jsonData);

        if ($data->nombre != null) {
            $nombre = $data->nombre;
            $usuario->setNombre($nombre);
        }

        if ($data->apellidos != null) {
            $apellidos = $data->apellidos;
            $usuario->setNombre($apellidos);
        }

        if ($data->telefono != null) {
            $telefono = $data->telefono;
            $usuario->setNombre($telefono);
        }

        if ($data->direccion != null) {
            $direccion = $data->direccion;
            $usuario->setNombre($direccion);
        }



        //Comprobamos que la fecha no venga vacia
        if (isset($data->fecha_incorp)) {
            //Transformamos la fecha de nacimiento
            $fechaString = $data->fecha_incorp;
            $timestamp = strtotime($fechaString);
            $fecha_incorp = new DateTime();
            $fecha_incorp->setTimestamp($timestamp);

            $usuario->setFechaIncorp($fecha_incorp);
        }


        //Hacemos cambios
        $entityManager->flush();

        $respuesta =  [
            'id' => $usuario->getId(),
            'nombre' => $usuario->getNombre(),
            'apellidos' => $usuario->getApellidos(),
            'email' => $usuario->getEmail(),
            'telefono' => $usuario->getTelefono(),
            'fecha_incorp' => $usuario->getFechaIncorp()->format('d/m/Y'),
            'direccion' => $usuario->getDireccion()
        ];

        return $this->json($respuesta);
    }

    #[Route("/usuario/{id}", name: "usuario_delete", methods: ["DELETE"])]

    public function delete(ManagerRegistry $doctrine, int $id): Response
    {
        $entityManager = $doctrine->getManager();
        $usuario = $entityManager->getRepository(Usuario::class)->find($id);

        if (!$usuario) {
            return $this->json('Ningun Usuario encontrado con el id ' . $id, 404);
        }

        $entityManager->remove($usuario);
        $entityManager->flush();

        return $this->json('Usuario eliminado con el id ' . $id);
    }
}
