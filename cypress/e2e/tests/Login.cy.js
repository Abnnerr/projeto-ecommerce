describe('Login', () => {
  it('deve fazer login com usuário válido', () => {
    cy.visit('http://localhost:5173/login')
    cy.get('input[name="email"]').type('teste02@gmail.com')
    cy.get('input[name="senha"]').type('123')
    cy.contains('button', 'Entrar').click()
  })
})