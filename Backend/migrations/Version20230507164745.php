<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230507164745 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE curso (id INT AUTO_INCREMENT NOT NULL, nombre VARCHAR(255) NOT NULL, fecha_inicio DATE NOT NULL, fecha_fin DATE NOT NULL, precio DOUBLE PRECISION NOT NULL, estado VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE matricula (id INT AUTO_INCREMENT NOT NULL, atendida_por_id INT DEFAULT NULL, solicitada_por_id INT NOT NULL, curso_id INT NOT NULL, estado VARCHAR(255) NOT NULL, fecha DATE NOT NULL, INDEX IDX_15DF188540B0CD52 (atendida_por_id), INDEX IDX_15DF18859A13CC14 (solicitada_por_id), INDEX IDX_15DF188587CB4A1F (curso_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE sesion (id INT AUTO_INCREMENT NOT NULL, monitor_id INT DEFAULT NULL, fecha DATE NOT NULL, hora_inicio VARCHAR(255) DEFAULT NULL, INDEX IDX_1B45E21B4CE1C902 (monitor_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE sesion_alumno (sesion_id INT NOT NULL, alumno_id INT NOT NULL, INDEX IDX_C45847B41CCCADCB (sesion_id), INDEX IDX_C45847B4FC28E5EE (alumno_id), PRIMARY KEY(sesion_id, alumno_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE matricula ADD CONSTRAINT FK_15DF188540B0CD52 FOREIGN KEY (atendida_por_id) REFERENCES usuario (id)');
        $this->addSql('ALTER TABLE matricula ADD CONSTRAINT FK_15DF18859A13CC14 FOREIGN KEY (solicitada_por_id) REFERENCES alumno (id)');
        $this->addSql('ALTER TABLE matricula ADD CONSTRAINT FK_15DF188587CB4A1F FOREIGN KEY (curso_id) REFERENCES curso (id)');
        $this->addSql('ALTER TABLE sesion ADD CONSTRAINT FK_1B45E21B4CE1C902 FOREIGN KEY (monitor_id) REFERENCES usuario (id)');
        // $this->addSql('ALTER TABLE sesion_alumno ADD CONSTRAINT FK_C45847B41CCCADCB FOREIGN KEY (sesion_id) REFERENCES sesion (id) ON DELETE CASCADE');
        // $this->addSql('ALTER TABLE sesion_alumno ADD CONSTRAINT FK_C45847B4FC28E5EE FOREIGN KEY (alumno_id) REFERENCES alumno (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE matricula DROP FOREIGN KEY FK_15DF188540B0CD52');
        $this->addSql('ALTER TABLE matricula DROP FOREIGN KEY FK_15DF18859A13CC14');
        $this->addSql('ALTER TABLE matricula DROP FOREIGN KEY FK_15DF188587CB4A1F');
        $this->addSql('ALTER TABLE sesion DROP FOREIGN KEY FK_1B45E21B4CE1C902');
        // $this->addSql('ALTER TABLE sesion_alumno DROP FOREIGN KEY FK_C45847B41CCCADCB');
        // $this->addSql('ALTER TABLE sesion_alumno DROP FOREIGN KEY FK_C45847B4FC28E5EE');
        $this->addSql('DROP TABLE curso');
        $this->addSql('DROP TABLE matricula');
        $this->addSql('DROP TABLE sesion');
        $this->addSql('DROP TABLE sesion_alumno');
    }
}
