const Port = require('../src/Port.js');

describe('Port', () => {
  describe('with ports and ships', () => {
    let port;
    let titanic;
    let queenMary;

    beforeEach(() => {
      port = new Port('Dover');
      titanic = jest.fn()
      queenMary = jest.fn()
      ship = jest.fn();
    });

    it('can be instantiated', () => {
      expect(new Port()).toBeInstanceOf(Object);
    });

    it('has a name property', () => {      
      expect(port.name).toBe('Dover');
    });

    it('can add a ship', () => {
      port.addShip(ship);

      expect(port.ships).toContain(ship);
    });

    it('can remove a ship', () => {
      port.addShip(titanic);
      port.addShip(queenMary);
      port.removeShip(queenMary);

      expect(port.ships).toEqual([titanic]);
    });
  });
});