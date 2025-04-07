
// ◢◤◢◤◢◤◢◤◢◤◢◤◢◤ ◢◤ ◢◤  Code source de base sans fonctionnalité de recherche  ◥◣◥◣◥◣◥◣◥◣◥◣◥◣◥◣◥◣

// document.addEventListener("DOMContentLoaded", function () {
//     const userForm = document.getElementById("userForm");
//     const userList = document.getElementById("userList");
//     const userIdField = document.getElementById("userId");

//     function fetchUsers() {
//         // Modification : Changement du chemin d'accès du fichier php
//         // Avant : <code fetch("api.php", { </code>
//         // Après : <code fetch("./src/php/api.php", { </code>
//         // Raison : Ajustement du chemin relatif vers un chemin absolu pour une meilleure gestion des ressources.
//         fetch("./src/php/api.php")
//             .then(response => response.json())
//             .then(users => {
//                 userList.innerHTML = "";
//                 users.forEach(user => {
//                     const li = document.createElement("li");
//                     li.innerHTML = `${user.name} (${user.email})
//                         <button onclick="editUser(${user.id}, '${user.name}', '${user.email}')">✏️</button>
//                         <button onclick="deleteUser(${user.id})">❌</button>`;
//                     userList.appendChild(li);
//                 });
//             });
//     }

//     userForm.addEventListener("submit", function (e) {
//         e.preventDefault();
//         const name = document.getElementById("name").value;
//         const email = document.getElementById("email").value;
//         const userId = userIdField.value;

//         if (userId) {
//             // Modification : Changement du chemin d'accès du fichier php
//             // Avant : <code fetch("api.php", { </code>
//             // Après : <code fetch("./src/php/api.php", { </code>
//             // Raison : Ajustement du chemin relatif vers un chemin absolu pour une meilleure gestion des ressources.
//             fetch("./src/php/api.php", {
//                 method: "PUT",
//                 body: new URLSearchParams({ id: userId, name, email }),
//                 headers: { "Content-Type": "application/x-www-form-urlencoded" }
//             }).then(() => {
//                 fetchUsers();
//                 userForm.reset();
//                 userIdField.value = "";
//             });
//         } else {
//             // Modification : Changement du chemin d'accès du fichier php
//             // Avant : <code fetch("api.php", { </code>
//             // Après : <code fetch("./src/php/api.php", { </code>
//             // Raison : Ajustement du chemin relatif vers un chemin absolu pour une meilleure gestion des ressources.
//             fetch("./src/php/api.php", {
//                 method: "POST",
//                 body: new URLSearchParams({ name, email }),
//                 headers: { "Content-Type": "application/x-www-form-urlencoded" }
//             }).then(() => {
//                 fetchUsers();
//                 userForm.reset();
//             });
//         }
//     });

//     window.editUser = function (id, name, email) {
//         document.getElementById("name").value = name;
//         document.getElementById("email").value = email;
//         userIdField.value = id;
//     };

//     window.deleteUser = function (id) {
//         // Modification : Changement du chemin d'accès du fichier php
//         // Avant : <code fetch("api.php", { </code>
//         // Après : <code fetch("./src/php/api.php", { </code>
//         // Raison : Ajustement du chemin relatif vers un chemin absolu pour une meilleure gestion des ressources.
//         fetch(`./src/php/api.php?id=${id}`, { method: "DELETE" })
//             .then(() => fetchUsers());
//     };

//     fetchUsers();
// });

// ◢◤◢◤◢◤◢◤◢◤◢◤◢◤ ◢◤ ◢◤  Code source de base sans fonctionnalité de recherche  ◥◣◥◣◥◣◥◣◥◣◥◣◥◣◥◣◥◣

//≻──────────────────────────────────────────────────────────── ⋆✩⋆ ──────────────────────────────────────────────────────────────────────────≺

// ◢◤◢◤◢◤◢◤◢◤◢◤◢◤ ◢◤ ◢◤  Code modifié avec fonctionnalité de recherche  ◥◣◥◣◥◣◥◣◥◣◥◣◥◣◥◣◥◣

document.addEventListener("DOMContentLoaded", function () {
    const userForm = document.getElementById("userForm");
    const userList = document.getElementById("userList");
    const userIdField = document.getElementById("userId");
    const searchInput = document.getElementById("searchInput");
    const clearSearchButton = document.getElementById("clearSearch");
    
    // Variable pour stocker tous les utilisateurs
    let allUsers = [];

    function fetchUsers() {
        fetch("./src/php/api.php")
            .then(response => response.json())
            .then(users => {
                // Stocker tous les utilisateurs
                allUsers = users;
                // Afficher les utilisateurs (filtrés ou non)
                displayUsers(users);
            });
    }
    
    function displayUsers(users) {
        userList.innerHTML = "";
        if (users.length === 0) {
            const noResults = document.createElement("li");
            noResults.textContent = "Aucun utilisateur trouvé";
            noResults.classList.add("no-results");
            userList.appendChild(noResults);
            return;
        }
        
        users.forEach(user => {
            const li = document.createElement("li");
            li.innerHTML = `${user.name} (${user.email})
                <button onclick="editUser(${user.id}, '${user.name}', '${user.email}')">✏️</button>
                <button onclick="deleteUser(${user.id})">❌</button>`;
            userList.appendChild(li);
        });
    }
    
    // Fonction de recherche
    function searchUsers(query) {
        query = query.toLowerCase();
        const filteredUsers = allUsers.filter(user => 
            user.name.toLowerCase().includes(query) || 
            user.email.toLowerCase().includes(query)
        );
        displayUsers(filteredUsers);
    }
    
    // Écouteur d'événement pour la recherche
    searchInput.addEventListener("input", function() {
        searchUsers(this.value);
    });
    
    // Écouteur d'événement pour effacer la recherche
    clearSearchButton.addEventListener("click", function() {
        searchInput.value = "";
        displayUsers(allUsers);
    });

    userForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const userId = userIdField.value;

        if (userId) {
            fetch("./src/php/api.php", {
                method: "PUT",
                body: new URLSearchParams({ id: userId, name, email }),
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            }).then(() => {
                fetchUsers();
                userForm.reset();
                userIdField.value = "";
            });
        } else {
            fetch("./src/php/api.php", {
                method: "POST",
                body: new URLSearchParams({ name, email }),
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            }).then(() => {
                fetchUsers();
                userForm.reset();
            });
        }
    });

    window.editUser = function (id, name, email) {
        document.getElementById("name").value = name;
        document.getElementById("email").value = email;
        userIdField.value = id;
    };

    window.deleteUser = function (id) {
        fetch(`./src/php/api.php?id=${id}`, { method: "DELETE" })
            .then(() => fetchUsers());
    };

    fetchUsers();
});

// ◢◤◢◤◢◤◢◤◢◤◢◤◢◤ ◢◤ ◢◤  Code modifié avec fonctionnalité de recherche  ◥◣◥◣◥◣◥◣◥◣◥◣◥◣◥◣◥◣