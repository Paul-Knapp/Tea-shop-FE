describe('Details Page', () => {
    beforeEach(() => {
      cy.intercept("http://localhost:3000/api/v1/subscriptions", { fixture: "subscriptions.json" }).as("getSubscriptions")
      cy.intercept("http://localhost:3000/api/v1/subscriptions/1", { fixture: "subscription1.json" }).as("getSubscription")
      cy.visit("http://localhost:5173/subscription/1")
    })

    it('should display subscription details', () => {
        cy.get('h1').should('contain', 'Monthly Green Tea')
        cy.get('.subscription-details > :nth-child(4)').should('contain', '15.99')
        cy.get('.subscription-details > :nth-child(5)').should('contain', 'monthly')
        cy.get('.subscription-details > :nth-child(7)').should('contain', 'active')
        cy.get('h2').should('contain', 'Customer Information')
        cy.get('.subscription-details-page > :nth-child(1) > :nth-child(2) > :nth-child(2)').should('contain', 'Alice Johnson')
    });

    it('can navigate to home page', () => {
        cy.get('a').click()
        cy.url().should('eq', 'http://localhost:5173/')
    });
});