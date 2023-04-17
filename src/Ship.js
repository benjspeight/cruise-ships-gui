(function exportShip() {
  class Ship {
    constructor(itinerary) {
      this.itinerary = itinerary;
      this.itineraryCount = 0;
      this.currentPort = null;
      this.previousPort = null;
      if (typeof this.currentPort === "undefined") {
        throw new Error("Ship does not have a current port");
      } else {
        this.dock();
      }
    }

    setSail() {
      if (this.itineraryCount >= this.itinerary.ports.length - 1) {
        throw new Error("End of itinerary reached");
      } else {
        this.previousPort = this.currentPort;
        this.currentPort = null;
        this.itineraryCount += 1;
        this.previousPort.removeShip(this);
      }
    }

    dock() {
      this.currentPort = this.itinerary.ports[this.itineraryCount];
      this.currentPort.addShip(this);
    }
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = Ship;
  } else {
    window.Ship = Ship;
  }
})();
