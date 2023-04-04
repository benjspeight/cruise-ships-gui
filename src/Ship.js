(function exportShip() {
  function Ship(itinerary) {
    this.itinerary = itinerary;
    this.currentPort = itinerary.ports[0];
    this.previousPort = null;
    this.currentPort.addShip(this);
  }

  Ship.prototype.setSail = function () {
    const itinerary = this.itinerary;
    const currentPortIndex = this.itinerary.ports.indexOf(this.currentPort);

    if (currentPortIndex === this.itinerary.ports.length - 1) {
      throw new Error("End of itinerary reached");
    }

    this.currentPort.removeShip(this);
    this.previousPort = this.currentPort;
    this.currentPort = itinerary.ports[currentPortIndex + 1];
    this.currentPort.addShip(this);
  };

  Ship.prototype.dock = function () {
    const itinerary = this.itinerary;
    const currentPortIndex = itinerary.ports.indexOf(this.currentPort);

    this.currentPort.removeShip(this);
    this.previousPort = this.currentPort;
    this.currentPort = itinerary.ports[currentPortIndex - 1];
    this.currentPort.addShip(this);
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = Ship;
  } else {
    window.Ship = Ship;
  }
})();
