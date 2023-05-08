<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230507173059 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE asistencia ADD alumno_id INT DEFAULT NULL, ADD sesion_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE asistencia ADD CONSTRAINT FK_D8264A8DFC28E5EE FOREIGN KEY (alumno_id) REFERENCES alumno (id)');
        $this->addSql('ALTER TABLE asistencia ADD CONSTRAINT FK_D8264A8D1CCCADCB FOREIGN KEY (sesion_id) REFERENCES sesion (id)');
        $this->addSql('CREATE INDEX IDX_D8264A8DFC28E5EE ON asistencia (alumno_id)');
        $this->addSql('CREATE INDEX IDX_D8264A8D1CCCADCB ON asistencia (sesion_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE asistencia DROP FOREIGN KEY FK_D8264A8DFC28E5EE');
        $this->addSql('ALTER TABLE asistencia DROP FOREIGN KEY FK_D8264A8D1CCCADCB');
        $this->addSql('DROP INDEX IDX_D8264A8DFC28E5EE ON asistencia');
        $this->addSql('DROP INDEX IDX_D8264A8D1CCCADCB ON asistencia');
        $this->addSql('ALTER TABLE asistencia DROP alumno_id, DROP sesion_id');
    }
}
