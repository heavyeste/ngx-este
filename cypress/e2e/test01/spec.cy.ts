describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:4200');
    /* ==== Generated with Cypress Studio ==== */
    cy.get('#FirstName').clear('E');
    cy.get('#FirstName').type('Esteban');
    cy.get('#LastName').clear('L');
    cy.get('#LastName').type('Lombardo');
    /* ==== End Cypress Studio ==== */
    cy.get('#FirstName').should('have.value', 'Esteban');
    //expect(cy.get('#FirstName'), 'ok firstName');

  });
})
