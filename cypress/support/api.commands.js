Cypress.Commands.add('loginBySingleSignOnRequest', (email, password) => {
    Cypress.log({
        name: 'loginBySingleSignOn',
    })

    const options = {
        method: 'POST',
        url: '',
        form: true,
        body: {
            email: email,
            password: password,
        }
    }
    cy.request(options).then((request) => {
        let cookie = request.requestHeaders['cookie']
        const firstPart = cookie.split(";")[0]
        const divisor = firstPart.indexOf('=')
        const bearer = firstPart.substring(divisor + 1)
        cy.writeFile('cypress/fixtures/authorization.json', JSON.stringify(bearer))

    });
})

Cypress.Commands.add('addEquipamentoRequest', (authorization, geografia, unb, notaFiscal, tipoDeMovimento, origem, dataEmissao, equipamento1, rg1,
    equipamento2, rg2, equipamento3, rg3, equipamento4, rg4, equipamento5, rg5, equipamento6, rg6, equipamento7, rg7, equipamento8, rg8, equipamento9, rg9) => {
    cy.request({
        method: 'POST',
        url: '',
        headers: { Authorization: `Bearer ${authorization}` },
        body: {
            "geo": geografia,
            "unb": unb,
            "nf": notaFiscal,
            "transaction_type": tipoDeMovimento,
            "transaction_type_origin": origem,
            "issue_date": dataEmissao,
            "equipments": [
                {
                    "equipment_id": equipamento1,
                    "rg": rg1
                },
                {
                    "equipment_id": equipamento2,
                    "rg": rg2
                },
                {
                    "equipment_id": equipamento3,
                    "rg": rg3
                },
                {
                    "equipment_id": equipamento4,
                    "rg": rg4
                },
                {
                    "equipment_id": equipamento5,
                    "rg": rg5
                },
                {
                    "equipment_id": equipamento6,
                    "rg": rg6
                },
                {
                    "equipment_id": equipamento7,
                    "rg": rg7
                },
                {
                    "equipment_id": equipamento8,
                    "rg": rg8
                },
                {
                    "equipment_id": equipamento9,
                    "rg": rg9
                }
            ]
        }
    })
})
