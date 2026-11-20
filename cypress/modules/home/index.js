function verificarSeAcessouAHomePageComSucesso() {
    cy.url().should('include', 'automationexercise.com')
    cy.get('body').should('be.visible')
    cy.get('#slider-carousel').should('be.visible')
}

function verificarSeNomeDoUsuarioExisteNoTopoDaHome(nome) {
    cy.contains('a', `Logged in as ${nome}`).should('be.visible')
}

function acessaPaginaDeProdutos() {
    cy.get('a[href="/products"]').click()
}

function adicionarPrimeiroProdutoDaHomeNoCarrinho() {
    cy.get('.features_items .productinfo a[data-product-id="1"]').click()
    cy.get('#cartModal .btn-success').click() // Clica em 'Continue Shopping'
}

function verificarSeAcessouAPaginaDeProdutosComSucesso() {
    cy.url().should('include', '/products')
    cy.get('.title.text-center')
    .should('be.visible')
    .and('have.text', 'All Products')
}

function scrollAteRodapeDaPagina() {
    cy.get('#footer').scrollIntoView()
}

function verificaSeSubscriptionEstaVisivel() {
    cy.get('.single-widget h2')
    .should('be.visible')
    .and('have.text', 'Subscription') // O CSS transforma em maiúsculas (text-transform: uppercase), mas no DOM é 'Subscription'
}

function realizarCadastroDeSubscription(email) {
    cy.get('#susbscribe_email').type(email) // O ID no HTML original possui um erro de digitação ('susbscribe')
    cy.get('#subscribe').click()
}
function verificaSeCadastroOcorreuComSucesso() {
    cy.get('#success-subscribe .alert-success')
    .should('be.visible')
    .and('contain.text', 'You have been successfully subscribed!')
}

function acessarPaginaDeRemoverConta() {
    cy.get('a[href="/delete_account"]').click()
}

function removeEVerificaSeContaFoiRemovidaComSucesso() {
    cy.get('[data-qa="account-deleted"]')
    .should('be.visible')
    .and('have.text', 'Account Deleted!')
    cy.get('[data-qa="continue-button"]').click()
}

module.exports = {
    verificarSeAcessouAHomePageComSucesso,
    verificarSeNomeDoUsuarioExisteNoTopoDaHome,
    acessaPaginaDeProdutos,
    verificarSeAcessouAPaginaDeProdutosComSucesso,
    scrollAteRodapeDaPagina,
    verificaSeSubscriptionEstaVisivel,
    realizarCadastroDeSubscription,
    verificaSeCadastroOcorreuComSucesso,
    adicionarPrimeiroProdutoDaHomeNoCarrinho,
    acessarPaginaDeRemoverConta,
    removeEVerificaSeContaFoiRemovidaComSucesso
}