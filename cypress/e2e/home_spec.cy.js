describe('Home Page', () => {
  beforeEach(() => {
    cy.intercept("http://localhost:3000/api/v1/subscriptions", { fixture: "subscriptions.json" }).as("getSubscriptions")
    cy.intercept("http://localhost:3000/api/v1/subscriptions/1", { fixture: "subscription1.json" }).as("getSubscription")
    cy.visit("http://localhost:5173/")
  })
  
  it ('should display all subscriptions', () => {
    cy.wait('@getSubscriptions')
    cy.get('.subscription').should('have.length', 5)
  })

  it ('should hide cancelled subscriptions', () => {
    cy.wait('@getSubscriptions')
    cy.get('button').click()
    cy.get('.subscription').should('have.length', 3)
  })

  it ('should be able to navigate to subscription details page', () => {
    cy.wait('@getSubscriptions')
    cy.get('.subscription-link').first().click()
    cy.url().should('include', '/subscription/1')
  })

  it ('should show an error message if there is an error fetching data', () => {
    cy.intercept("http://localhost:3000/api/v1/subscriptions", { statusCode: 500 }).as("getSubscriptionsError")
    cy.wait('@getSubscriptionsError')
    cy.get('.error-message').should('exist')
  })

})