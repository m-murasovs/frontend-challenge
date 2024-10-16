context('Interactions', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:3000/');
    });

    it('neighborhoods are displayed', () => {
        cy.get('.Neighborhood').should('have.length.at.least', 1);
    });

    it('more neighborhoods are displayed when no filter is selected', () => {
        cy.get('.Neighborhood').its('length').then((length) => {
            cy.get('label[for="filter_by_time_period"]').click();
            cy.get('.Neighborhood').should('have.length.above', length);
        });
    });

    it('every 10 seconds, the neighborhoods should change', () => {
        cy.get('.Neighborhood').first().then((neighborhood) => {
            const id = neighborhood.attr('id');
            cy.wait(10000);
            cy.get(`#${id}`).should('not.exist');
        });
    });

    it('clicking on the time toggle filters the list by that type', () => {
        cy.get('header button[aria-label="@"]').click();
        cy.get('.Neighborhood svg[aria-label="*"]').should('not.exist');
    });
});
