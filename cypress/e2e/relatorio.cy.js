/// <reference types="cypress" />
import { NfRandom } from "../support/Utils/common.js"
const { cdd, geografia, nomeOperacao, tipoRelatorio } = require('../fixtures')
const dayjs = require('dayjs')
const { relatorioPage, menuPage } = require('../support/page_objects')

describe('Funcionalidade de geração de relatórios', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.loginBySingleSignOnRequest(Cypress.config('usuario').usuario + Cypress.config('usuario').dominio, Cypress.config('usuario').senha)
        cy.visit('estoque')
    });

    context('Geração de relatórios do assinatura ', () => {
        it('18-Validar se no relatório de estoque exibe o usuário ambev que fez a adição de estoque', () => {
            const authorization = require('../fixtures/authorization.json')

            let RgEquipamentoRandom1 = JSON.stringify(Math.floor(Math.random() * (89999999999999 - 10000000000000)) + 10000000000000)
            let RgEquipamentoRandom2 = JSON.stringify(Math.floor(Math.random() * (89999999999999 - 10000000000000)) + 10000000000000)
            let RgEquipamentoRandom3 = JSON.stringify(Math.floor(Math.random() * (89999999999999 - 10000000000000)) + 10000000000000)
            let RgEquipamentoRandom4 = JSON.stringify(Math.floor(Math.random() * (89999999999999 - 10000000000000)) + 10000000000000)
            let RgEquipamentoRandom5 = JSON.stringify(Math.floor(Math.random() * (89999999999999 - 10000000000000)) + 10000000000000)
            let RgEquipamentoRandom6 = JSON.stringify(Math.floor(Math.random() * (89999999999999 - 10000000000000)) + 10000000000000)
            let RgEquipamentoRandom7 = JSON.stringify(Math.floor(Math.random() * (89999999999999 - 10000000000000)) + 10000000000000)
            let RgEquipamentoRandom8 = JSON.stringify(Math.floor(Math.random() * (89999999999999 - 10000000000000)) + 10000000000000)
            let RgEquipamentoRandom9 = JSON.stringify(Math.floor(Math.random() * (89999999999999 - 10000000000000)) + 10000000000000)

            cy.addEquipamentoRequest(authorization, geografia.geografia, '0538', NfRandom(), 3, 1, dayjs().format('DD/MM/YYYY'), 5, RgEquipamentoRandom1, 5, RgEquipamentoRandom2, 5, RgEquipamentoRandom3,
                5, RgEquipamentoRandom4, 5, RgEquipamentoRandom5, 5, RgEquipamentoRandom6, 5, RgEquipamentoRandom7, 5, RgEquipamentoRandom8, 5, RgEquipamentoRandom9)

            cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
            menuPage.menuButtonRelatorio.click()
            relatorioPage.selectTipoDeRelatorio(tipoRelatorio.Estoque)
            relatorioPage.clickBotaoExtrairRelatorio()
            cy.wait(25000)
            cy.readFile('cypress/downloads/extracted.csv').should('have.string', Cypress.config('usuario').usuario)
            cy.readFile('cypress/downloads/extracted.csv').should('have.string', RgEquipamentoRandom1)
            cy.readFile('cypress/downloads/extracted.csv').should('have.string', RgEquipamentoRandom2)
            cy.readFile('cypress/downloads/extracted.csv').should('have.string', RgEquipamentoRandom3)
            cy.readFile('cypress/downloads/extracted.csv').should('have.string', RgEquipamentoRandom4)
            cy.readFile('cypress/downloads/extracted.csv').should('have.string', RgEquipamentoRandom5)
            cy.readFile('cypress/downloads/extracted.csv').should('have.string', RgEquipamentoRandom6)
            cy.readFile('cypress/downloads/extracted.csv').should('have.string', RgEquipamentoRandom7)
            cy.readFile('cypress/downloads/extracted.csv').should('have.string', RgEquipamentoRandom8)
            cy.readFile('cypress/downloads/extracted.csv').should('have.string', RgEquipamentoRandom9)
            cy.task('deleteRgs', {
                Rg1: RgEquipamentoRandom1, Rg2: RgEquipamentoRandom2, Rg3: RgEquipamentoRandom3,
                Rg4: RgEquipamentoRandom4, Rg5: RgEquipamentoRandom5, Rg6: RgEquipamentoRandom6,
                Rg7: RgEquipamentoRandom7, Rg8: RgEquipamentoRandom8, Rg9: RgEquipamentoRandom9
            })
        });
    });
});