// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('correctLogin', (Username, Password) => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type(Username)
    cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type(Password)
    cy.get('.oxd-button').click()
})

Cypress.Commands.add('projct', (Project, Activity) => {
    cy.get('.oxd-button--ghost').click()
    cy.get('.oxd-autocomplete-text-input > input').type(Project)
    cy.findAllByText('ACME Ltd - ACME Ltd').click()
    cy.get('.oxd-select-text--after > .oxd-icon').click()
    cy.findByText('Administration').click()
    cy.get('.oxd-button--secondary').click()
})

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })