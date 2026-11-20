function verificaSeDadosDoProdutoEstaoVisiveis() {
    cy.get('.product-information').within(() => {
        cy.get('h2').should('be.visible') // Product name
        cy.contains('p', 'Category:').should('be.visible') // Category
        cy.contains('span', 'Rs.').should('be.visible') // Price
        cy.contains('p', 'Availability:').should('be.visible') // Availability
        cy.contains('p', 'Condition:').should('be.visible') // Condition
        cy.contains('p', 'Brand:').should('be.visible') // Brand
    })
}
module.exports = {
    verificaSeDadosDoProdutoEstaoVisiveis
}