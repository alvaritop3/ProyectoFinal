<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230510191745 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE sesion ADD curso_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE sesion ADD CONSTRAINT FK_1B45E21B87CB4A1F FOREIGN KEY (curso_id) REFERENCES curso (id)');
        $this->addSql('CREATE INDEX IDX_1B45E21B87CB4A1F ON sesion (curso_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE sesion DROP FOREIGN KEY FK_1B45E21B87CB4A1F');
        $this->addSql('DROP INDEX IDX_1B45E21B87CB4A1F ON sesion');
        $this->addSql('ALTER TABLE sesion DROP curso_id');
    }
}
