(function exportContoller() {
  function Controller(ship) {
    this.ship = ship;
    this.initialiseSea();
    this.renderHud();

    document.querySelector("#sailbutton").addEventListener("click", () => {
      this.setSail();
    });
  }

  Controller.prototype = {
    initialiseSea: function initialiseSea() {
      const backgrounds = ["./images/water0.png", "./images/water1.png"];

      let backgroundIndex = 0;
      window.setInterval(() => {
        document.querySelector("#viewport").style.backgroundImage = `url('${
          backgrounds[backgroundIndex % backgrounds.length]
        }')`;
        backgroundIndex += 1;
      }, 1000);
    },

    renderPorts(ports) {
      const portsElement = document.querySelector("#ports");
      portsElement.style.width = "0px";

      ports.forEach((port, index) => {
        const newPortElement = document.createElement("div");
        newPortElement.className = "port";
        newPortElement.dataset.portName = port.name;
        newPortElement.dataset.portIndex = index;
        const portsElementWidth = parseInt(portsElement.style.width, 10);
        portsElement.style.width = `${portsElementWidth + 256}px`;
        portsElement.appendChild(newPortElement);
      });
    },

    renderShip() {
      const ship = this.ship;
      const shipPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
      const portElement = document.querySelector(
        `[data-port-index='${shipPortIndex}']`
      );
      const shipElement = document.querySelector("#ship");

      shipElement.style.top = `${portElement.offsetTop}px`;
      shipElement.style.left = `${portElement.offsetLeft}px`;
      shipElement.style.top = `${portElement.offsetTop + 32}px`;
      shipElement.style.left = `${portElement.offsetLeft - 32}px`;
    },

    setSail() {
      const ship = this.ship;
      const currentPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
      const nextPortIndex = currentPortIndex + 1;
      const nextPortElement = document.querySelector(
        `[data-port-index='${nextPortIndex}']`
      );

      if (!nextPortElement) {
        this.renderMessage("End of the line!");
      } else if (ship.currentPort !== null) {
        ship.setSail();
        const nextPortName = ship.itinerary.ports[nextPortIndex - 1].name;
        this.renderMessage(`Now departing ${nextPortName}`);
      }

      const shipElement = document.querySelector("#ship");
      const sailInterval = setInterval(() => {
        const shipLeft = parseInt(shipElement.style.left, 10);
        if (shipLeft === nextPortElement.offsetLeft - 32) {
          ship.setSail();
          ship.dock();
          this.renderMessage(`Arriving at ${ship.currentPort.name}`);
          clearInterval(sailInterval);
        }
        shipElement.style.left = `${shipLeft + 1}px`;
      }, 20);
    },

    renderMessage(message) {
      const messageElement = document.createElement("div");
      messageElement.id = "message";
      messageElement.innerHTML = message;
      const viewport = document.querySelector("#viewport");

      viewport.appendChild(messageElement);

      setTimeout(() => {
        viewport.removeChild(messageElement);
      }, 2000);
    },

    renderHud() {
      const hudElement = document.createElement("div");
      hudElement.id = "hud";
      const body = document.querySelector("body");

      window.setInterval(() => {
        const currentPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
        const nextPortIndex = currentPortIndex + 1;
        hudElement.innerHTML = `Current Port: ${ship.currentPort.name} <br/> Next Port: ${ship.itinerary.ports[nextPortIndex].name}`;
        body.appendChild(hudElement);
      }, 1000);
    },
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { Controller };
  } else {
    window.Controller = Controller;
  }
})();
