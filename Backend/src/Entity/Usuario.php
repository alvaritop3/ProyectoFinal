<?php

namespace App\Entity;

use App\Repository\UsuarioRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

#[ORM\Entity(repositoryClass: UsuarioRepository::class)]
class Usuario implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 180, unique: true)]
    private ?string $email = null;

    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    private ?string $password = null;

    #[ORM\Column(length: 255)]
    private ?string $nombre = null;

    #[ORM\Column(length: 255)]
    private ?string $apellidos = null;

    #[ORM\Column(length: 255)]
    private ?string $telefono = null;

    #[ORM\Column(type: Types::DATE_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $fecha_incorp = null;

    #[ORM\Column(length: 255)]
    private ?string $direccion = null;

    #[ORM\OneToMany(mappedBy: 'tutor', targetEntity: Alumno::class)]
    private Collection $alumnos;

    #[ORM\OneToMany(mappedBy: 'atendidaPor', targetEntity: Matricula::class)]
    private Collection $matriculasAtendidas;

    #[ORM\OneToMany(mappedBy: 'monitor', targetEntity: Sesion::class)]
    private Collection $sesiones;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $foto = null;

    public function __construct()
    {
        $this->alumnos = new ArrayCollection();
        $this->matriculasAtendidas = new ArrayCollection();
        $this->sesiones = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @deprecated since Symfony 5.3, use getUserIdentifier instead
     */
    public function getUsername(): string
    {
        return $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
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

    public function getTelefono(): ?string
    {
        return $this->telefono;
    }

    public function setTelefono(string $telefono): self
    {
        $this->telefono = $telefono;

        return $this;
    }

    public function getFechaIncorp(): ?\DateTimeInterface
    {
        return $this->fecha_incorp;
    }

    public function setFechaIncorp(?\DateTimeInterface $fecha_incorp): self
    {
        $this->fecha_incorp = $fecha_incorp;

        return $this;
    }

    public function getDireccion(): ?string
    {
        return $this->direccion;
    }

    public function setDireccion(string $direccion): self
    {
        $this->direccion = $direccion;

        return $this;
    }

    /**
     * @return Collection<int, Alumno>
     */
    public function getAlumnos(): Collection
    {
        return $this->alumnos;
    }

    public function addAlumno(Alumno $alumno): self
    {
        if (!$this->alumnos->contains($alumno)) {
            $this->alumnos->add($alumno);
            $alumno->setTutor($this);
        }

        return $this;
    }

    public function removeAlumno(Alumno $alumno): self
    {
        if ($this->alumnos->removeElement($alumno)) {
            // set the owning side to null (unless already changed)
            if ($alumno->getTutor() === $this) {
                $alumno->setTutor(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Matricula>
     */
    public function getMatriculasAtendidas(): Collection
    {
        return $this->matriculasAtendidas;
    }

    public function addMatriculasAtendida(Matricula $matriculasAtendida): self
    {
        if (!$this->matriculasAtendidas->contains($matriculasAtendida)) {
            $this->matriculasAtendidas->add($matriculasAtendida);
            $matriculasAtendida->setAtendidaPor($this);
        }

        return $this;
    }

    public function removeMatriculasAtendida(Matricula $matriculasAtendida): self
    {
        if ($this->matriculasAtendidas->removeElement($matriculasAtendida)) {
            // set the owning side to null (unless already changed)
            if ($matriculasAtendida->getAtendidaPor() === $this) {
                $matriculasAtendida->setAtendidaPor(null);
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

    public function addSesione(Sesion $sesione): self
    {
        if (!$this->sesiones->contains($sesione)) {
            $this->sesiones->add($sesione);
            $sesione->setMonitor($this);
        }

        return $this;
    }

    public function removeSesione(Sesion $sesione): self
    {
        if ($this->sesiones->removeElement($sesione)) {
            // set the owning side to null (unless already changed)
            if ($sesione->getMonitor() === $this) {
                $sesione->setMonitor(null);
            }
        }

        return $this;
    }

    public function getFoto(): ?string
    {
        return $this->foto;
    }

    public function setFoto(?string $foto): self
    {
        $this->foto = $foto;

        return $this;
    }
}
