class Port {
    constructor(name) {
      this.name = name;
      this.ships = [];
    }

  addShip(Ship) {
    this.ships.push(Ship);
  }

  removeShip(ship){
    this.ships = this.ships.filter(dockedShip => dockedShip !== ship);
  }
};

  module.exports = Port;
