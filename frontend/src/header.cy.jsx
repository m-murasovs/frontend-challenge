import Header from './header';

// TODO: Add component tests for the header component, it's up to you what you want to test and how
describe('<Header />', () => {
    it('renders', () => {
        cy.mount(<Header />);
    });
});
