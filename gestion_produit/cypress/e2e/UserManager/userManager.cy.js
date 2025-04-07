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
