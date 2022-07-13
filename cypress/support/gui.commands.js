Cypress.Commands.add('selectGeografiaOperacao', (geografia, cdd) => {
    cy.get('.cbGCSR > [data-testid="wrapper-container-id"] > .styles__WrapperOptions-sc-p9ybis-1').click()
    cy.get('[data-testid="wrapper-content-id"]').contains(geografia).click()
    cy.get(':nth-child(2) > [data-testid="wrapper-container-id"] > .styles__WrapperOptions-sc-p9ybis-1').click()
    cy.get('[data-testid="wrapper-container-id"] > [data-testid="wrapper-content-id"]').contains(cdd).click()
})

Cypress.Commands.add('selectGeografiaOperacaoNomeOpecarao', (geografia, cdd, nomeOperacao) => {
    cy.get('.cbGCSR > [data-testid="wrapper-container-id"] > .styles__WrapperOptions-sc-p9ybis-1').click()
    cy.get('[data-testid="wrapper-content-id"]').contains(geografia).click()
    cy.get(':nth-child(2) > [data-testid="wrapper-container-id"] > .styles__WrapperOptions-sc-p9ybis-1').click()
    cy.get('[data-testid="wrapper-container-id"] > [data-testid="wrapper-content-id"]').contains(cdd).click()
    cy.get('.styles__WrapperSelect-sc-1iql305-3 > [data-testid="wrapper-drop-down-id"] > [data-testid="wrapper-container-id"] > .styles__WrapperOptions-sc-p9ybis-1').click()
    cy.get('.styles__WrapperSelect-sc-1iql305-3 > [data-testid="wrapper-drop-down-id"] > [data-testid="wrapper-container-id"] > [data-testid="wrapper-content-id"]').contains(nomeOperacao).click()
})