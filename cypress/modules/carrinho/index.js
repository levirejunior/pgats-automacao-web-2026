function acessarCarrinho() {
    cy.get('.shop-menu a[href="/view_cart"]').click()
}

function verificaSeaAPaginaDoCarrinhoEstaVisivel() {
    cy.url().should('include', '/view_cart')
    cy.get('#cart_info_table').should('be.visible')
}

function avancarParaCheckout() {
    cy.get('.check_out').click()
}

function verificaDetalhesDoEnderecoERevisaoDoPedido(endereco) {
    cy.get('#address_delivery').should('be.visible').and('contain.text', endereco)
    cy.get('#address_invoice').should('be.visible').and('contain.text', endereco)
    cy.get('#cart_info').should('be.visible')
}

function adicionarDescricaoEAvancaParaPagamento(descricao) {
    cy.get('textarea[name="message"]').type(descricao)
    cy.get('a[href="/payment"]').click()
}

function adicionarCartaoDeCredito(nameOnCard,cardNumber,cvc,expirationDate,expirationYear) {
    cy.get('[data-qa="name-on-card"]').type(nameOnCard)
    cy.get('[data-qa="card-number"]').type(cardNumber)
    cy.get('[data-qa="cvc"]').type(cvc)
    cy.get('[data-qa="expiry-month"]').type(expirationDate)
    cy.get('[data-qa="expiry-year"]').type(expirationYear)
}

function finalizarPedido() {
    cy.get('[data-qa="pay-button"]').click()
}

function verificaMensagemDeSucessoAoFinalizarPedido() {
    cy.get('[data-qa="order-placed"]')
    .should('be.visible')
    .and('have.text', 'Order Placed!')
    cy.contains('Congratulations! Your order has been confirmed!').should('be.visible')
}

module.exports = {
    acessarCarrinho,
    verificaSeaAPaginaDoCarrinhoEstaVisivel,
    avancarParaCheckout,
    verificaDetalhesDoEnderecoERevisaoDoPedido,
    adicionarDescricaoEAvancaParaPagamento,
    adicionarCartaoDeCredito,
    finalizarPedido,
    verificaMensagemDeSucessoAoFinalizarPedido
}