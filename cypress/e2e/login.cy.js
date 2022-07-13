/// <reference types="cypress" />
const { loginPage, menuPage } = require('../support/page_objects')

describe('Funcionalidade de Login', () => {

    beforeEach(() => {
        cy.visit('/')
    });

    context('Realizar login e logout', () => {

        it('Realizar login', () => {
            loginPage.login(Cypress.config('usuario').usuario + Cypress.config('usuario').dominio, Cypress.config('usuario').senha)
            cy.visit('/')
            menuPage.tituloPainel.should('have.text', 'Assinatura de Cooler')
        })

        it('Realizar logout', () => {
            cy.loginBySingleSignOnRequest(Cypress.config('usuario').usuario + Cypress.config('usuario').dominio, Cypress.config('usuario').senha)
            cy.visit('estoque')
            menuPage.botaoUsuarioLogout.click()
            loginPage.tituloLogin.should('have.text', 'Please sign in')

        });
    });
});