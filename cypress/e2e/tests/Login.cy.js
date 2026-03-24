describe('Login', () => {
  it('login com usuário admin', () => {

    cy.visit('http://localhost:5173/login')
    cy.get('input[name="email"]')
      .should('be.visible')
      .type('teste02@gmail.com')  
    cy.get('input[name="senha"]')
      .should('be.visible')
      .type('123')
    cy.contains('button', 'Entrar')
      .should('be.enabled')
      .click()
    cy.url().should('include', '/admin')

  })

  it('login com usuário comum', () => {
    cy.visit('http://localhost:5173/login')
    cy.get('input[name="email"]').type('jonasabner00@gmail.com')
    cy.get('input[name="senha"]').type('123')
    cy.contains('button', 'Entrar').click()
    cy.url().should('eq', 'http://localhost:5173/')
    cy.url().should('not.include', '/admin')
  })

  it('ao clicar em Esqueci minha senha', () => {
    cy.visit('http://localhost:5173/login')
    cy.get('a').contains('Esqueci minha senha').click()
    cy.url().should('include', '/forgot-password')
  })

  it('ao clicar em Criar conta', () => {
    cy.visit('http://localhost:5173/login')
    cy.get('a').contains('Criar conta').click()
    cy.url().should('include', '/register')
  })

})

describe('Login - Cenários de erro', () => {

  it('não deve fazer login com senha incorreta', () => {
    cy.visit('http://localhost:5173/login')

    cy.get('input[name="email"]').type('teste02@gmail.com')
    cy.get('input[name="senha"]').type('senha_errada')
    cy.contains('button', 'Entrar').click()
    cy.url().should('include', '/login')
    cy.contains('Erro').should('be.visible')
  })

  it('não deve fazer login com usuário inválido', () => {
    cy.visit('http://localhost:5173/login')
    cy.get('input[name="email"]').type('naoexiste@gmail.com')
    cy.get('input[name="senha"]').type('123')
    cy.contains('button', 'Entrar').click()
    cy.url().should('include', '/login')
    cy.contains('Erro').should('be.visible')
  })
})