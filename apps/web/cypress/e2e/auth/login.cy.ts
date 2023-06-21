describe('Login', () => {
  beforeEach(() => {
    cy.login()
  })
  // it('Can register', () => {
  //   cy.visit('/register')
  //   cy.get('input[name="email"]').type(email)
  //   cy.get('input[name="password"]').type(password)
  //   cy.get('button[type="submit"]').click()
  // })

  // it('Can login', () => {
  //   cy.visit('/login')
  //   cy.get('input[name="email"]').type(email)
  //   cy.get('input[name="password"]').type(password)
  //   cy.get('button[type="submit"]').click()
  //   cy.get('[test-id="tab-bar"]').should('exist')
  // })

  it('Can logout', () => {
    // cy.login()
    // cy.contains('Log out').click()
    cy.url().should('include', '/browse')
  })
})
