const email = 'kwelch12+test@gmail.com'
const password = 'Pass1234'

describe('Login', () => {
  it('Can register', () => {
    cy.visit('http://localhost:8888/register')
    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type(password)
    cy.get('button[type="submit"]').click()
  })

  it('Can login', () => {
    cy.visit('http://localhost:8888/login')
    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type(password)
    cy.get('button[type="submit"]').click()
  })
})
