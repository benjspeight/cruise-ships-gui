(function exportPort() {
  class Port {
    constructor(name) {
      this.name = name;
      this.ships = [];
    }

    addShip(ship) {
      if (ship.currentPort.name !== this.name) {
        return "This ship is not currently docked at this port";
      }
      this.ships.push(ship);
    }

    removeShip(ship) {
      if (ship.previousPort.name !== this.name) {
        return "This ship is still docked at this port";
      }
      this.ships = this.ships.filter((shipElement) => shipElement !== ship);
    }
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = Port;
  } else {
    window.Port = Port;
  }
})();
