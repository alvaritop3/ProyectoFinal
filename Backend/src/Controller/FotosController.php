<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class FotosController extends AbstractController
{
    #[Route('/fotos/{filename}', name: 'app_fotos')]
    public function mostrarFoto($filename): Response
    {
        $filePath = 'fotos/' . $filename;
        $response = new Response();
        $response->headers->set('Content-Type', 'image/jpeg');
        $response->setContent(file_get_contents($filePath));

        return $response;
    }
}
