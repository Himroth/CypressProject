class menu {

    get tituloPainel() { return cy.get('.styles__WrapperTitle-sc-l6q6e9-3 > [data-testid="wrapper-heading-id"]') }
    get botaoUsuarioLogout() { return cy.get('.styles__LogOutIcon-sc-1iql305-2') }
    get estoqueButton() { return cy.get('[href="/signature-control-panel/estoque"]') }
    get menuButtonRelatorio() { return cy.get('[href="/signature-control-panel/relatorios"]') }

}

export default new menu()