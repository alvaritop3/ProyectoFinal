<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230507171836 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE asistencia (id INT AUTO_INCREMENT NOT NULL, asiste VARCHAR(255) NOT NULL, motivo VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE sesion_alumno (sesion_id INT NOT NULL, alumno_id INT NOT NULL, INDEX IDX_C45847B41CCCADCB (sesion_id), INDEX IDX_C45847B4FC28E5EE (alumno_id), PRIMARY KEY(sesion_id, alumno_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE sesion_alumno ADD CONSTRAINT FK_C45847B41CCCADCB FOREIGN KEY (sesion_id) REFERENCES sesion (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE sesion_alumno ADD CONSTRAINT FK_C45847B4FC28E5EE FOREIGN KEY (alumno_id) REFERENCES alumno (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE sesion_alumno DROP FOREIGN KEY FK_C45847B41CCCADCB');
        $this->addSql('ALTER TABLE sesion_alumno DROP FOREIGN KEY FK_C45847B4FC28E5EE');
        $this->addSql('DROP TABLE asistencia');
        $this->addSql('DROP TABLE sesion_alumno');
    }
}
