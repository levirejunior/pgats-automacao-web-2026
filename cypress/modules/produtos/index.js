function verificaSeExibiuAListaDeProdutos() {
    cy.get('.features_items .col-sm-4')
    .should('be.visible')
    .and('have.length.greaterThan', 0)
}

function verificaSeAcessouAPáginaDeProdutosComSucesso() {
    cy.url().should('include', '/products');
    cy.get('.title.text-center')
    .should('be.visible')
    .and('contain.text', 'All Products');
}

function acessarPrimeiroProdutoDaLista() {
    cy.contains('View Product').first().click()
}

function buscarPorUmTermo(termo) {
    cy.get('#search_product').type(termo);
    cy.get('#submit_search').click();
}

function verificaSeOTextoSearchedProductsEstaVisivel() {
        cy.get('.title.text-center')
        .should('be.visible')
        .and('contain.text', 'Searched Products');
}

module.exports = {
    verificaSeExibiuAListaDeProdutos,
    verificaSeAcessouAPáginaDeProdutosComSucesso,
    acessarPrimeiroProdutoDaLista,
    buscarPorUmTermo,
    verificaSeOTextoSearchedProductsEstaVisivel
}