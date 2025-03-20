# TP - Gestion des Utilisateurs - Tests Unitaires et Fonctionnels

## 1. Introduction

### 📌 Présentation de l'application
L'application testée est un **système de gestion des utilisateurs** permettant d'ajouter, modifier, supprimer et consulter des utilisateurs. Elle assure une gestion efficace des comptes en garantissant la validité des données et en évitant les doublons.

### 🛠️ Outils utilisés pour les tests
- **PHPUnit** : Framework de tests unitaires pour PHP  
- **SQLite (en mémoire)** : Base de données utilisée pour les tests  
- **PHP 8.3** : Version utilisée pour l’exécution des tests
- **Selenium** : Outils pour les tests End-to-End (E2E)
- **Cypress** : Outils pour les tests End-to-End (E2E)
- **JMeter** : Outils pour les tests de performance et de charge

### 🎯 Objectif du rapport
Ce rapport documente les différents tests réalisés sur l'application afin de valider son bon fonctionnement et sa robustesse. J'ai réalisé des tests fonctionnels, des tests End-to-End, des tests de non-régression et des tests de performance.

---

## 2. Résultats des Tests

### 🧪 2.1. Préparation et Nettoyage des Tests

Les tests PHPUnit utilisent deux méthodes essentielles :  

#### 🔹 `setUp()`
Cette méthode est exécutée **avant chaque test** pour initialiser l’environnement de test.  
Dans notre cas, elle :  
1. **Crée une base SQLite en mémoire** (elle est vide à chaque test).  
2. **Génère la table `users`** avec les colonnes `id`, `name` et `email`.  
3. **Instancie la classe `UserManager`** et lui injecte la base SQLite.  

![setUp](https://github.com/user-attachments/assets/cd98cc05-6bde-417c-bcfc-8cffab933fd5)


💡 **Pourquoi ?** Cela garantit que chaque test commence dans un environnement propre, sans interférences avec les autres tests.

#### 🔹 `tearDown()`
Cette méthode est exécutée **après chaque test** pour **nettoyer la mémoire**.  
Elle permet notamment de :  
- **Détruire la connexion PDO** pour éviter toute persistance indésirable des données.  

![tearDown](https://github.com/user-attachments/assets/4f9ae53e-404f-403a-b4f7-f3858e3aca62)


💡 **Pourquoi ?** Cela empêche un test d'affecter un autre et assure des résultats fiables.

---

### 🧪 2.2. Tests Fonctionnels (PHPUnit)
<p align="center">
  <img src="https://phpunit.de/img/phpunit.svg" alt="PHPUnit" height="40"/>
</p>

#### 📋 Méthodologie
Les tests unitaires et fonctionnels ont été réalisés avec **PHPUnit**. Chaque test vérifie une action spécifique de l'application, notamment l'ajout, la modification et la suppression d'un utilisateur.

#### 🔍 Liste des tests effectués et résultats

| Test | Description | Code | Résultat |
|---|----------|-------|---------|
| **testAddUser** | Vérifie qu’un utilisateur est bien ajouté à la base de données | ![testAddUser](https://github.com/user-attachments/assets/43df71c6-1da2-4a1d-aaf3-778c4bf4b97d) | ✅ Réussi |
| **testAddUserEmailException** | Vérifie qu’un email invalide génère une erreur | ![testAddUserEmailException](https://github.com/user-attachments/assets/132794b4-d5af-4f0f-a17e-aa40184bb401) | ✅ Réussi |
| **testUpdateUser** | Vérifie que la modification d’un utilisateur est bien enregistrée | ![testUpdateUser](https://github.com/user-attachments/assets/8ccfdd65-2878-4a10-bfae-f1624767b592) | ✅ Réussi |
| **testInvalidUpdateThrowsException** | Vérifie qu’une modification invalide génère une erreur | ![testInvalidUpdateThrowsException](https://github.com/user-attachments/assets/d4fdacf2-b0f1-4cb2-a1ac-296df3a59eee) | ❌ Échec |
| **testRemoveUser** | Vérifie qu’un utilisateur est bien supprimé | ![testRemoveUser](https://github.com/user-attachments/assets/f8195192-df85-4b23-93ef-065b3e8fbc72) | ✅ Réussi |
| **testInvalidDeleteThrowsException** | Vérifie qu’une suppression invalide génère une erreur | ![testInvalidDeleteThrowsException](https://github.com/user-attachments/assets/9bdeb910-6c24-4619-af74-61e5411911df) | ❌ Échec |
| **testGetUsers** | Vérifie la récupération de la liste des utilisateurs | ![testGetUsers](https://github.com/user-attachments/assets/12a277c1-5aaf-4b0d-a44a-bddedd43d5bc) | ✅ Réussi |
| **testGetUser** | Vérifie la récupération d'un utilisateur | ![testGetUser](https://github.com/user-attachments/assets/b6da2b30-90c3-4f72-9c80-29512632e0a6) | ✅ Réussi |
| **testInvalidGetUserThrowsException** | Vérifie qu'une récupération invalide génère une erreur | ![testInvalidGetUserThrowsException](https://github.com/user-attachments/assets/ed5dc326-7514-4d08-87a5-276706569826) | ✅ Réussi |

ℹ️ **Les deux tests en échec** concernent des exceptions non levées. Une correction est nécessaire dans la gestion des erreurs.

---

### 📸 Captures d'écran des résultats des tests
<!-- Ajoute ici des captures d’écran des résultats PHPUnit -->
![resultat tests TestUserManager php](https://github.com/user-attachments/assets/7a16a0a3-3b05-48a7-87e3-20bd804962e9)

---

### 2.3. Explication des Tests et Résultats

#### ✅ **Tests réussis**
Les tests validés prouvent que les fonctionnalités suivantes sont bien implémentées :
- **Ajout d’un utilisateur** en base de données ✅
- **Modification des informations** d’un utilisateur ✅
- **Suppression d’un utilisateur** ✅
- **Récupération des utilisateurs enregistrés** ✅

#### ❌ **Tests échoués**
Les deux tests en échec sont liés à la **gestion des erreurs** :
1. **testInvalidUpdateThrowsException**  
   - **Problème** : Le test attend une **InvalidArgumentException** pour une mise à jour invalide, mais elle n’est pas levée.  
   - **Correction possible** : Vérifier la validation des entrées dans `updateUser()`.  

2. **testInvalidDeleteThrowsException**  
   - **Problème** : Le test attend une **InvalidArgumentException** pour la suppression d’un utilisateur inexistant, mais l'exception n'est pas levée.  
   - **Correction possible** : Ajouter un contrôle pour empêcher la suppression d'un ID inexistant.  

---

### 2.4. 📌 Conclusion Tests Fonctionnels

Les tests démontrent que l’application fonctionne correctement pour **les cas standards**, mais nécessitent des ajustements pour la gestion des erreurs.  
👉 **Prochaine étape** : Corriger les exceptions manquantes pour garantir une validation robuste.

---





## 📂 Ressources
- **Documentation PHPUnit** : [https://phpunit.de](https://phpunit.de)
- **PHP 8.3 Documentation** : [https://www.php.net/releases/8.3/en.php](https://www.php.net/releases/8.3/en.php)

---

### ✨ Auteur  
*Mathias002* - *2025*  
