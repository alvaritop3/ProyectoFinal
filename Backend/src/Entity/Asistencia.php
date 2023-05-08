<?php

namespace App\Entity;

use App\Repository\AsistenciaRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AsistenciaRepository::class)]
class Asistencia
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $asiste = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $motivo = null;

    #[ORM\ManyToOne(inversedBy: 'asistencias')]
    private ?Alumno $alumno = null;

    #[ORM\ManyToOne(inversedBy: 'asistencias')]
    private ?Sesion $sesion = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAsiste(): ?string
    {
        return $this->asiste;
    }

    public function setAsiste(string $asiste): self
    {
        $this->asiste = $asiste;

        return $this;
    }

    public function getMotivo(): ?string
    {
        return $this->motivo;
    }

    public function setMotivo(?string $motivo): self
    {
        $this->motivo = $motivo;

        return $this;
    }

    public function getAlumno(): ?Alumno
    {
        return $this->alumno;
    }

    public function setAlumno(?Alumno $alumno): self
    {
        $this->alumno = $alumno;

        return $this;
    }

    public function getSesion(): ?Sesion
    {
        return $this->sesion;
    }

    public function setSesion(?Sesion $sesion): self
    {
        $this->sesion = $sesion;

        return $this;
    }
}
