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

### 2.1. Tests Fonctionnels (PHPUnit)
<p align="center">
  <img src="https://phpunit.de/img/phpunit.svg" alt="PHPUnit" height="40"/>
</p>

#### 🧪 2.1.1. Préparation et Nettoyage des Tests

Les tests PHPUnit utilisent deux méthodes essentielles :  

##### 🔹 `setUp()`
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

#### 🧪 2.1.2. Résultats tests Fonctionnels (PHPUnit)

##### 📋 Méthodologie
Les tests unitaires et fonctionnels ont été réalisés avec **PHPUnit**. Chaque test vérifie une action spécifique de l'application, notamment l'ajout, la modification et la suppression d'un utilisateur.

##### 🔍 Liste des tests effectués et résultats

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

##### 📸 Captures d'écran des résultats des tests
<!-- Ajoute ici des captures d’écran des résultats PHPUnit -->
![resultat tests TestUserManager php](https://github.com/user-attachments/assets/7a16a0a3-3b05-48a7-87e3-20bd804962e9)

---

#### 2.1.3. Explication des Tests et Résultats

##### ✅ **Tests réussis**
Les tests validés prouvent que les fonctionnalités suivantes sont bien implémentées :
- **Ajout d’un utilisateur** en base de données ✅
- **Modification des informations** d’un utilisateur ✅
- **Suppression d’un utilisateur** ✅
- **Récupération des utilisateurs enregistrés** ✅

##### ❌ **Tests échoués**
Les deux tests en échec sont liés à la **gestion des erreurs** :
1. **testInvalidUpdateThrowsException**  
   - **Problème** : Le test attend une **InvalidArgumentException** pour une mise à jour invalide, mais elle n’est pas levée.  
   - **Correction possible** : Vérifier la validation des entrées dans `updateUser()`.  

2. **testInvalidDeleteThrowsException**  
   - **Problème** : Le test attend une **InvalidArgumentException** pour la suppression d’un utilisateur inexistant, mais l'exception n'est pas levée.  
   - **Correction possible** : Ajouter un contrôle pour empêcher la suppression d'un ID inexistant.  

---

#### 2.1.4. 📌 Conclusion Tests Fonctionnels

Les tests démontrent que l’application fonctionne correctement pour **les cas standards**, mais nécessitent des ajustements pour la gestion des erreurs.  
👉 **Prochaine étape** : Corriger les exceptions manquantes pour garantir une validation robuste.

---

### 🧪 2.2. Tests End-to-End (E2E) (Selenium)
<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Selenium_Logo.png" alt="Selenium" height="40"/>
</p>

#### 🎯 2.2.1 Objectif des tests E2E
Les tests End-to-End (E2E) permettent de vérifier le bon fonctionnement global de l’application en simulant un parcours utilisateur réel. L’objectif principal est d’automatiser et de valider les interactions clés avec l’interface utilisateur.  

Dans ce projet, j'ai utilisé **Selenium** pour tester les fonctionnalités essentielles du module de gestion des utilisateurs :  
✅ Ajout d’un nouvel utilisateur  
✅ Vérification de son affichage dans la liste  
✅ Modification de ses informations  
✅ Suppression de l’utilisateur et vérification de sa disparition  

---

#### ⚙️ 2.2.2 Déroulement du test automatisé

Le test se déroule en **quatre étapes successives**, qui valident chacune une fonctionnalité de l’application.  

1️⃣ **Ajout d’un utilisateur**  
- L’utilisateur saisit un **nom** et un **email** dans le formulaire.  
- Il clique sur le bouton **"Ajouter"**.  
- L’application affiche l’utilisateur dans la liste des utilisateurs.  
- Vérification que l’utilisateur est bien ajouté en vérifiant les élèments affichées.  

2️⃣ **Modification des informations de l’utilisateur**  
- L’utilisateur clique sur le bouton **✏️ Modifier** à côté de son nom.  
- Il modifie les informations (**nom** et **email**).  
- Il valide la modification en cliquant sur le bouton d’enregistrement.  
- Vérification que les nouvelles informations sont bien mises à jour dans la liste.  

3️⃣ **Vérification des informations mises à jour**  
- Récupération du texte affiché après modification.  
- Comparaison avec les informations initiales pour s’assurer qu’il y a bien eu un changement.  

4️⃣ **Suppression de l’utilisateur**  
- L’utilisateur clique sur le bouton **❌ Supprimer** à côté de son nom.  
- Vérification que l’utilisateur a bien disparu de la liste et que la suppression a été effectuée correctement.  

---

##### 📸 Captures d'écran des résultats des tests
| Capture 1 | Capture 2 |
|-----------|-----------|
| ![resultat tests E2E UserManager Selenium-1](https://github.com/user-attachments/assets/e1db91bf-6fa3-4fe3-afd0-d7939098808d) | ![resultat tests E2E UserManager Selenium-2](https://github.com/user-attachments/assets/01a8ba78-ecab-47a5-a64d-24946b8c7f67) |

---

#### 2.2.3 Résultats obtenus

✅ **Succès des tests** : Tous les scénarios se sont déroulés comme prévu.  

📌 **Détails des résultats** :  
- **L’ajout de l’utilisateur** met bien à jour l’interface et les informations sont bien enregistrées.  
- **La modification des informations** est bien prise en compte, et la liste des utilisateurs affiche les nouvelles valeurs.  
- **La suppression** fonctionne correctement : l’utilisateur disparaît bien de la liste après confirmation.  
- **Aucun bug détecté** lors des tests.  

En conclusion, les tests valident le bon fonctionnement du module de gestion des utilisateurs dans un parcours utilisateur classique. 🚀  

---

Bien sûr ! Voici la version finale bien structurée et segmentée en trois tableaux pour chaque action des tests **Cypress**.  

---

## 🧪 2.3 Tests End-to-End (E2E) avec Cypress  

<p align="center">
  <img src="https://raw.githubusercontent.com/cypress-io/cypress/develop/assets/cypress-logo-dark.png" alt="Cypress" height="40"/>
</p>

### ⚙️ 2.3.1 Tests avec Cypress  

Dans cette section, je vais detailler les tests **E2E** réalisés avec **Cypress** pour valider les fonctionnalités principales de l’application :  

- **Ajout d’un utilisateur** via l’interface utilisateur  
- **Vérification de son affichage** dans la liste des utilisateurs  
- **Modification des informations** de l’utilisateur  
- **Vérification de la mise à jour** des informations 
- **Suppression de l’utilisateur** et vérification de sa disparition  

#### 🕹️ Installation et configuration de Cypress  

Tout d'abord il est néccessaire d'installer **Cypress** avec la commande suivante :  

```sh
npm install cypress --save-dev
```

Puis, lancez Cypress avec :  

```sh
npx cypress open
```

#### 🔢 Scénario de test avec Cypress  

Le test automatisé suit le scénario suivant :  

1. **Accès à l'application**  
2. **Ajout d'un utilisateur** en remplissant le formulaire  
3. **Vérification de son affichage dans la liste**  
4. **Modification des informations de l'utilisateur**  
5. **Vérification de la mise à jour des informations**  
6. **Suppression de l'utilisateur**  
7. **Vérification de sa suppression de la liste**  

---

### 🖥️ 2.3.2 Code des tests Cypress  

```javascript
describe('E2E Tests - User Management', () => {
  it('should add, update, and delete a user successfully', () => {
    
    // Accéder à l'application
    cy.visit('http://localhost/Efrei/M1/Test%20unit/TP-Final-Test-unitaire-e2e-performance/gestion_produit/')

    // Définition des informations du nouvel utilisateur
    const newUserName = 'Asahi'
    const newUserEmail = 'asahi.lala@gmail.com' 

    // Ajouter un nouvel utilisateur
    cy.get('#name').type(newUserName)
    cy.get('#email').type(`${newUserEmail}{enter}`)

    // Vérifier que l'utilisateur est bien ajouté à la liste
    cy.get('#userList li')
      .should('contain', newUserName)
      .and('contain', newUserEmail)

    // Cliquer sur le bouton de modification (premier bouton "✏️")
    cy.get('#userList li button').first().click()

    // Effacer les anciens inputs
    cy.get('#name').clear()
    cy.get('#email').clear()

    // Définition des nouvelles informations de l'utilisateur
    const updatedUserName = 'AsahiUpdated'
    const updatedUserEmail = 'asahiUpdated.lala@gmail.com' 

    // Modifier les informations et valider
    cy.get('#name').type(updatedUserName)
    cy.get('#email').type(`${updatedUserEmail}{enter}`)

    // Vérifier que la mise à jour a bien été prise en compte
    cy.get('#userList li')
      .first()
      .should('contain', updatedUserName)
      .and('contain', updatedUserEmail)

    // Cliquer sur le bouton de suppression (dernier bouton "❌")
    cy.get('#userList li button').last().click()

    // Vérifier que l'utilisateur a bien été supprimé
    cy.get('#userList li').should('not.exist')
  })
})
```

---

### 📊 2.3.3 Détails des tests Cypress  

#### 📌 Ajout d'un utilisateur

| **Étape**             | **Description** | **Capture d'écran** | **Statut** |
|----------------------|----------------|---------------------|------------|
| **Accès à l'application** | L'utilisateur accède à l'interface web de gestion. | ![UserManager test -Accès à l'application-](https://github.com/user-attachments/assets/9eb86727-c6dc-47db-9a2d-f8834556807d) | ✅ |
| **Saisie des informations** | Remplissage du formulaire avec le nom et l’email puis soumission du formulaire | ![UserManager test -Saisie des informations-](https://github.com/user-attachments/assets/46d7fd12-de48-49eb-9c5b-f55b9731e16c) | ✅ |
| **Validation de l’ajout** | On verifie si le nouvel utilisateur est présent dans la liste. | ![UserManager test -Verification de l'affichage-](https://github.com/user-attachments/assets/21f741c5-8191-40c0-81a7-92334d125185) | ✅ |

---

#### ✏️ Modification d'un utilisateur 

| **Étape**             | **Description** | **Capture d'écran** | **Statut** |
|----------------------|----------------|---------------------|------------|
| **Sélection de l'utilisateur** | Clic sur le bouton de modification du premier utilisateur. | ![UserManager test -Sélection de l'utilisateur-](https://github.com/user-attachments/assets/6ca1766b-dcef-46e2-92e3-a8475e125331) | ✅ |
| **Mise à jour des informations et soumission** | Effacement des champs, saisie des nouvelles données et soumission | ![UserManager test -Mise à jour des informations et validation-](https://github.com/user-attachments/assets/e772f04f-7e1e-4aa0-97a5-e9949b6cd9f5) | ✅ |
| **Vérification des changements** | Vérification de la mise à jour des informations affichées. | ![UserManager test -Vérification des changements-](https://github.com/user-attachments/assets/ee22dc51-8594-4cce-b7c4-491bb2e400a2) | ✅ |

---

#### ❌ Suppression d'un utilisateur

| **Étape**             | **Description** | **Capture d'écran** | **Statut** |
|----------------------|----------------|---------------------|------------|
| **Sélection de l'utilisateur** | Clic sur le bouton de suppression du dernier utilisateur. | ![UserManager test -Sélection de l'utilisateur à supprimer-](https://github.com/user-attachments/assets/58773796-2d81-42b9-b6ef-df7f00f511d8) | ✅ |
| **Confirmation de la suppression** | L’utilisateur disparaît de la liste après suppression. | ![UserManager test -Confirmation de la suppression-](https://github.com/user-attachments/assets/a14a64cd-fe64-47a5-a3ff-9c6cf52163ae) | ✅ |

---

## 🏁 2.3.4 Résultats obtenus  

✅ **Succès des tests** : Tous les scénarios se sont déroulés comme prévu.  

![UserManager test Specs TEST BODY](https://github.com/user-attachments/assets/596f6461-4166-441f-907a-be6155e7cffd)


📌 **Détails des résultats** :  
- **L’ajout de l’utilisateur** met bien à jour l’interface et les informations sont bien enregistrées.  
- **La modification des informations** est bien prise en compte, et la liste des utilisateurs affiche les nouvelles valeurs.  
- **La suppression** fonctionne correctement : l’utilisateur disparaît bien de la liste après confirmation.  
- **Aucun bug détecté** lors des tests.  

En conclusion, les tests valident le bon fonctionnement du module de gestion des utilisateurs dans un parcours utilisateur classique. 🚀  

---


## 📂 Ressources
- **Documentation PHPUnit** : [https://phpunit.de](https://phpunit.de)
- **PHP 8.3 Documentation** : [https://www.php.net/releases/8.3/en.php](https://www.php.net/releases/8.3/en.php)

---

### ✨ Auteur  
*Mathias002* - *2025*  
