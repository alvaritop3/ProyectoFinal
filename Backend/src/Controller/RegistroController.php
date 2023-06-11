<?php

namespace App\Controller;

use App\Entity\Usuario;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use DateTime;

class RegistroController extends AbstractController
{

    #[Route('/registro', name: 'app_registro', methods: ["POST"])]
    public function registrar(UserPasswordHasherInterface $passwordHasher, ManagerRegistry $doctrine, Request $request): Response
    {
        //Creamos el entityManager
        $entityManager = $doctrine->getManager();

        //Recogemos los datos que vienen en la Request
        $jsonData = $request->getContent();
        $data = json_decode($jsonData);
        $nombre = $data->nombre;
        $apellidos = $data->apellidos;
        $email = $data->email;
        $telefono = $data->telefono;
        $direccion = $data->direccion;
        $password = $data->password;
        $roles = [$data->roles];
        if ($request->files->get('file')) {
            $file = $request->files->get('file');
        } else {
            $file = null;
        }

        //Creamos usuario
        $usuario = new Usuario();

        //Comprobamos que la fecha no venga vacia
        if ($request->request->get('fecha_incorp') !== null) {
            //Transformamos la fecha de nacimiento
            $fechaString = $request->request->get('fecha_incorp');
            $timestamp = strtotime($fechaString);
            $fecha_incorp = new DateTime();
            $fecha_incorp->setTimestamp($timestamp);

            $usuario->setFechaIncorp($fecha_incorp);
        } else {
            $usuario->setFechaIncorp(null);
        }

        // Hasheamos la contraseña
        $hashedPassword = $passwordHasher->hashPassword(
            $usuario,
            $password
        );
        //Comprobamos si hay una imágen en el campo foto
        if ($file) {
            $fileName = uniqid() . '.' . $file->guessExtension();
            $file->move($this->getParameter('kernel.project_dir') . '/public/fotos/', $fileName);
            $usuario->setFoto($fileName);
        } else {
            $usuario->setFoto('fotoDefecto.png');
        }

        $usuario->setNombre($nombre);
        $usuario->setApellidos($apellidos);
        $usuario->setEmail($email);
        $usuario->setTelefono($telefono);
        $usuario->setDireccion($direccion);
        $usuario->setPassword($hashedPassword);
        $usuario->setRoles($roles);

        $entityManager->persist($usuario);
        $entityManager->flush();



        return $this->json('Usuario ' . $usuario->getNombre() . ' creado con id ' . $usuario->getId());
    }
}
