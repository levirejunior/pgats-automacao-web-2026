function efetuarLogout() {
    cy.get('a[href*="/logout"]')
    .should('be.visible')
    .click()
}

function efetuarLogoutAposCadastro() {
    cy.get('[data-qa="continue-button"]').click()
    cy.get('a[href*="/logout"]')
    .should('be.visible')
    .click()
}

function verificarSeOUsuarioFoiDeslogado() {
    cy.get('.login-form > h2').should('be.visible')
    cy.get('a[href*="/logout"]').should('not.exist')
    cy.get('[action*="login"]').should('exist')
    cy.url().should('include', 'login')
}

module.exports = {
    efetuarLogout,
    verificarSeOUsuarioFoiDeslogado,
    efetuarLogoutAposCadastro
}