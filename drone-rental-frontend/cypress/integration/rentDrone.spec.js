const today = new Date();
const start = today.getDate();
const end = today.getDate() + 3;
const month = today.getMonth() + 1;
const year = today.getFullYear();

describe('Navigate to alquilar, click first drone option, add it to cart and proceed to checkout', () => {
  before(() => cy.visit('http://localhost:3000/'));
  it('should click alquilar menu and then click on first drone', () => {
    cy.get('button').contains('Alquilar').click();
    cy.get('button > img').first().click();
  });

  it('should imput quantity, select date range and add to cart', () => {
    cy.get('input#quantity').type('1');
    cy.get('input[name="day"').first().type(start, { force: true });
    cy.get('input[name="month"').first().type(month, { force: true });
    cy.get('input[name="year"').first().type(year, { force: true });

    cy.get('input[name="day"').last().type(end, { force: true });
    cy.get('input[name="month"').last().type(month, { force: true });
    cy.get('input[name="year"').last().type(year, { force: true });

    cy.get('button')
      .contains(/agregar/i)
      .click({ force: true });
  });

  it('cart should have one item', () => {
    cy.get('button#cart-icon').click();
    cy.get('#cart-content>tr').should('have.length', 1);
  });

  it('click comprar button and go to checkout, where the total should be different than 0', () => {
    cy.get('button')
      .contains(/comprar/i)
      .click();
    cy.get('#cart-content>tr').should('have.length', 1);
    cy.get('p').contains(/total/i).should('not.have.text', /$0/i);
  });
});
