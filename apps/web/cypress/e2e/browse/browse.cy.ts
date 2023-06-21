describe('Browse', () => {
  before(() => {
    cy.exec('npm run test:removeUser', {
      env: {
        VERSES_E2E_TEST_EMAIL: Cypress.env('VERSES_E2E_TEST_EMAIL'),
      },
    })

    cy.register('/browse')
  })

  it('Can add and remove flashcards while scrolling', () => {
    cy.visit('/browse')
    cy.contains('Bhagavad-gītā As It Is').click()
    cy.contains('Dhyāna-yoga').click()
    cy.get('.browse-column:last-child').find('.scroll').scrollTo('bottom')
    cy.get('.browse-column:last-child').contains('47').should('exist').click()

    cy.get('[data-test=add]').should('exist').click()
    cy.get('[data-test=add]').should('not.exist')
    cy.get('[data-test=added]').should('exist')

    cy.visit('/flashcards')
    cy.contains('bg/6/47').should('exist')
    cy.get('[data-test=remove]').click()
    cy.contains('bg/6/47').should('not.exist')
  })

  it('Can add and remove flashcards from multiple paths', () => {
    cy.visit('/browse').wait(1000)
    addLeaf(['Bhagavad-gītā As It Is', 'Dhyāna-yoga', '1'])
    addLeaf(['Śrī Brahma-saṁhitā', '5', '4'])
    addLeaf([
      'Śrī Caitanya-caritā',
      'Madhya-līlā',
      'Śrī Mādhavendra Purī’s Devotional Service',
      '3-4',
    ])
  })
})

async function addLeaf(paths: string[]) {
  let args = paths.slice()

  cy.visit('/browse')
  cy.wait(1000)

  while (args.length > 0) {
    const path = args.shift()
    console.log('path', path)
    cy.contains(path).should('exist').click()
  }

  cy.get('[data-test=add]').should('exist').click()
  cy.get('[data-test=add]').should('not.exist')
  cy.get('[data-test=added]').should('exist')
}
