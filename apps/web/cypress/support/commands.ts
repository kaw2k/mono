/// <reference types="cypress" />

import { logout } from '../../src/utils/firebase/client'

export {}

declare global {
  interface Window {
    Cypress?: Cypress.Cypress
  }
}

declare global {
  namespace Cypress {
    interface Chainable {
      logout(): Chainable

      login(
        redirectPath?: string,
        credentials?: { email: string; password: string }
      ): void

      register(
        redirectPath?: string,
        credentials?: { email: string; password: string }
      ): void
    }
  }
}

Cypress.Commands.add('logout', () => {
  logout()
})

Cypress.Commands.add(
  'login',
  (
    redirectPath = '/',
    credentials = {
      email: Cypress.env(`VERSES_E2E_TEST_EMAIL`) as string,
      password: Cypress.env(`VERSES_E2E_TEST_PASSWORD`) as string,
    }
  ) => {
    cy.session(credentials, () => {
      cy.visit('/login')
      cy.get('input[name="email"]').type(credentials.email)
      cy.get('input[name="password"]').type(credentials.password)
      cy.get('button[type="submit"]').click()
      cy.url().should('include', redirectPath)
    })
  }
)

Cypress.Commands.add(
  'register',
  (
    redirectPath = '/',
    credentials = {
      email: Cypress.env(`VERSES_E2E_TEST_EMAIL`) as string,
      password: Cypress.env(`VERSES_E2E_TEST_PASSWORD`) as string,
    }
  ) => {
    const stub = cy.stub()
    cy.on('window:alert', stub)
    cy.visit('/register')
    cy.get('input[name="email"]').type(credentials.email)
    cy.get('input[name="password"]').type(credentials.password)
    cy.get('button[type="submit"]')
      .click()
      .then(() => {
        cy.wait(1000)
      })
    cy.visit(redirectPath)
  }
)
