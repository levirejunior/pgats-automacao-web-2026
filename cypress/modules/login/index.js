function preencherLogin(email, senha) {
    cy.get('a[href*=login]').click()
    cy.get('[data-qa="login-email"]').type(email)
    cy.get('[data-qa="login-password"]').type(senha)
    cy.get('[data-qa="login-button"]').click()
}

function preencherLoginAposLogout(email, senha) {
    cy.get('[data-qa="login-email"]').type(email)
    cy.get('[data-qa="login-password"]').type(senha)
    cy.get('[data-qa="login-button"]').click()
}

function verificarSeLoginEfetuadoComSucesso() {
    cy.get('a > b').should('contain', 'PGATS Aut')
}

function verificarSeMensagemDeErroFoiExibidaNoLogin() {
    cy.get('form[action*=login] > p')
    .should('exist')
    .should('be.visible')
    .should('contain.text', 'Your email or password is incorrect!')
    .and('contain.text', 'Your email or password is incorrect!')
}

module.exports = {
    preencherLogin,
    verificarSeLoginEfetuadoComSucesso,
    verificarSeMensagemDeErroFoiExibidaNoLogin,
    preencherLoginAposLogout
}