describe('go to each category detail from home', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });
  it('should click agricultura category', () => {
    cy.get('#category-agricultura').should('have.text', 'agricultura').click();
    cy.get('h1').should('have.text', 'agricultura');
  });

  it('should click seguridad category', () => {
    cy.get('#category-seguridad').should('have.text', 'seguridad').click();
    cy.get('h1').should('have.text', 'seguridad');
  });

  it('should click inmobiliario category', () => {
    cy.get('#category-inmobiliario').should('have.text', 'inmobiliario').click();
    cy.get('h1').should('have.text', 'inmobiliario');
  });

  it('should click aventura category', () => {
    cy.get('#category-aventura').should('have.text', 'aventura').click();
    cy.get('h1').should('have.text', 'aventura');
  });

  it('should click fotografia category', () => {
    cy.get('#category-fotografia').should('have.text', 'fotografia').click();
    cy.get('h1').should('have.text', 'fotografia');
  });

  it('should click cine category', () => {
    cy.get('#category-cine').should('have.text', 'cine').click();
    cy.get('h1').should('have.text', 'cine');
  });
});
