describe('go to each category detail from home', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/iniciar-sesion');
  });
  it('should login', () => {
    cy.get('#sign-form-email').type('henrys4hgb+testdrone7@gmail.com');
    cy.get('#password').type('password');
    cy.get('form').within(() => {
      cy.get('button').click();
    });
    cy.url().should('eq', 'http://localhost:3000/');
  });

  it('should be invalid password', () => {
    cy.get('#sign-form-email').type('badEmailFormat');
    cy.get('#password').type('password');
    cy.get('form').within(() => {
      cy.get('button').click();
    });
    cy.get('#sign-form-email-helper-text').should(
      'have.text',
      'Ingresa un correo Válido',
    );
  });

  it('should be invalid credentials', () => {
    cy.get('#sign-form-email').type('henrys4hgb+testdrone7@gmail.com');
    cy.get('#password').type('Badpassword');
    cy.get('form').within(() => {
      cy.get('button').click();
    });
    cy.get('#error-message').should('have.text', 'Credenciales invalidas');
  });
});
