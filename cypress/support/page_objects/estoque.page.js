class estoque {

    //Titles

    get listAlertRgs() { return cy.get('.styles__Content-sc-15hcryr-2') }

    get titleModalMsgsAndAlerts() { return cy.get('.styles__Title-sc-15hcryr-1') }

    get subTitleModalMsgsAndAlerts() { return cy.get('.styles__Text-sc-15hcryr-5') }

    get modalTitleAddEquipamento() { return cy.get('.styles__ModalHeader-sc-1mymblc-6 > [data-testid="wrapper-heading-id"]') }

    get messageTextBold() { return cy.get('.styles__StrongText-sc-15hcryr-6 > strong') }

    //Buttons

    get addEquipmentButton() { return cy.get('[data-testid="button@estoque@modal-add-equipment@add-equipment"]') }

    get AddButton() { return cy.get('[data-testid="button@stockButton"]') }

    get buttonPlusModalEquipment() { return cy.get('[data-testid="button@plus@input@estoque@modal-add-equipment@quantity-equipment"] > span > .StyledIconBase-ea9ulj-0') }

    get buttonMinusModalEquipament() { return cy.get('[data-testid="button@minus@input@estoque@modal-add-equipment@quantity-equipment"] > span > .StyledIconBase-ea9ulj-0') }

    get buttonButtonPlusListEquipment() { return cy.get('[data-testid^="button@plus@input@estoque@modal-add-equipment@quantity-equipment-added') }

    get buttonMinusListEquipment() { return cy.get('[data-testid^="button@minus@input@estoque@modal-add-equipment@quantity-equipment-added') }

    get buttonX() { return cy.get('[data-testid="icon-close-modal"] > g > path') }

    get buttonSalvarModalRgs() { return cy.get('[data-testid="button@equipmentRegistry@Success"] > span') }

    get cancelarButtonModalEquip() { return cy.get('[data-testid="button@estoque@modal-add-equipment-cancel"]') }

    get modalButtonVoltar() { return cy.get('[data-testid="modal-feedback-sucess-button"]') }

    get modalButtonCancela() { return cy.get('[data-testid="modal-feedback-sucess-button"]') }

    get modalButtonOk() { return cy.get('[data-testid="modal-feedback-sucess-button"]') }

    get proximoButton() { return cy.get('[data-testid="button@estoque@modal-add-equipment-next"]') }

    get proxButtonInsideRgModal() { return cy.get('[data-testid="button@equipmentRegistry@Success"]') }

    get voltarButttonInsideRgModal() { return cy.get('[data-testid="button@equipmentRegistry@Cancel"]') }

    get messageFieldInsideRgModal() { return cy.get('[data-testid^="inputMessageError') }

    get modalAcaoCancelar() { return cy.get('[data-testid="wrapper-modalFeedback"] > .styles__Wrapper-sc-1mymblc-5 > [data-testid="wrapper-container-modal-base-id"] > .styles__Body-sc-1mymblc-1') }

    //Fields

    get fieldQuantidade() { return cy.get('[data-testid="input@estoque@modal-add-equipment@quantity-equipment"]') }

    get fieldTipoDeMovimento() { return cy.get('[data-testid="input@select@estoque@modal-add-equipment@equipment-type-movement"]') }
    get listaTipoDeMovimento() { return cy.get('[data-testid="drop-list@select@estoque@modal-add-equipment@equipment-type-movement"]') }

    get origemField() { return cy.get('[data-testid="input@select@estoque@modal-add-equipment@equipment-origin"]') }
    get listOrigem() { return cy.get('[data-testid="drop-list@select@estoque@modal-add-equipment@equipment-origin"]') }

    get dataField() { return cy.get('[data-testid="input@estoque@modal-add-equipment@issue-date"]') }

    get fieldEquipamento() { return cy.get('[data-testid="input@select@estoque@modal-add-equipment@equipment"]') }
    get equipamentoOnList() { return cy.get('[data-testid^="drop-list@select@estoque@modal-add-equipment@equipment"]') }

    get buttonCancelarModalAcaoCancelar() { return cy.get('[data-testid="button@modalFeedback@Cancel"]') }

    get equipamentoOnAddList() { return cy.get('[data-testid^="listItem@estoque@modal-add-equipment"]') }

    get divsQuantityOnEquipamentosList() { return cy.get('[data-testid^="input@estoque@modal-add-equipment@quantity-equipment-added"]') }

    get addRg() { return cy.get('input') }

    get fieldNfNumero() { return cy.get('[data-testid="input@estoque@modal-add-equipment@equipment-note-number"]') }

    fillEquipmentModalFields(notaFiscal, tipoDeMovimento, origem, data, equipamento, equipamentoOnList, voltagem, quantidade) {
        this.fieldNfNumero.type(notaFiscal)
        this.fieldTipoDeMovimento.click()
        this.listaTipoDeMovimento.contains(tipoDeMovimento).click()
        this.origemField.click()
        this.listOrigem.contains(origem).click()
        this.dataField.click().type(data)
        this.fieldEquipamento.click().type(equipamento)
        this.equipamentoOnList.contains(equipamentoOnList).click()
        this.VoltagemRadioButton.check(voltagem)
        this.fieldQuantidade.click().type(quantidade)
    }

    add9Rgs(RgEquipamento1, RgEquipamento2, RgEquipamento3, RgEquipamento4, RgEquipamento5, RgEquipamento6, RgEquipamento7, RgEquipamento8, RgEquipamento9) {
        this.addRg.eq(0).type(RgEquipamento1)
        this.addRg.eq(1).type(RgEquipamento2)
        this.addRg.eq(2).type(RgEquipamento3)
        this.addRg.eq(3).type(RgEquipamento4)
        this.addRg.eq(4).type(RgEquipamento5)
        this.addRg.eq(5).type(RgEquipamento6)
        this.addRg.eq(6).type(RgEquipamento7)
        this.addRg.eq(7).type(RgEquipamento8)
        this.addRg.eq(8).type(RgEquipamento9)

    }

    get radio127v() { return cy.get('[data-testid="radio@voltage-127"]') }

    get radio220v() { return cy.get('[data-testid="radio@voltage-220"]') }

    get scrolOnlistEquipamento() { return cy.get('[data-testid="wrapper-equipment-list"]') }

    get progressBar() { return cy.get('.styles__ProgressBarText-sc-10h5wnc-3') }

    get addEquipmentList() { return cy.get('.styles__Body-sc-1mymblc-1 > :nth-child(2)') }

    get fieldQuantidadeOnEquipamentoList() { return cy.get('[data-testid^="input@estoque@modal-add-equipment@quantity-equipment-added') }

    get codSapField() { return cy.get('[data-testid="input@estoque@modal-add-equipment@sap-cod"]') }

    get codPromaxField() { return cy.get('[data-testid="input@estoque@modal-add-equipment@promax-code"]') }

    //Radios
    get VoltagemRadioButton() { return cy.get('[type="radio"]') }

    //Mensagem

    get dateFieldMessage() { return cy.get('[data-testid="second-wrapper-inputs"]') }

}

export default new estoque()