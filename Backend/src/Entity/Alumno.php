<?php

namespace App\Entity;

use App\Repository\AlumnoRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AlumnoRepository::class)]
class Alumno
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nombre = null;

    #[ORM\Column(length: 255)]
    private ?string $apellidos = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $fecha_nac = null;

    #[ORM\ManyToOne(inversedBy: 'alumnos')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Usuario $tutor = null;

    #[ORM\OneToMany(mappedBy: 'solicitadaPor', targetEntity: Matricula::class)]
    private Collection $matriculasRealizadas;

    #[ORM\OneToMany(mappedBy: 'alumno', targetEntity: Asistencia::class)]
    private Collection $asistencias;

    // #[ORM\ManyToMany(targetEntity: Sesion::class, mappedBy: 'alumnos')]
    // private Collection $sesiones;

    public function __construct()
    {
        $this->matriculasRealizadas = new ArrayCollection();
        // $this->sesiones = new ArrayCollection();
        $this->asistencias = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNombre(): ?string
    {
        return $this->nombre;
    }

    public function setNombre(string $nombre): self
    {
        $this->nombre = $nombre;

        return $this;
    }

    public function getApellidos(): ?string
    {
        return $this->apellidos;
    }

    public function setApellidos(string $apellidos): self
    {
        $this->apellidos = $apellidos;

        return $this;
    }

    public function getFechaNac(): ?\DateTimeInterface
    {
        return $this->fecha_nac;
    }

    public function setFechaNac(\DateTimeInterface $fecha_nac): self
    {
        $this->fecha_nac = $fecha_nac;

        return $this;
    }

    public function getTutor(): ?Usuario
    {
        return $this->tutor;
    }

    public function setTutor(?Usuario $tutor): self
    {
        $this->tutor = $tutor;

        return $this;
    }

    /**
     * @return Collection<int, Matricula>
     */
    public function getMatriculasRealizadas(): Collection
    {
        return $this->matriculasRealizadas;
    }

    public function addMatriculasRealizada(Matricula $matriculasRealizada): self
    {
        if (!$this->matriculasRealizadas->contains($matriculasRealizada)) {
            $this->matriculasRealizadas->add($matriculasRealizada);
            $matriculasRealizada->setSolicitadaPor($this);
        }

        return $this;
    }

    public function removeMatriculasRealizada(Matricula $matriculasRealizada): self
    {
        if ($this->matriculasRealizadas->removeElement($matriculasRealizada)) {
            // set the owning side to null (unless already changed)
            if ($matriculasRealizada->getSolicitadaPor() === $this) {
                $matriculasRealizada->setSolicitadaPor(null);
            }
        }

        return $this;
    }

    // /**
    //  * @return Collection<int, Sesion>
    //  */
    // public function getSesiones(): Collection
    // {
    //     return $this->sesiones;
    // }

    // public function addSesione(Sesion $sesione): self
    // {
    //     if (!$this->sesiones->contains($sesione)) {
    //         $this->sesiones->add($sesione);
    //         $sesione->addAlumno($this);
    //     }

    //     return $this;
    // }

    // public function removeSesione(Sesion $sesione): self
    // {
    //     if ($this->sesiones->removeElement($sesione)) {
    //         $sesione->removeAlumno($this);
    //     }

    //     return $this;
    // }

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
            $asistencia->setAlumno($this);
        }

        return $this;
    }

    public function removeAsistencia(Asistencia $asistencia): self
    {
        if ($this->asistencias->removeElement($asistencia)) {
            // set the owning side to null (unless already changed)
            if ($asistencia->getAlumno() === $this) {
                $asistencia->setAlumno(null);
            }
        }

        return $this;
    }
}
