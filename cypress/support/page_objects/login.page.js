class login {

    //Login fields and gui commands

    get campoEmail() { return cy.get('#inputEmail') }
    get campoSenha() { return cy.get('#inputPassword') }
    get botaoLogin() { return cy.get('.btn') }
    get tituloLogin() { return cy.get('.h3') }

    login(email, senha) {
        this.campoEmail.type(email)
        this.campoSenha.type(senha, { log: false })
        this.botaoLogin.click()
    }

}

export default new login