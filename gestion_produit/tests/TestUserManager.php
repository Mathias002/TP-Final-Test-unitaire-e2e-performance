<?php

namespace Ehwa\GestionProduit\tests;

use PHPUnit\Framework\TestCase;
use Ehwa\GestionProduit\php\UserManager;
use PDO;

class TestUserManager extends TestCase
{
    private PDO $pdo;
    private UserManager $userManager;

    protected function setUp(): void
    {
        // Connexion à SQLite en mémoire
        $this->pdo = new PDO('sqlite::memory:', null, null, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
        ]);

        // Création de la table "users"
        $this->pdo->exec("CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(150) NOT NULL UNIQUE
        )");

        // Instanciation de UserManager avec SQLite
        $this->userManager = new UserManager();
        
        // Remplacement de la connexion par SQLite
        $reflection = new \ReflectionClass(UserManager::class);
        $dbProperty = $reflection->getProperty('db');
        $dbProperty->setAccessible(true);
        $dbProperty->setValue($this->userManager, $this->pdo);
    }

    protected function tearDown(): void
    {
        // Nettoyage de la connexion PDO
        unset($this->pdo);
    }

    public function testAddUser()
    {
        // Ajout d'un utilisateur
        $this->userManager->addUser("Asahi", "asahi.lala@gmail.com");

        // Vérification de l'ajout en base
        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute(["asahi.lala@gmail.com"]);
        $user = $stmt->fetch();

        // Assertions
        $this->assertNotFalse($user);
        $this->assertEquals("Asahi", $user['name']);
        $this->assertEquals("asahi.lala@gmail.com", $user['email']);
    }

    public function testAddUserEmailException()
    {
        // Vérification qu'une exception est bien levée
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage("Email invalide.");

        // Tentative d'ajout d'un utilisateur avec un email invalide
        $this->userManager->addUser("Asahi", "email-invalide");
    }

    public function testUpdateUser()
    {
        // Ajout d'un utilisateur initial
        $this->userManager->addUser("Asahi", "asahi.lala@gmail.com");
        
        // Mise à jour des informations de l'utilisateur
        $this->userManager->updateUser(1, "AsahiUpdated", "asahiUpdated.lala@gmail.com");

        // Vérification de la mise à jour
        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE id = ?");
        $stmt->execute([1]);
        $user = $stmt->fetch();

        // Assertions
        $this->assertNotFalse($user);
        $this->assertEquals("AsahiUpdated", $user['name']);
        $this->assertEquals("asahiUpdated.lala@gmail.com", $user['email']);
    }

    public function testInvalidUpdateThrowsException()
    {
        // Vérification qu'une exception est levée en cas de modification invalide
        $this->expectException(\InvalidArgumentException::class);

        // Tentative de modification avec un email invalide
        $this->userManager->updateUser(1, "Asahi", "email-invalide");
    }

    public function testRemoveUser()
    {
        // Ajout d'un utilisateur
        $this->userManager->addUser("Asahi", "asahi.lala@gmail.com");
        
        // Suppression de l'utilisateur
        $this->userManager->removeUser(1);
        
        // Vérification que l'utilisateur a bien été supprimé
        $stmt = $this->pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute(["asahi.lala@gmail.com"]);
        $user = $stmt->fetch();

        // Assertion
        $this->assertFalse($user);
    }

    public function testInvalidDeleteThrowsException()
    {
        // Vérification qu'une exception est levée en cas de suppression invalide
        $this->expectException(\InvalidArgumentException::class);

        // Tentative de suppression d'un utilisateur inexistant
        $this->userManager->removeUser(1);
    }

    public function testGetUsers()
    {
        // Ajout de plusieurs utilisateurs
        $this->userManager->addUser("Asahi", "asahi.lala@gmail.com");
        $this->userManager->addUser("Kitagawa", "kitagawa.riri@gmail.com");

        // Récupération des utilisateurs
        $users = $this->userManager->getUsers();

        // Assertions
        $this->assertNotFalse($users);
        $this->assertIsArray($users);
        $this->assertCount(2, $users);
    }

    public function testGetUser()
    {
        // Ajout d'un utilisateur
        $this->userManager->addUser("Asahi", "asahi.lala@gmail.com");

        // Récupération de l'utilisateur
        $user = $this->userManager->getUser(1);

        // Assertions
        $this->assertNotFalse($user);
        $this->assertIsArray($user);
        $this->assertEquals(1, $user["id"]);
        $this->assertEquals("Asahi", $user["name"]);
        $this->assertEquals("asahi.lala@gmail.com", $user["email"]);
    }

    public function testInvalidGetUserThrowsException()
    {
        // Vérification qu'une exception est levée en cas de tentative de récupération d'un utilisateur inexistant
        $this->expectException(\Exception::class);
        $this->expectExceptionMessage("Utilisateur introuvable.");

        // Tentative de récupération d'un utilisateur qui n'existe pas
        $this->userManager->getUser(2);
    }
}