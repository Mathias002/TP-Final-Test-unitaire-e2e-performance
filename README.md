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

### 🏁 2.3.4 Résultats obtenus  

✅ **Succès des tests** : Tous les scénarios se sont déroulés comme prévu.  

![UserManager test Specs TEST BODY](https://github.com/user-attachments/assets/596f6461-4166-441f-907a-be6155e7cffd)


📌 **Détails des résultats** :  
- **L’ajout de l’utilisateur** met bien à jour l’interface et les informations sont bien enregistrées.  
- **La modification des informations** est bien prise en compte, et la liste des utilisateurs affiche les nouvelles valeurs.  
- **La suppression** fonctionne correctement : l’utilisateur disparaît bien de la liste après confirmation.  
- **Aucun bug détecté** lors des tests.  

En conclusion, les tests valident le bon fonctionnement du module de gestion des utilisateurs dans un parcours utilisateur classique. 🚀  

---

## 2.4. Tests de Performance (JMeter)
<p align="center">
  <img src="https://jmeter.apache.org/images/logo.svg" alt="JMeter" height="40"/>
</p>

### 🚀 2.4.1. Méthodologie de Test

Les tests de performance ont été réalisés avec **Apache JMeter** en simulant **500 utilisateurs** ajoutant des comptes simultanément. L'objectif était d'évaluer la robustesse de l'application et d'identifier d'éventuels goulots d'étranglement.

#### 🔹 Configuration du Test
- **Nombre de threads (utilisateurs)** : 500
- **Période de montée en charge** : 15 secondes
- **Action simulée** : Ajout d'un nouvel utilisateur (méthode POST)
- **URL ciblée** : `.../gestion_produit/src/php/api.php`
- **Données envoyées** : `name=Test${__threadNum}&email=user${__threadNum}@test.com`

| **Threads (Users)** | **HTTP Request** | **HTTP Header Manager** |
|----------------|---------------------|--------------------|
| ![Thread Group](https://github.com/user-attachments/assets/acd3bc39-9d21-4dd2-8382-6e45865b3f55) | ![HTTP Request](https://github.com/user-attachments/assets/a5462098-13ae-47c4-ac10-617fe12419f9) | ![HTTP Header Manager](https://github.com/user-attachments/assets/b58f90c9-b92a-4bf9-ba1c-f6db80f27943) |

---

### 🧪 2.4.2. Résultats des Tests de Performance

#### 📊 Statistiques Générales

| Métrique | Valeur |
|---|---|
| **Nombre d'échantillons** | 500 |
| **Temps de réponse moyen** | 14 ms |
| **Temps de réponse médian** | 14 ms |
| **Temps de réponse au 90% centile** | 28 ms |
| **Temps de réponse minimum** | 3 ms |
| **Temps de réponse maximum** | 34 ms |
| **Taux d'erreur** | 0% |
| **Débit** | 33,4 requêtes/seconde |
| **Ko reçus par seconde** | 8,80 |
| **Ko envoyés par seconde** | 9,86 |

#### 📷 Captures des listeners et des résultats

**tableau de résultat**

![View Results in Table](https://github.com/user-attachments/assets/1c454ff9-95e5-4cfd-97d6-84fc096585fd)

---

**rapport agrégé**

![Aggregate Report](https://github.com/user-attachments/assets/f04f42f2-e61a-4ac8-89d6-047c0c725dcc)

---

**Arbre de résultat -1 (Résultat de l'échantillon)**

![View Results Tree-1](https://github.com/user-attachments/assets/b8ab6ba1-99c6-47b1-8f61-74f565b22419)

---

**Arbre de résultat -2 (Requête)**

![View Results Tree-2](https://github.com/user-attachments/assets/8d32a994-d881-4ba6-b98b-1f4c7c9c0b46)

---

**Interface utilisateur de l'application**

![Front UI](https://github.com/user-attachments/assets/0cd72864-51fe-4229-80ff-57db44f336e0)

---

**Table users DB**

![Back DB](https://github.com/user-attachments/assets/c153c2b0-7e1a-4650-b837-f4cabd6fba7d)

---

#### 📈 Distribution des Temps de Réponse

L'analyse détaillée des temps de réponse montre une distribution assez homogène :
- **La majorité des requêtes** sont traitées entre **4 et 21 ms**
- **Les requêtes les plus lentes** (90ème centile) sont traitées en **28 ms**
- **Aucune erreur** n'a été détectée, ce qui indique une bonne stabilité du système

**Graphique de résultats**

![Graph Results](https://github.com/user-attachments/assets/39c62932-1c70-4d15-99e1-68dd732ce85d)

#### 🔍 Analyse des Échantillons Individuels

L'examen des échantillons individuels révèle :
- **Temps d'établissement de connexion** : constant à 1 ms ou moins
- **Latence** : variant entre 4 et 32 ms, reflétant le temps de traitement réel
- **Taille des réponses** : constante à environ 270 octets, indiquant une structure de réponse uniforme

---

### 2.4.3. Analyse des Performances

#### ✅ **Points Forts**
- **Excellente stabilité** : aucune erreur sur les 500 requêtes simultanées
- **Temps de réponse rapide** : moyenne de 14 ms, bien en dessous des seuils critiques
- **Débit élevé** : 33,4 requêtes par seconde, permettant de traiter une charge importante
- **Écart-type faible** : faible variation entre le temps de réponse moyen et médian


#### 🔍 **Potentiels Goulots d'Étranglement**
À 500 utilisateurs simultanés, l'application ne présente pas de goulots d'étranglement évidents. Cependant, plusieurs points méritent attention :

1. **Temps de réponse maximum** (34 ms)  
   - Bien que restant très acceptable, certaines requêtes sont traitées en 2-3 fois plus de temps que la moyenne.
   - Une analyse plus approfondie des requêtes les plus lentes pourrait révéler des opportunités d'optimisation.

2. **Montée en charge**  
   - Les tests ont été réalisés avec une rampe de 15 secondes, ce qui a pu atténuer l'impact sur le serveur.
   - Des tests avec une montée en charge plus rapide pourraient révéler des comportements différents.

3. **Monitoring des ressources serveur**  
   - Les données de CPU, mémoire et E/S disque n'ont pas été capturées pendant les tests.
   - Ces métriques pourraient révéler des contraintes non visibles dans les temps de réponse.

---

### 2.4.4. Suggestions d'Optimisation

Bien que l'application montre d'excellentes performances, voici quelques recommandations pour renforcer sa robustesse :

1. **Mise en cache**  
   - Implémenter un système de cache pour les opérations de lecture fréquentes.

2. **Optimisation de la base de données**  
   - Ajouter des index sur les colonnes fréquemment recherchées.
   - Optimiser les requêtes SQL pour réduire le temps de traitement.

3. **Tests de charge plus intensifs**  
   - Augmenter le nombre d'utilisateurs simultanés (1000+) pour identifier les limites du système.
   - Tester des scénarios mixtes (lecture/écriture) pour simuler un usage réel.

4. **Monitoring proactif**  
   - Mettre en place des outils de surveillance pour détecter les variations de performance.
   - Établir des seuils d'alerte pour une intervention rapide en cas de dégradation.

---

### 2.4.5. 📌 Conclusion Tests de Performance

Les tests de performance démontrent que l'application est **robuste et performante**, capable de gérer sans difficulté **500 utilisateurs simultanés** avec des temps de réponse excellents (14 ms en moyenne).

L'absence d'erreurs lors des tests suggère une **bonne gestion des requêtes concurrentes**.

---

## 📂 Ressources
- **Documentation PHPUnit** : [https://phpunit.de](https://phpunit.de)
- **PHP 8.3 Documentation** : [https://www.php.net/releases/8.3/en.php](https://www.php.net/releases/8.3/en.php)

---

### ✨ Auteur  
*Mathias002* - *2025*  
