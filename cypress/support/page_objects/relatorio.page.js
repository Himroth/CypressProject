class relatorio {

    get listaDeTipos() { return cy.get('.fESLzA > [data-testid="wrapper-container-id"] > .styles__WrapperOptions-sc-p9ybis-1') }
    get selecionaTipo() { return cy.get('.hzsoQA > [data-testid="wrapper-container-id"] > [data-testid="wrapper-content-id"]') }
    get botaoExtrair() { return cy.get('[data-testid="button@report@extractCSV"]') }

    selectTipoDeRelatorio(tipo) {
        this.listaDeTipos.click()
        this.selecionaTipo.contains(tipo).click()
    }

    clickBotaoExtrairRelatorio() {
        this.botaoExtrair.click()
    }

}

export default new relatorio