const Ship = require('../src/Ship.js');

describe('Ship', () => {
    it('can be instantiated', () => {
        expect(new Ship()).toBeInstanceOf(Object);
    });

    it('has a starting port', () => {
        const ship = new Ship('Holyhead')

        expect(ship.startingPort).toBe('Holyhead');
    });

    it('can set sail', () => {
        const ship = new Ship('Holyhead')

        ship.setSail();

        expect(ship.startingPort).toBeFalsy();
    });




});
