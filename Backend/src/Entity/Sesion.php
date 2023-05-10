<?php

namespace App\Entity;

use App\Repository\SesionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SesionRepository::class)]
class Sesion
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $fecha = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $hora_inicio = null;

    // #[ORM\ManyToMany(targetEntity: Alumno::class, inversedBy: 'sesiones')]
    // private Collection $alumnos;

    #[ORM\ManyToOne(inversedBy: 'sesiones')]
    private ?Usuario $monitor = null;

    #[ORM\OneToMany(mappedBy: 'sesion', targetEntity: Asistencia::class)]
    private Collection $asistencias;

    #[ORM\ManyToOne(inversedBy: 'sesiones')]
    private ?Curso $curso = null;

    public function __construct()
    {
        // $this->alumnos = new ArrayCollection();
        $this->asistencias = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    public function getHoraInicio(): ?string
    {
        return $this->hora_inicio;
    }

    public function setHoraInicio(?string $hora_inicio): self
    {
        $this->hora_inicio = $hora_inicio;

        return $this;
    }

    // /**
    //  * @return Collection<int, Alumno>
    //  */
    // public function getAlumnos(): Collection
    // {
    //     return $this->alumnos;
    // }

    // public function addAlumno(Alumno $alumno): self
    // {
    //     if (!$this->alumnos->contains($alumno)) {
    //         $this->alumnos->add($alumno);
    //     }

    //     return $this;
    // }

    // public function removeAlumno(Alumno $alumno): self
    // {
    //     $this->alumnos->removeElement($alumno);

    //     return $this;
    // }

    public function getMonitor(): ?Usuario
    {
        return $this->monitor;
    }

    public function setMonitor(?Usuario $monitor): self
    {
        $this->monitor = $monitor;

        return $this;
    }

    /**
     * @return Collection<int, Asistencia>
     */
    public function getAsistencias(): Collection
    {
        return $this->asistencias;
    }

    public function addAsistencia(Asistencia $asistencia): self
    {
        if (!$this->asistencias->contains($asistencia)) {
            $this->asistencias->add($asistencia);
            $asistencia->setSesion($this);
        }

        return $this;
    }

    public function removeAsistencia(Asistencia $asistencia): self
    {
        if ($this->asistencias->removeElement($asistencia)) {
            // set the owning side to null (unless already changed)
            if ($asistencia->getSesion() === $this) {
                $asistencia->setSesion(null);
            }
        }

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
