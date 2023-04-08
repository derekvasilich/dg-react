describe('Navigation', () => {
    it('should navigate to the login page', () => {
      // Start from the index page
      cy.visit('/')
  
      // The new url should include "/"
      cy.url().should('include', '/')
  
      cy.get('[data-test-id="login-button"]')
        .should('exist')
        .should('be.visible')
    })
  })