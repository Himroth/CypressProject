/// <reference types="cypress" />
import { RgEquipamentoRandom, NfRandom } from "../support/Utils/common.js"
//import { NfRandom } from "../support/Utils/common.js"
const { cdd, dadosEquipamento, geografia, nomeOperacao, origem, tipoDeMovimento } = require('../fixtures')
const dayjs = require('dayjs')
const { estoquePage, menuPage } = require('../support/page_objects')


describe('Funcionalidade Estoque', () => {
    beforeEach(() => {
        cy.visit('/')
        cy.loginBySingleSignOnRequest(Cypress.config('usuario').usuario + Cypress.config('usuario').dominio, Cypress.config('usuario').senha)
        cy.visit('estoque')
    });

    context('Funcionalidade de adicionar equipamentos ao estoque', () => {

        it('1- Deve exibir o botão estoque', () => {
            menuPage.estoqueButton.should('be.enabled')

        });

        it('2-Botão adicionar deve estar bloqueado enquanto os campos Geo, Operação e Nome Operação, não estão preenchidos.', () => {
            cy.selectGeografiaOperacao(geografia.geografia, cdd.cdd)
            estoquePage.AddButton.should('be.disabled')

        });

        it('3-Deve ser possível usar o botão Adicionar quando selecionados os campos Geo, Operação e Nome Operação.', () => {
            cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
            estoquePage.AddButton.click()
            estoquePage.modalTitleAddEquipamento.should('be.visible')
        });

        it('4-Validando o botão cancelar da modal Adicionar equipamentos, se ao clicar em cancelar com campos preenchidos é exibida a modal de cancelar ação', () => {
            cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
            estoquePage.AddButton.click()
            estoquePage.fieldNfNumero.type(NfRandom())
            estoquePage.cancelarButtonModalEquip.click()
            estoquePage.titleModalMsgsAndAlerts.should('be.visible')
        });

        it.only('5-Validando se botão voltar da modal "Cancelar ação" não apaga os dados preenchidos', () => {
            let NfRandomNumber = Math.floor(Math.random() * (90000000 - 10000000)) + 10000000

            cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
            estoquePage.AddButton.click()
            estoquePage.fillEquipmentModalFields(NfRandomNumber, tipoDeMovimento.Tansferencia, origem.FabricaDeAgudos, dayjs().format('DD/MM/YYYY'), dadosEquipamento[0].equipamento,
                dadosEquipamento[0].equipamento, dadosEquipamento[0].voltagem, dadosEquipamento[0].quantidade)
            estoquePage.cancelarButtonModalEquip.click()
            estoquePage.modalButtonVoltar.click()

            estoquePage.fieldNfNumero.should('have.value', NfRandomNumber)
            estoquePage.fieldTipoDeMovimento.should('have.value', tipoDeMovimento.Tansferencia)
            estoquePage.origemField.should('have.value', origem.FabricaDeAgudos)
            estoquePage.fieldEquipamento.should('have.value', dadosEquipamento[0].equipamento)
            estoquePage.dataField.should('have.value', dayjs().format('DD/MM/YYYY'))
            estoquePage.radio127v.should('be.checked')
            estoquePage.codSapField.should('have.value', dadosEquipamento[0].codSap)
            estoquePage.codPromaxField.should('have.value', dadosEquipamento[0].codPromax)
            estoquePage.fieldQuantidade.should('have.value', dadosEquipamento[0].quantidade)
        });

        it('6-Validando o botão "Cancelar mesmo assim" na modal "Cancelar ação"', () => {
            cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
            estoquePage.AddButton.click()
            estoquePage.fillEquipmentModalFields(NfRandom(), tipoDeMovimento.Tansferencia, origem.FabricaDeAgudos, dayjs().format('DD/MM/YYYY'), dadosEquipamento[0].equipamento,
                dadosEquipamento[0].equipamento, dadosEquipamento[0].voltagem, dadosEquipamento[0].quantidade)
            estoquePage.cancelarButtonModalEquip.click()
            estoquePage.buttonCancelarModalAcaoCancelar.click()

            estoquePage.modalTitleAddEquipamento.should('not.exist')

        });

        it('7-Validando o botão "+Adicionar equipamento" bloqueado da modal "Adicionar equipamento"', () => {
            cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
            estoquePage.AddButton.click()
            estoquePage.fillEquipmentModalFields(NfRandom(), tipoDeMovimento.Tansferencia, origem.FabricaDeAgudos, dayjs().format('DD/MM/YYYY'), dadosEquipamento[0].equipamento,
                dadosEquipamento[0].equipamento, dadosEquipamento[0].voltagem, dadosEquipamento[0].quantidade)
            estoquePage.fieldNfNumero.clear()

            estoquePage.addEquipmentButton.should('be.disabled')
        });

        it('8-Validar se ao clicar em adicionar equipamento o equipamento é adicionado na lista', () => {
            cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
            estoquePage.AddButton.click()
            estoquePage.fillEquipmentModalFields(NfRandom(), tipoDeMovimento.Tansferencia, origem.FabricaDeAgudos, dayjs().format('DD/MM/YYYY'), dadosEquipamento[0].equipamento,
                dadosEquipamento[0].equipamento, dadosEquipamento[0].voltagem, dadosEquipamento[0].quantidade)
            estoquePage.addEquipmentButton.click()

            estoquePage.addEquipmentList.should('contain', dadosEquipamento[0].equipamento)
        });

        it('9-Validar se ao digitar um valor no campo equipamento exibe uma lista', () => {
            let equipamentoLetras = 'Vis'

            cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
            estoquePage.AddButton.click()
            estoquePage.fieldNfNumero.type(NfRandom())
            estoquePage.fieldTipoDeMovimento.click()
            estoquePage.listaTipoDeMovimento.contains(tipoDeMovimento.Tansferencia).click()
            estoquePage.origemField.click()
            estoquePage.listOrigem.contains(origem.FabricaDeAgudos).click()
            estoquePage.dataField.type(dayjs().format('DD/MM/YYYY'))
            estoquePage.fieldEquipamento.type(equipamentoLetras)

            estoquePage.equipamentoOnList.should('contain', equipamentoLetras)

        });

        it('10-Validando se dados de Número nota fiscal, Tipo de movimento, Origem, Data emissão NF, não são apagados após adicionar um equipamento.', () => {
            let NfRandomNumber = Math.floor(Math.random() * (90000000 - 10000000)) + 10000000

            cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
            estoquePage.AddButton.click()
            estoquePage.fillEquipmentModalFields(NfRandomNumber, tipoDeMovimento.Tansferencia, origem.FabricaDeAgudos, dayjs().format('DD/MM/YYYY'), dadosEquipamento[0].equipamento,
                dadosEquipamento[0].equipamento, dadosEquipamento[0].voltagem, dadosEquipamento[0].quantidade)
            estoquePage.addEquipmentButton.click()

            estoquePage.fieldNfNumero.should('have.value', NfRandomNumber)
            estoquePage.fieldTipoDeMovimento.should('have.value', tipoDeMovimento.Tansferencia)
            estoquePage.origemField.should('have.value', origem.FabricaDeAgudos)
            estoquePage.dataField.should('have.value', dayjs().format('DD/MM/YYYY'))

        });

        it('11 e 48-Validar se no preenchimento de RG exibe o loading status conforme Rgs preenchidos.', () => {
            let progressStart = '0/99'
            let progressEnd = '99/99'

            cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
            estoquePage.AddButton.click()
            estoquePage.fillEquipmentModalFields(NfRandom(), tipoDeMovimento.Tansferencia, origem.FabricaDeAgudos, dayjs().format('DD/MM/YYYY'), dadosEquipamento[0].equipamento,
                dadosEquipamento[0].equipamento, dadosEquipamento[0].voltagem, dadosEquipamento[0].quantidade)
            estoquePage.addEquipmentButton.click()
            estoquePage.proximoButton.click()

            estoquePage.progressBar.should('have.text', progressStart)

            estoquePage.add9Rgs(RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(),
                RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom())
            estoquePage.proxButtonInsideRgModal.click()
            estoquePage.add9Rgs(RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(),
                RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom())
            estoquePage.proxButtonInsideRgModal.click()
            estoquePage.add9Rgs(RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(),
                RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom())
            estoquePage.proxButtonInsideRgModal.click()
            estoquePage.add9Rgs(RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(),
                RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom())
            estoquePage.proxButtonInsideRgModal.click()
            estoquePage.add9Rgs(RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(),
                RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom())
            estoquePage.proxButtonInsideRgModal.click()
            estoquePage.add9Rgs(RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(),
                RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom())
            estoquePage.proxButtonInsideRgModal.click()
            estoquePage.add9Rgs(RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(),
                RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom())
            estoquePage.proxButtonInsideRgModal.click()
            estoquePage.add9Rgs(RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(),
                RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom())
            estoquePage.proxButtonInsideRgModal.click()
            estoquePage.add9Rgs(RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(),
                RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom())
            estoquePage.proxButtonInsideRgModal.click()
            estoquePage.add9Rgs(RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(),
                RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom())
            estoquePage.proxButtonInsideRgModal.click()
            estoquePage.add9Rgs(RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(),
                RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom())

            estoquePage.progressBar.should('have.text', progressEnd)


        });

        it('12, 50 -Validar se a modal de Salvar é exibida ao salvar os equipamentos', () => {
            let RgEquipamentoRandom1 = JSON.stringify(Math.floor(Math.random() * (89999999999999 - 10000000000000)) + 10000000000000)
            let RgEquipamentoRandom2 = JSON.stringify(Math.floor(Math.random() * (89999999999999 - 10000000000000)) + 10000000000000)
            let RgEquipamentoRandom3 = JSON.stringify(Math.floor(Math.random() * (89999999999999 - 10000000000000)) + 10000000000000)
            let RgEquipamentoRandom4 = JSON.stringify(Math.floor(Math.random() * (89999999999999 - 10000000000000)) + 10000000000000)
            let RgEquipamentoRandom5 = JSON.stringify(Math.floor(Math.random() * (89999999999999 - 10000000000000)) + 10000000000000)
            let RgEquipamentoRandom6 = JSON.stringify(Math.floor(Math.random() * (89999999999999 - 10000000000000)) + 10000000000000)
            let RgEquipamentoRandom7 = JSON.stringify(Math.floor(Math.random() * (89999999999999 - 10000000000000)) + 10000000000000)
            let RgEquipamentoRandom8 = JSON.stringify(Math.floor(Math.random() * (89999999999999 - 10000000000000)) + 10000000000000)
            let RgEquipamentoRandom9 = JSON.stringify(Math.floor(Math.random() * (89999999999999 - 10000000000000)) + 10000000000000)

            cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
            estoquePage.AddButton.click()
            estoquePage.fillEquipmentModalFields(NfRandom(), tipoDeMovimento.Compra, origem.MetalFrio, dayjs().format('DD/MM/YYYY'), dadosEquipamento[1].equipamento,
                dadosEquipamento[1].equipamento, dadosEquipamento[1].voltagem, dadosEquipamento[1].quantidade)
            estoquePage.addEquipmentButton.click()
            estoquePage.proximoButton.click()
            estoquePage.add9Rgs(RgEquipamentoRandom1, RgEquipamentoRandom2, RgEquipamentoRandom3, RgEquipamentoRandom4, RgEquipamentoRandom5, RgEquipamentoRandom6,
                RgEquipamentoRandom7, RgEquipamentoRandom8, RgEquipamentoRandom9)
            estoquePage.buttonSalvarModalRgs.click()

            estoquePage.titleModalMsgsAndAlerts.should('have.text', 'Estoque adicionado com sucesso')
            estoquePage.subTitleModalMsgsAndAlerts.should('contain', dadosEquipamento[1].quantidade)

            cy.task('deleteRgs', {
                Rg1: RgEquipamentoRandom1, Rg2: RgEquipamentoRandom2, Rg3: RgEquipamentoRandom3,
                Rg4: RgEquipamentoRandom4, Rg5: RgEquipamentoRandom5, Rg6: RgEquipamentoRandom6,
                Rg7: RgEquipamentoRandom7, Rg8: RgEquipamentoRandom8, Rg9: RgEquipamentoRandom9
            })
        });

        it('13-Validar se a modal de erro é exibida ao tentar salvar um equipamento', () => {
            cy.intercept(
                'POST',
                'https://icebev-nonprod.ambevdevs.com.br/signature-control-panel-backend/equipment/store',
                { forceNetworkError: true }
            ).as('getNetworkFailure')

            let NfRandomNumber = Math.floor(Math.random() * (90000000 - 10000000)) + 10000000

            cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
            estoquePage.AddButton.click()
            estoquePage.fillEquipmentModalFields(NfRandomNumber, tipoDeMovimento.Compra, origem.MetalFrio, dayjs().format('DD/MM/YYYY'), dadosEquipamento[1].equipamento,
                dadosEquipamento[1].equipamento, dadosEquipamento[1].voltagem, 1)
            estoquePage.addEquipmentButton.click()
            estoquePage.proximoButton.click()
            estoquePage.addRg.eq(0).type(RgEquipamentoRandom())
            estoquePage.buttonSalvarModalRgs.click()
            cy.wait('@getNetworkFailure')

            estoquePage.titleModalMsgsAndAlerts.should('have.text', 'Erro de sistema')
            estoquePage.subTitleModalMsgsAndAlerts.should('have.text', 'Por conta de um erro do sistema sua solicitação não pode ser enviada, por favor tente novamente mais tarde.')
            estoquePage.messageTextBold.should('have.text', 'Em caso de dúvidas contate o administrador do sistema.')
            estoquePage.modalButtonOk.click()
            estoquePage.titleModalMsgsAndAlerts.should('not.exist')
        });

        it('14-Validar se ao clicar no "X" para fechar na tela de RG sem preencher algum campo RG exibe a modal de aviso', () => {
            cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
            estoquePage.AddButton.click()
            estoquePage.fillEquipmentModalFields(NfRandom(), tipoDeMovimento.Compra, origem.MetalFrio, dayjs().format('DD/MM/YYYY'), dadosEquipamento[1].equipamento,
                dadosEquipamento[1].equipamento, dadosEquipamento[1].voltagem, dadosEquipamento[1].quantidade)
            estoquePage.addEquipmentButton.click()
            estoquePage.proximoButton.click()
            estoquePage.buttonX.click()

            estoquePage.modalAcaoCancelar.should('exist')
            estoquePage.modalAcaoCancelar.should('contain', 'Se essa ação for confirmada, você perderá todos os dados informados')
        });

        it('15-Validar se ao clicar na tela de RG quando preencher algum campo RG exibe a modal de aviso', () => {
            cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
            estoquePage.AddButton.click()
            estoquePage.fillEquipmentModalFields(NfRandom(), tipoDeMovimento.Compra, origem.MetalFrio, dayjs().format('DD/MM/YYYY'), dadosEquipamento[1].equipamento,
                dadosEquipamento[1].equipamento, dadosEquipamento[1].voltagem, dadosEquipamento[1].quantidade)
            estoquePage.addEquipmentButton.click()
            estoquePage.proximoButton.click()
            estoquePage.addRg.eq(0).type(RgEquipamentoRandom())
            estoquePage.buttonX.click()

            estoquePage.modalAcaoCancelar.should('exist')
            estoquePage.modalAcaoCancelar.should('contain', 'Se essa ação for confirmada, você perderá todos os dados informados')
        });

        it('16-Validando se ao adicionar equipamento na lista, clicar em cancelar e no modal de cancelar ação, ao voltar para o modal Adicionar equipamentos, os equipamentos da lista permanecem', () => {
            cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
            estoquePage.AddButton.click()
            estoquePage.fillEquipmentModalFields(NfRandom(), tipoDeMovimento.Tansferencia, origem.FabricaDeAgudos, dayjs().format('DD/MM/YYYY'), dadosEquipamento[0].equipamento,
                dadosEquipamento[0].equipamento, dadosEquipamento[0].voltagem, dadosEquipamento[0].quantidade)
            estoquePage.addEquipmentButton.click()
            estoquePage.cancelarButtonModalEquip.click()
            estoquePage.modalButtonCancela.click()

            estoquePage.fieldQuantidadeOnEquipamentoList.should('have.value', dadosEquipamento[0].quantidade)
            estoquePage.equipamentoOnAddList.should('contain', dadosEquipamento[0].equipamento)

        });

        it('17-Validar se na lista de +Adicionar Equipamentos exibe um scroll com os equipamentos na lista', () => {
            cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
            estoquePage.AddButton.click()
            estoquePage.fillEquipmentModalFields(NfRandom(), tipoDeMovimento.Tansferencia, origem.FabricaDeAgudos, dayjs().format('DD/MM/YYYY'), dadosEquipamento[0].equipamento,
                dadosEquipamento[0].equipamento, dadosEquipamento[0].voltagem, dadosEquipamento[1].quantidade)
            estoquePage.addEquipmentButton.click()
            estoquePage.fieldEquipamento.type(dadosEquipamento[0].equipamento)
            estoquePage.VoltagemRadioButton.check(dadosEquipamento[1].voltagem)
            estoquePage.fieldQuantidade.type(dadosEquipamento[1].quantidade)
            estoquePage.addEquipmentButton.click()
            estoquePage.fieldEquipamento.type(dadosEquipamento[2].equipamento)
            estoquePage.VoltagemRadioButton.check(dadosEquipamento[2].voltagem)
            estoquePage.fieldQuantidade.type(dadosEquipamento[2].quantidade)
            estoquePage.addEquipmentButton.click()

            estoquePage.scrolOnlistEquipamento.scrollTo('bottom').should('be.visible')
        });

        context('Valida o preenchimento automatico de todos os códigos Promax e Sap de todos os equipamentos', () => {

            it('19-Validar se ao selecionar a voltagem os campos código Promax e código Sap são preenchidos automaticamente', () => {
                cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
                estoquePage.AddButton.click()
                estoquePage.fillEquipmentModalFields(NfRandom(), tipoDeMovimento.Compra, origem.MetalFrio, dayjs().format('DD/MM/YYYY'), dadosEquipamento[0].equipamento,
                    dadosEquipamento[0].equipamento, dadosEquipamento[0].voltagem, dadosEquipamento[0].quantidade)

                estoquePage.codSapField.should('have.value', dadosEquipamento[0].codSap)
                estoquePage.codPromaxField.should('have.value', dadosEquipamento[0].codPromax)

            });
            it('19.1-Validar se ao selecionar a voltagem os campos código Promax e código Sap são preenchidos automaticamente', () => {
                cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
                estoquePage.AddButton.click()
                estoquePage.fillEquipmentModalFields(NfRandom(), tipoDeMovimento.Compra, origem.MetalFrio, dayjs().format('DD/MM/YYYY'), dadosEquipamento[1].equipamento,
                    dadosEquipamento[1].equipamento, dadosEquipamento[1].voltagem, dadosEquipamento[1].quantidade)

                estoquePage.codSapField.should('have.value', dadosEquipamento[1].codSap)
                estoquePage.codPromaxField.should('have.value', dadosEquipamento[1].codPromax)
            });

            it('19.2-Validar se ao selecionar a voltagem os campos código Promax e código Sap são preenchidos automaticamente', () => {
                cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
                estoquePage.AddButton.click()
                estoquePage.fillEquipmentModalFields(NfRandom(), tipoDeMovimento.Compra, origem.MetalFrio, dayjs().format('DD/MM/YYYY'), dadosEquipamento[2].equipamento,
                    dadosEquipamento[2].equipamento, dadosEquipamento[2].voltagem, dadosEquipamento[2].quantidade)

                estoquePage.codSapField.should('have.value', dadosEquipamento[2].codSap)
                estoquePage.codPromaxField.should('have.value', dadosEquipamento[2].codPromax)

            });

            it('19.3-Validar se ao selecionar a voltagem os campos código Promax e código Sap são preenchidos automaticamente', () => {
                cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
                estoquePage.AddButton.click()
                estoquePage.fillEquipmentModalFields(NfRandom(), tipoDeMovimento.Compra, origem.MetalFrio, dayjs().format('DD/MM/YYYY'), dadosEquipamento[3].equipamento,
                    dadosEquipamento[3].equipamento, dadosEquipamento[3].voltagem, dadosEquipamento[3].quantidade)

                estoquePage.codSapField.should('have.value', dadosEquipamento[3].codSap)
                estoquePage.codPromaxField.should('have.value', dadosEquipamento[3].codPromax)
            });

            it('19.4-Validar se ao selecionar a voltagem os campos código Promax e código Sap são preenchidos automaticamente', () => {
                cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
                estoquePage.AddButton.click()
                estoquePage.fillEquipmentModalFields(NfRandom(), tipoDeMovimento.Compra, origem.MetalFrio, dayjs().format('DD/MM/YYYY'), dadosEquipamento[4].equipamento,
                    dadosEquipamento[4].equipamento, dadosEquipamento[4].voltagem, dadosEquipamento[4].quantidade)

                estoquePage.codSapField.should('have.value', dadosEquipamento[4].codSap)
                estoquePage.codPromaxField.should('have.value', dadosEquipamento[4].codPromax)
            });

            it('19.5-Validar se ao selecionar a voltagem os campos código Promax e código Sap são preenchidos automaticamente', () => {
                cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
                estoquePage.AddButton.click()
                estoquePage.fillEquipmentModalFields(NfRandom(), tipoDeMovimento.Compra, origem.MetalFrio, dayjs().format('DD/MM/YYYY'), dadosEquipamento[5].equipamento,
                    dadosEquipamento[5].equipamento, dadosEquipamento[5].voltagem, dadosEquipamento[5].quantidade)

                estoquePage.codSapField.should('have.value', dadosEquipamento[5].codSap)
                estoquePage.codPromaxField.should('have.value', dadosEquipamento[5].codPromax)
            });

            it('19.6-Validar se ao selecionar a voltagem os campos código Promax e código Sap são preenchidos automaticamente', () => {
                cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
                estoquePage.AddButton.click()
                estoquePage.fillEquipmentModalFields(NfRandom(), tipoDeMovimento.Compra, origem.MetalFrio, dayjs().format('DD/MM/YYYY'), dadosEquipamento[6].equipamento,
                    dadosEquipamento[6].equipamento, dadosEquipamento[6].voltagem, dadosEquipamento[6].quantidade)

                estoquePage.codSapField.should('have.value', dadosEquipamento[6].codSap)
                estoquePage.codPromaxField.should('have.value', dadosEquipamento[6].codPromax)
            });

            it('19.7-Validar se ao selecionar a voltagem os campos código Promax e código Sap são preenchidos automaticamente', () => {
                cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
                estoquePage.AddButton.click()
                estoquePage.fillEquipmentModalFields(NfRandom(), tipoDeMovimento.Compra, origem.MetalFrio, dayjs().format('DD/MM/YYYY'), dadosEquipamento[7].equipamento,
                    dadosEquipamento[7].equipamento, dadosEquipamento[7].voltagem, dadosEquipamento[7].quantidade)

                estoquePage.codSapField.should('have.value', dadosEquipamento[7].codSap)
                estoquePage.codPromaxField.should('have.value', dadosEquipamento[7].codPromax)
            });

        });

        it('20-Validar se o campo Origem não fica ativo se não preencher o campo Tipo de movimentação', () => {
            cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
            estoquePage.AddButton.click()
            estoquePage.fieldNfNumero.type(NfRandom())

            estoquePage.origemField.should('be.disabled')
        });

        it('21-Validar se o campo Origem fica ativo após preencher o campo Tipo de movimentação', () => {
            cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
            estoquePage.AddButton.click()
            estoquePage.fieldNfNumero.type(NfRandom())
            estoquePage.fieldTipoDeMovimento.click()
            estoquePage.listaTipoDeMovimento.contains(tipoDeMovimento.Tansferencia).click()

            estoquePage.origemField.should('be.enabled')
        });

        context('Valida se as combinações de tipo movimento e origem estão corretas', () => {

            it('22-Validar as opções e combinações dos campos Tipo de movimentação e Origem', () => {
                cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
                estoquePage.AddButton.click()
                estoquePage.fieldNfNumero.type(NfRandom())
                estoquePage.fieldTipoDeMovimento.click()
                estoquePage.listaTipoDeMovimento.contains(tipoDeMovimento.Tansferencia).click()
                estoquePage.origemField.click()

                estoquePage.listOrigem.should('contain', origem.FabricaDeAgudos)
                estoquePage.listOrigem.should('contain', origem.FabricaDeAguasClaras)

            });

            it('22.1-Validar as opções e combinações dos campos Tipo de movimentação e Origem', () => {
                cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
                estoquePage.AddButton.click()
                estoquePage.fieldNfNumero.type(NfRandom())
                estoquePage.fieldTipoDeMovimento.click()
                estoquePage.listaTipoDeMovimento.contains(tipoDeMovimento.Compra).click()
                estoquePage.origemField.click()

                estoquePage.listOrigem.should('contain', origem.MetalFrio)
                estoquePage.listOrigem.should('contain', origem.Imbera)
            });

            it('22.2-Validar as opções e combinações dos campos Tipo de movimentação e Origem', () => {
                cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
                estoquePage.AddButton.click()
                estoquePage.fieldNfNumero.type(NfRandom())
                estoquePage.fieldTipoDeMovimento.click()
                estoquePage.listaTipoDeMovimento.contains(tipoDeMovimento.Remessa).click()
                estoquePage.origemField.click()

                estoquePage.listOrigem.should('contain', origem.FabricaDeAgudos)
                estoquePage.listOrigem.should('contain', origem.FabricaDeAguasClaras)
                estoquePage.listOrigem.should('contain', origem.MetalFrio)
                estoquePage.listOrigem.should('contain', origem.Imbera)

            });
        });

        context('Validações de datas limites e inválidas', () => {
            it('25-Validar se a data mínima selecionável é 01/10/2020 digitada', () => {
                cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
                estoquePage.AddButton.click()
                estoquePage.dataField.type(dayjs().format('01/10/2020'))

                estoquePage.dataField.should('have.value', dayjs().format('01/10/2020'))
            });

            it('26-Validar se a data pode ser menor que 01/10/2020 digitada', () => {
                cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
                estoquePage.AddButton.click()
                estoquePage.dataField.type(dayjs().format('30/09/2020'))
                estoquePage.fieldNfNumero.click()

                estoquePage.dateFieldMessage.should('contain', 'Data inválida')
            });

            it('29-Validar se a data pode ser igual ao dia atual, digitando', () => {
                cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
                estoquePage.AddButton.click()
                estoquePage.dataField.type(dayjs().format('DD/MM/YYYY'))

                estoquePage.dataField.should('have.value', dayjs().format('DD/MM/YYYY'))

            });

            it('31-Validar se a data pode ser maior ao dia atual, digitando', () => {
                cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
                estoquePage.AddButton.click()
                estoquePage.dataField.type(dayjs().add(1, 'day').format('DD/MM/YYYY'))
                estoquePage.fieldNfNumero.click()

                estoquePage.dateFieldMessage.should('contain', 'Data inválida')
            });

            it('31.1-Validar se a data pode ser maior que o mês atual, digitando', () => {
                cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
                estoquePage.AddButton.click()
                estoquePage.dataField.type(dayjs().add(1, 'month').format('DD/MM/YYYY'))
                estoquePage.fieldNfNumero.click()

                estoquePage.dateFieldMessage.should('contain', 'Data inválida')
            });

            it('31.2-Validar se a data pode ser maior que o ano atual, digitando', () => {
                cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
                estoquePage.AddButton.click()
                estoquePage.dataField.type(dayjs().add(1, 'year').format('DD/MM/YYYY'))
                estoquePage.fieldNfNumero.click()

                estoquePage.dateFieldMessage.should('contain', 'Data inválida')
            });

            it('32-Validar se a mensagem de data inválida bloqueio os campos da tela', () => {
                cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
                estoquePage.AddButton.click()
                estoquePage.fieldNfNumero.type(NfRandom())
                estoquePage.fieldTipoDeMovimento.click()
                estoquePage.listaTipoDeMovimento.contains(tipoDeMovimento.Compra).click()
                estoquePage.origemField.click()
                estoquePage.listOrigem.contains(origem.MetalFrio).click()
                estoquePage.dataField.type(dayjs().add(1, 'day').format('DD/MM/YYYY'))
                estoquePage.fieldNfNumero.click()

                estoquePage.fieldEquipamento.should('be.disabled')
                estoquePage.radio127v.should('be.disabled')
                estoquePage.radio220v.should('be.disabled')
                estoquePage.codSapField.should('not.be.selected')
                estoquePage.codPromaxField.should('not.be.selected')
                estoquePage.fieldQuantidade.should('be.disabled')
                estoquePage.addEquipmentButton.should('not.be.selected')
            });
        });

        it('35-Validar se após adicionar um equipamento na lista é possível mudar a quantidade apenas usando os sinais de "-" e "+"', () => {
            cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
            estoquePage.AddButton.click()
            estoquePage.fillEquipmentModalFields(NfRandom(), tipoDeMovimento.Tansferencia, origem.FabricaDeAgudos, dayjs().format('DD/MM/YYYY'), dadosEquipamento[0].equipamento,
                dadosEquipamento[0].equipamento, dadosEquipamento[0].voltagem, dadosEquipamento[0].quantidade)
            estoquePage.addEquipmentButton.click()
            estoquePage.buttonMinusListEquipment.click()

            estoquePage.fieldQuantidadeOnEquipamentoList.should('have.value', dadosEquipamento[0].quantidade - 1)

            estoquePage.buttonButtonPlusListEquipment.click()

            estoquePage.fieldQuantidadeOnEquipamentoList.should('have.value', dadosEquipamento[0].quantidade)
        });

        it('36-Validar se ao adicionar um equipamento na lista é possível mudar a quantidade digitando um valor', () => {
            cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
            estoquePage.AddButton.click()
            estoquePage.fillEquipmentModalFields(NfRandom(), tipoDeMovimento.Tansferencia, origem.FabricaDeAgudos, dayjs().format('DD/MM/YYYY'), dadosEquipamento[0].equipamento,
                dadosEquipamento[0].equipamento, dadosEquipamento[0].voltagem, dadosEquipamento[0].quantidade)
            estoquePage.addEquipmentButton.click()

            estoquePage.fieldQuantidadeOnEquipamentoList.should('have.attr', 'readonly')
        });

        it('37-Validar se na modal adicionar equipamentos permite digitar a quantidade', () => {
            cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
            estoquePage.AddButton.click()
            estoquePage.fieldNfNumero.type(NfRandom())
            estoquePage.fieldTipoDeMovimento.click()
            estoquePage.listaTipoDeMovimento.contains(tipoDeMovimento.Tansferencia).click()
            estoquePage.origemField.click()
            estoquePage.listOrigem.contains(origem.FabricaDeAgudos).click()
            estoquePage.dataField.type(dayjs().format('DD/MM/YYYY'))
            estoquePage.fieldQuantidade.type(dadosEquipamento[0].quantidade)

            estoquePage.fieldQuantidade.should('have.value', dadosEquipamento[0].quantidade)
        });

        it('38-Validar se da modal adicionar equipamentos permite mudar a quantidade pelo botões "-" e "+"', () => {
            cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
            estoquePage.AddButton.click()
            estoquePage.fieldNfNumero.type(NfRandom())
            estoquePage.fieldTipoDeMovimento.click()
            estoquePage.listaTipoDeMovimento.contains(tipoDeMovimento.Tansferencia).click()
            estoquePage.origemField.click()
            estoquePage.listOrigem.contains(origem.FabricaDeAgudos).click()
            estoquePage.dataField.type(dayjs().format('DD/MM/YYYY'))
            estoquePage.buttonPlusModalEquipment.click().click()
            estoquePage.fieldQuantidade.should('have.value', 2)

            estoquePage.buttonMinusModalEquipament.click()

            estoquePage.fieldQuantidade.should('have.value', 1)

        });

        it('39-Validar se da modal adicionar equipamentos não permite adicionar equipamento se quantidade for zero', () => {
            cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
            estoquePage.AddButton.click()
            estoquePage.fieldNfNumero.type(NfRandom())
            estoquePage.fieldTipoDeMovimento.click()
            estoquePage.listaTipoDeMovimento.contains(tipoDeMovimento.Tansferencia).click()
            estoquePage.origemField.click()
            estoquePage.listOrigem.contains(origem.FabricaDeAgudos).click()
            estoquePage.dataField.type(dayjs().format('DD/MM/YYYY'))
            estoquePage.fieldEquipamento.type(dadosEquipamento[0].equipamento)
            estoquePage.VoltagemRadioButton.check(dadosEquipamento[0].voltagem)

            estoquePage.addEquipmentButton.should('be.disabled')
        });

        it('40-Validar se da modal adicionar equipamentos não permite adicionar equipamento se quantidade for zero, teste mudando campo', () => {
            cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
            estoquePage.AddButton.click()
            estoquePage.fillEquipmentModalFields(NfRandom(), tipoDeMovimento.Tansferencia, origem.FabricaDeAgudos, dayjs().format('DD/MM/YYYY'), dadosEquipamento[0].equipamento,
                dadosEquipamento[0].equipamento, dadosEquipamento[0].voltagem, dadosEquipamento[0].quantidade)
            estoquePage.fieldQuantidade.clear()

            estoquePage.addEquipmentButton.should('be.disabled')
        });

        context('Validar limite de quantidade 99 com soma da lista de equipamentos com valores limites', () => {

            it('41-Validar se a quantidade máxima de equipamentos por adição é 99, teste com 99', () => {
                cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
                estoquePage.AddButton.click()
                estoquePage.fillEquipmentModalFields(NfRandom(), tipoDeMovimento.Tansferencia, origem.FabricaDeAgudos, dayjs().format('DD/MM/YYYY'), dadosEquipamento[7].equipamento,
                    dadosEquipamento[7].equipamento, dadosEquipamento[7].voltagem, dadosEquipamento[7].quantidade)
                estoquePage.addEquipmentButton.click()
                estoquePage.fieldEquipamento.type(dadosEquipamento[6].equipamento)
                estoquePage.VoltagemRadioButton.check(dadosEquipamento[6].voltagem)
                estoquePage.fieldQuantidade.type(dadosEquipamento[6].quantidade)
                estoquePage.addEquipmentButton.click()
                estoquePage.fieldEquipamento.type(dadosEquipamento[5].equipamento)
                estoquePage.VoltagemRadioButton.check(dadosEquipamento[5].voltagem)
                estoquePage.fieldQuantidade.type(dadosEquipamento[5].quantidade)
                estoquePage.addEquipmentButton.click()
                estoquePage.fieldEquipamento.type(dadosEquipamento[4].equipamento)
                estoquePage.VoltagemRadioButton.check(dadosEquipamento[4].voltagem)
                estoquePage.fieldQuantidade.type(dadosEquipamento[4].quantidade)
                estoquePage.addEquipmentButton.click()

                estoquePage.divsQuantityOnEquipamentosList.should('have.length', 4)

            });

            it('41.1-Validar se a quantidade máxima de equipamentos por adição é 99, teste com 100', () => {
                cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
                estoquePage.AddButton.click()
                estoquePage.fillEquipmentModalFields(NfRandom(), tipoDeMovimento.Tansferencia, origem.FabricaDeAgudos, dayjs().format('DD/MM/YYYY'), dadosEquipamento[7].equipamento,
                    dadosEquipamento[7].equipamento, dadosEquipamento[7].voltagem, dadosEquipamento[7].quantidade)
                estoquePage.addEquipmentButton.click()
                estoquePage.fieldEquipamento.type(dadosEquipamento[6].equipamento)
                estoquePage.VoltagemRadioButton.check(dadosEquipamento[6].voltagem)
                estoquePage.fieldQuantidade.type(dadosEquipamento[6].quantidade)
                estoquePage.addEquipmentButton.click()
                estoquePage.fieldEquipamento.type(dadosEquipamento[5].equipamento)
                estoquePage.VoltagemRadioButton.check(dadosEquipamento[5].voltagem)
                estoquePage.fieldQuantidade.type(dadosEquipamento[5].quantidade)
                estoquePage.addEquipmentButton.click()
                estoquePage.fieldEquipamento.type(dadosEquipamento[3].equipamento)
                estoquePage.VoltagemRadioButton.check(dadosEquipamento[3].voltagem)
                estoquePage.fieldQuantidade.type(dadosEquipamento[3].quantidade)
                estoquePage.addEquipmentButton.click()

                estoquePage.divsQuantityOnEquipamentosList.should('have.length', 3)
            });

            it('41.2-Validar se a quantidade máxima de equipamentos por adição é 99, teste com 98', () => {
                cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
                estoquePage.AddButton.click()
                estoquePage.fillEquipmentModalFields(NfRandom(), tipoDeMovimento.Tansferencia, origem.FabricaDeAgudos, dayjs().format('DD/MM/YYYY'), dadosEquipamento[7].equipamento,
                    dadosEquipamento[7].equipamento, dadosEquipamento[7].voltagem, dadosEquipamento[7].quantidade)
                estoquePage.addEquipmentButton.click()
                estoquePage.fieldEquipamento.type(dadosEquipamento[6].equipamento)
                estoquePage.VoltagemRadioButton.check(dadosEquipamento[6].voltagem)
                estoquePage.fieldQuantidade.type(dadosEquipamento[6].quantidade)
                estoquePage.addEquipmentButton.click()
                estoquePage.fieldEquipamento.type(dadosEquipamento[5].equipamento)
                estoquePage.VoltagemRadioButton.check(dadosEquipamento[5].voltagem)
                estoquePage.fieldQuantidade.type(dadosEquipamento[5].quantidade)
                estoquePage.addEquipmentButton.click()
                estoquePage.fieldEquipamento.type(dadosEquipamento[2].equipamento)
                estoquePage.VoltagemRadioButton.check(dadosEquipamento[2].voltagem)
                estoquePage.fieldQuantidade.type(dadosEquipamento[2].quantidade)
                estoquePage.addEquipmentButton.click()

                estoquePage.divsQuantityOnEquipamentosList.should('have.length', 4)

            });

            it('41.3-Validar se a quantidade máxima de equipamentos por adição é 99, teste com 101', () => {
                cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
                estoquePage.AddButton.click()
                estoquePage.fillEquipmentModalFields(NfRandom(), tipoDeMovimento.Tansferencia, origem.FabricaDeAgudos, dayjs().format('DD/MM/YYYY'), dadosEquipamento[7].equipamento,
                    dadosEquipamento[7].equipamento, dadosEquipamento[7].voltagem, dadosEquipamento[7].quantidade)
                estoquePage.addEquipmentButton.click()
                estoquePage.fieldEquipamento.type(dadosEquipamento[6].equipamento)
                estoquePage.VoltagemRadioButton.check(dadosEquipamento[6].voltagem)
                estoquePage.fieldQuantidade.type(dadosEquipamento[6].quantidade)
                estoquePage.addEquipmentButton.click()
                estoquePage.fieldEquipamento.type(dadosEquipamento[5].equipamento)
                estoquePage.VoltagemRadioButton.check(dadosEquipamento[5].voltagem)
                estoquePage.fieldQuantidade.type(dadosEquipamento[5].quantidade)
                estoquePage.addEquipmentButton.click()
                estoquePage.fieldEquipamento.type(dadosEquipamento[1].equipamento)
                estoquePage.VoltagemRadioButton.check(dadosEquipamento[1].voltagem)
                estoquePage.fieldQuantidade.type(5)
                estoquePage.addEquipmentButton.click()

                estoquePage.divsQuantityOnEquipamentosList.should('have.length', 3)

            });

        });

        it('43-Validar se o botão próximo fica desabilitado quando não tem equipamento adicionados na lista', () => {
            cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
            estoquePage.AddButton.click()

            estoquePage.proximoButton.should('be.disabled')
        });

        it('44-Validar se clicar no botão "+Adicionar Equipamento" os campos que são apagados bloqueiam novamente o botão "+Adicionar Equipamentos"', () => {
            cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
            estoquePage.AddButton.click()
            estoquePage.fillEquipmentModalFields(NfRandom(), tipoDeMovimento.Tansferencia, origem.FabricaDeAgudos, dayjs().format('DD/MM/YYYY'), dadosEquipamento[1].equipamento,
                dadosEquipamento[1].equipamento, dadosEquipamento[1].voltagem, dadosEquipamento[1].quantidade)
            estoquePage.addEquipmentButton.click()

            estoquePage.addEquipmentButton.should('be.disabled')
        });

        context('Validar se é possível inserir todos os tipos de equipamentos disponíveis', () => {

            it('45.1-Validar se permite incluir todos os equipamentos disponíveis', () => {
                cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
                estoquePage.AddButton.click()
                estoquePage.fillEquipmentModalFields(NfRandom(), tipoDeMovimento.Compra, origem.MetalFrio, dayjs().format('DD/MM/YYYY'), dadosEquipamento[0].equipamento,
                    dadosEquipamento[0].equipamento, dadosEquipamento[0].voltagem, dadosEquipamento[0].quantidade)
                estoquePage.addEquipmentButton.click()

                estoquePage.addEquipmentList.should('contain', dadosEquipamento[0].equipamento)
            });

            it('45.2-Validar se permite incluir todos os equipamentos disponíveis', () => {
                cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
                estoquePage.AddButton.click()
                estoquePage.fillEquipmentModalFields(NfRandom(), tipoDeMovimento.Compra, origem.MetalFrio, dayjs().format('DD/MM/YYYY'), dadosEquipamento[1].equipamento,
                    dadosEquipamento[1].equipamento, dadosEquipamento[1].voltagem, dadosEquipamento[1].quantidade)
                estoquePage.addEquipmentButton.click()

                estoquePage.addEquipmentList.should('contain', dadosEquipamento[1].equipamento)
            });

            it('45.3-Validar se permite incluir todos os equipamentos disponíveis', () => {
                cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
                estoquePage.AddButton.click()
                estoquePage.fillEquipmentModalFields(NfRandom(), tipoDeMovimento.Compra, origem.MetalFrio, dayjs().format('DD/MM/YYYY'), dadosEquipamento[2].equipamento,
                    dadosEquipamento[2].equipamento, dadosEquipamento[2].voltagem, dadosEquipamento[2].quantidade)
                estoquePage.addEquipmentButton.click()

                estoquePage.addEquipmentList.should('contain', dadosEquipamento[2].equipamento)
            });

            it('45.4-Validar se permite incluir todos os equipamentos disponíveis', () => {
                cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
                estoquePage.AddButton.click()
                estoquePage.fillEquipmentModalFields(NfRandom(), tipoDeMovimento.Compra, origem.MetalFrio, dayjs().format('DD/MM/YYYY'), dadosEquipamento[3].equipamento,
                    dadosEquipamento[3].equipamento, dadosEquipamento[3].voltagem, dadosEquipamento[3].quantidade)
                estoquePage.addEquipmentButton.click()

                estoquePage.addEquipmentList.should('contain', dadosEquipamento[3].equipamento)
            });

            it('45.5-Validar se permite incluir todos os equipamentos disponíveis', () => {
                cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
                estoquePage.AddButton.click()
                estoquePage.fillEquipmentModalFields(NfRandom(), tipoDeMovimento.Compra, origem.MetalFrio, dayjs().format('DD/MM/YYYY'), dadosEquipamento[4].equipamento,
                    dadosEquipamento[4].equipamento, dadosEquipamento[4].voltagem, dadosEquipamento[4].quantidade)
                estoquePage.addEquipmentButton.click()

                estoquePage.addEquipmentList.should('contain', dadosEquipamento[4].equipamento)
            });

            it('45.6-Validar se permite incluir todos os equipamentos disponíveis', () => {
                cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
                estoquePage.AddButton.click()
                estoquePage.fillEquipmentModalFields(NfRandom(), tipoDeMovimento.Compra, origem.MetalFrio, dayjs().format('DD/MM/YYYY'), dadosEquipamento[5].equipamento,
                    dadosEquipamento[5].equipamento, dadosEquipamento[5].voltagem, dadosEquipamento[5].quantidade)
                estoquePage.addEquipmentButton.click()

                estoquePage.addEquipmentList.should('contain', dadosEquipamento[5].equipamento)
            });

            it('45.7-Validar se permite incluir todos os equipamentos disponíveis', () => {
                cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
                estoquePage.AddButton.click()
                estoquePage.fillEquipmentModalFields(NfRandom(), tipoDeMovimento.Compra, origem.MetalFrio, dayjs().format('DD/MM/YYYY'), dadosEquipamento[6].equipamento,
                    dadosEquipamento[6].equipamento, dadosEquipamento[6].voltagem, dadosEquipamento[6].quantidade)
                estoquePage.addEquipmentButton.click()

                estoquePage.addEquipmentList.should('contain', dadosEquipamento[6].equipamento)
            });

            it('45.8-Validar se permite incluir todos os equipamentos disponíveis', () => {
                cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
                estoquePage.AddButton.click()
                estoquePage.fillEquipmentModalFields(NfRandom(), tipoDeMovimento.Compra, origem.MetalFrio, dayjs().format('DD/MM/YYYY'), dadosEquipamento[7].equipamento,
                    dadosEquipamento[7].equipamento, dadosEquipamento[7].voltagem, dadosEquipamento[7].quantidade)
                estoquePage.addEquipmentButton.click()

                estoquePage.addEquipmentList.should('contain', dadosEquipamento[7].equipamento)
            });
        });

        context('Valida se não permite a inclusão do mesmo equipamento com voltagem repitida', () => {

            it('46-Validar se não permite incluir equipamentos com a mesma voltagem mais de uma vez', () => {
                cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
                estoquePage.AddButton.click()
                estoquePage.fillEquipmentModalFields(NfRandom(), tipoDeMovimento.Compra, origem.MetalFrio, dayjs().format('DD/MM/YYYY'), dadosEquipamento[2].equipamento,
                    dadosEquipamento[2].equipamento, dadosEquipamento[2].voltagem, dadosEquipamento[2].quantidade)
                estoquePage.addEquipmentButton.click()
                estoquePage.fieldEquipamento.type(dadosEquipamento[2].equipamento)

                estoquePage.radio127v.should('be.disabled')

            });

            it('46.1-Validar se não permite incluir equipamentos com a mesma voltagem mais de uma vez', () => {
                cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
                estoquePage.AddButton.click()
                estoquePage.fillEquipmentModalFields(NfRandom(), tipoDeMovimento.Compra, origem.MetalFrio, dayjs().format('DD/MM/YYYY'), dadosEquipamento[3].equipamento,
                    dadosEquipamento[3].equipamento, dadosEquipamento[3].voltagem, dadosEquipamento[3].quantidade)
                estoquePage.addEquipmentButton.click()
                estoquePage.fieldEquipamento.type(dadosEquipamento[3].equipamento)

                estoquePage.radio220v.should('be.disabled')

            });
        });

        it('47-Validar se ao adicionar as duas voltagens possíveis de um mesmo equipamento, ele não deve mais aparecer na lista de equipamentos', () => {
            cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
            estoquePage.AddButton.click()
            estoquePage.fillEquipmentModalFields(NfRandom(), tipoDeMovimento.Compra, origem.MetalFrio, dayjs().format('DD/MM/YYYY'), dadosEquipamento[2].equipamento,
                dadosEquipamento[2].equipamento, dadosEquipamento[2].voltagem, dadosEquipamento[2].quantidade)
            estoquePage.addEquipmentButton.click()
            estoquePage.fieldEquipamento.type(dadosEquipamento[3].equipamento)
            estoquePage.VoltagemRadioButton.check(dadosEquipamento[3].voltagem)
            estoquePage.fieldQuantidade.type(dadosEquipamento[3].quantidade)
            estoquePage.addEquipmentButton.click()
            estoquePage.fieldEquipamento.click()

            estoquePage.equipamentoOnList.should('not.have.text', dadosEquipamento[2].equipamento)
        });

        it('49-Validar se o botão voltar nas telas de RG volta para a tela anterior', () => {
            cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
            estoquePage.AddButton.click()
            estoquePage.fillEquipmentModalFields(NfRandom(), tipoDeMovimento.Compra, origem.MetalFrio, dayjs().format('DD/MM/YYYY'), dadosEquipamento[1].equipamento,
                dadosEquipamento[1].equipamento, dadosEquipamento[1].voltagem, 10)
            estoquePage.addEquipmentButton.click()
            estoquePage.proximoButton.click()
            estoquePage.add9Rgs(RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom(),
                RgEquipamentoRandom(), RgEquipamentoRandom(), RgEquipamentoRandom())
            estoquePage.proxButtonInsideRgModal.click()
            estoquePage.voltarButttonInsideRgModal.click()
            estoquePage.voltarButttonInsideRgModal.click()

            estoquePage.addEquipmentButton.should('be.visible')

        });

        it('51-Validar a regra do campo RG com menos que 14 caracteres', () => {
            cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
            estoquePage.AddButton.click()
            estoquePage.fillEquipmentModalFields(NfRandom(), tipoDeMovimento.Compra, origem.MetalFrio, dayjs().format('DD/MM/YYYY'), dadosEquipamento[1].equipamento,
                dadosEquipamento[1].equipamento, dadosEquipamento[1].voltagem, 1)
            estoquePage.addEquipmentButton.click()
            estoquePage.proximoButton.click()
            estoquePage.addRg.eq(0).type(1234567890123)
            estoquePage.buttonSalvarModalRgs.click()

            estoquePage.messageFieldInsideRgModal.should('contain', 'O campo deve conter 14 caracteres.')
        });

        it('52-Validar a regra do campo RG para preencher o próximo RG', () => {
            cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
            estoquePage.AddButton.click()
            estoquePage.fillEquipmentModalFields(NfRandom(), tipoDeMovimento.Compra, origem.MetalFrio, dayjs().format('DD/MM/YYYY'), dadosEquipamento[1].equipamento,
                dadosEquipamento[1].equipamento, dadosEquipamento[1].voltagem, 2)
            estoquePage.addEquipmentButton.click()
            estoquePage.proximoButton.click()
            estoquePage.addRg.eq(0).type(1234567890123)
            estoquePage.buttonSalvarModalRgs.click()

            estoquePage.addRg.eq(1).should('be.disabled')
        });

        it('53-Validar a regra do campo RG para RG duplicado bloqueio', () => {
            cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
            estoquePage.AddButton.click()
            estoquePage.fillEquipmentModalFields(NfRandom(), tipoDeMovimento.Compra, origem.MetalFrio, dayjs().format('DD/MM/YYYY'), dadosEquipamento[1].equipamento,
                dadosEquipamento[1].equipamento, dadosEquipamento[1].voltagem, 3)
            estoquePage.addEquipmentButton.click()
            estoquePage.proximoButton.click()
            estoquePage.addRg.eq(0).type(12345678901231)
            estoquePage.addRg.eq(1).type(12345678901231)
            estoquePage.buttonSalvarModalRgs.click()

            estoquePage.addRg.eq(2).should('be.disabled')
        });

        it('54-Validar se o sistema impede usar uma NF já existente no banco', () => {
            cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
            estoquePage.AddButton.click()
            estoquePage.fieldNfNumero.type('123456 / 123')
            estoquePage.fieldTipoDeMovimento.click()

            estoquePage.titleModalMsgsAndAlerts.should('have.text', 'Nota fiscal existente')
            estoquePage.subTitleModalMsgsAndAlerts.should('have.text', 'O número informado já está cadastrado emnosso sistema.')
        });

        it('55-Validar se o sistema não permite salva RGs já existentes na base', () => {
            const Rg1 = '2210777425120-8'
            const Rg2 = '2210037447597-4'
            const Rg3 = '2211037447593-1'

            cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
            estoquePage.AddButton.click()
            estoquePage.fillEquipmentModalFields(NfRandom(), tipoDeMovimento.Compra, origem.MetalFrio, dayjs().format('DD/MM/YYYY'), dadosEquipamento[1].equipamento,
                dadosEquipamento[1].equipamento, dadosEquipamento[1].voltagem, 3)
            estoquePage.addEquipmentButton.click()
            estoquePage.proximoButton.click()
            estoquePage.addRg.eq(0).type(Rg1)
            estoquePage.addRg.eq(1).type(Rg2)
            estoquePage.addRg.eq(2).type(Rg3)
            estoquePage.buttonSalvarModalRgs.click()

            estoquePage.titleModalMsgsAndAlerts.should('have.text', 'RG já existente')
            estoquePage.subTitleModalMsgsAndAlerts.should('have.text', 'Alguns RG’s já estão cadastrados em nossa base,verifique os dados e tente novamente.')
            estoquePage.listAlertRgs.should('contain', Rg1)
            estoquePage.listAlertRgs.should('contain', Rg2)
            estoquePage.listAlertRgs.should('contain', Rg3)

        });

        it('56-Valida se o modal cancelar não é exibida quando a modal de adicionar equipamentos é fechada sem preencher algum campo', () => {
            cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
            estoquePage.AddButton.click()
            estoquePage.cancelarButtonModalEquip.click()

            estoquePage.modalAcaoCancelar.should('not.exist')
        });

        it('57-Validar a regra do campo RG para RG duplicado mensagem', () => {
            cy.selectGeografiaOperacaoNomeOpecarao(geografia.geografia, cdd.cdd, nomeOperacao.nomeOperacao)
            estoquePage.AddButton.click()
            estoquePage.fillEquipmentModalFields(NfRandom(), tipoDeMovimento.Compra, origem.MetalFrio, dayjs().format('DD/MM/YYYY'), dadosEquipamento[1].equipamento,
                dadosEquipamento[1].equipamento, dadosEquipamento[1].voltagem, 2)
            estoquePage.addEquipmentButton.click()
            estoquePage.proximoButton.click()
            estoquePage.addRg.eq(0).type(12345678901231)
            estoquePage.addRg.eq(1).type(12345678901231)
            estoquePage.buttonSalvarModalRgs.click()

            estoquePage.messageFieldInsideRgModal.should('contain', 'RG duplicado.')
        });
    });

});