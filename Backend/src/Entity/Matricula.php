<?php

namespace App\Entity;

use App\Repository\MatriculaRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: MatriculaRepository::class)]
class Matricula
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $estado = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $fecha = null;

    #[ORM\ManyToOne(inversedBy: 'matriculasAtendidas')]
    private ?Usuario $atendidaPor = null;

    #[ORM\ManyToOne(inversedBy: 'matriculasRealizadas')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Alumno $solicitadaPor = null;

    #[ORM\ManyToOne(inversedBy: 'matriculas')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Curso $curso = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEstado(): ?string
    {
        return $this->estado;
    }

    public function setEstado(string $estado): self
    {
        $this->estado = $estado;

        return $this;
    }

    public function getFecha(): ?\DateTimeInterface
    {
        return $this->fecha;
    }

    public function setFecha(\DateTimeInterface $fecha): self
    {
        $this->fecha = $fecha;

        return $this;
    }

    public function getAtendidaPor(): ?Usuario
    {
        return $this->atendidaPor;
    }

    public function setAtendidaPor(?Usuario $atendidaPor): self
    {
        $this->atendidaPor = $atendidaPor;

        return $this;
    }

    public function getSolicitadaPor(): ?Alumno
    {
        return $this->solicitadaPor;
    }

    public function setSolicitadaPor(?Alumno $solicitadaPor): self
    {
        $this->solicitadaPor = $solicitadaPor;

        return $this;
    }

    public function getCurso(): ?Curso
    {
        return $this->curso;
    }

    public function setCurso(?Curso $curso): self
    {
        $this->curso = $curso;

        return $this;
    }
}
