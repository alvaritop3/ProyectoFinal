<?php

namespace App\Entity;

use App\Repository\CursoRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CursoRepository::class)]
class Curso
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nombre = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $fecha_inicio = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    private ?\DateTimeInterface $fecha_fin = null;

    #[ORM\Column]
    private ?float $precio = null;

    #[ORM\Column(length: 255)]
    private ?string $estado = null;

    #[ORM\OneToMany(mappedBy: 'curso', targetEntity: Matricula::class)]
    private Collection $matriculas;

    #[ORM\OneToMany(mappedBy: 'curso', targetEntity: Sesion::class)]
    private Collection $sesiones;

    public function __construct()
    {
        $this->matriculas = new ArrayCollection();
        $this->sesiones = new ArrayCollection();
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

    public function getFechaInicio(): ?\DateTimeInterface
    {
        return $this->fecha_inicio;
    }

    public function setFechaInicio(\DateTimeInterface $fecha_inicio): self
    {
        $this->fecha_inicio = $fecha_inicio;

        return $this;
    }

    public function getFechaFin(): ?\DateTimeInterface
    {
        return $this->fecha_fin;
    }

    public function setFechaFin(\DateTimeInterface $fecha_fin): self
    {
        $this->fecha_fin = $fecha_fin;

        return $this;
    }

    public function getPrecio(): ?float
    {
        return $this->precio;
    }

    public function setPrecio(float $precio): self
    {
        $this->precio = $precio;

        return $this;
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

    /**
     * @return Collection<int, Matricula>
     */
    public function getMatriculas(): Collection
    {
        return $this->matriculas;
    }

    public function addMatricula(Matricula $matricula): self
    {
        if (!$this->matriculas->contains($matricula)) {
            $this->matriculas->add($matricula);
            $matricula->setCurso($this);
        }

        return $this;
    }

    public function removeMatricula(Matricula $matricula): self
    {
        if ($this->matriculas->removeElement($matricula)) {
            // set the owning side to null (unless already changed)
            if ($matricula->getCurso() === $this) {
                $matricula->setCurso(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Sesion>
     */
    public function getSesiones(): Collection
    {
        return $this->sesiones;
    }

    public function addSesion(Sesion $sesion): self
    {
        if (!$this->sesiones->contains($sesion)) {
            $this->sesiones->add($sesion);
            $sesion->setCurso($this);
        }

        return $this;
    }

    public function removeSesion(Sesion $sesion): self
    {
        if ($this->sesiones->removeElement($sesion)) {
            // set the owning side to null (unless already changed)
            if ($sesion->getCurso() === $this) {
                $sesion->setCurso(null);
            }
        }

        return $this;
    }
}
