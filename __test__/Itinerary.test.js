const Itinerary = require('../src/Itinerary.js');

describe('Itinerary', () => {
    it('can be instatiated', () => {
        
        expect(new Itinerary).toBeInstanceOf(Object);
    });

    it('can have ports', () => {
        const dover = jest.fn();
        const calais = jest.fn();
        const itinerary = new Itinerary([dover, calais]);

        expect(itinerary.ports).toEqual([dover, calais]);
    });
});
