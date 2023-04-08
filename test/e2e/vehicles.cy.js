describe('Navigation', () => {
    it('should navigate to the login page', () => {
      // Start from the index page
      cy.visit('/vehicles')
  
      // The new url should include "/"
      cy.url().should('include', '/vehicles')
    })
  })