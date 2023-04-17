(function exportController() {
  class Controller {
    constructor(ship) {
      this.ship = ship;
      this.initialiseSea();
      this.addPorts();
      document.querySelector("#sailButton").addEventListener("click", () => {
        this.setSail();
      });
    }

    initialiseSea() {
      const backgrounds = ["./images/water0.png", "./images/water1.png"];
      let backgroundIndex = 0;
      window.setInterval(() => {
        document.querySelector("#viewport").style.backgroundImage = `url('${
          backgrounds[backgroundIndex % backgrounds.length]
        }')`;
        backgroundIndex += 1;
      }, 500);
    }

    addPorts() {
      const ship = this.ship;
      const input = document.querySelector("input");
      const button = document.querySelector("button");
      document.querySelector("#form").addEventListener("submit", () => {
        button.removeAttribute("hidden");
        const newPort = new Port(input.value);
        ship.itinerary.ports.push(newPort);
        this.renderPorts(ship.itinerary.ports);
        ship.dock();
        this.renderShip();
        this.headsUpDisplay();
        input.value = "";
      });
    }

    resetPorts(parent) {
      while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
    }

    renderPorts(ports) {
      const portsElement = document.querySelector("#ports");
      portsElement.style.width = "0px";
      this.resetPorts(portsElement);
      ports.forEach((port, index) => {
        const newPortElement = document.createElement("div");
        newPortElement.className = "port";
        newPortElement.dataset.portName = port.name;
        newPortElement.dataset.portIndex = index;

        portsElement.appendChild(newPortElement);
        const portsElementWidth = parseInt(portsElement.style.width, 10);
        portsElement.style.width = `${portsElementWidth + 256}px`;
      });
    }

    renderShip() {
      const ship = this.ship;
      const shipPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
      const portElement = document.querySelector(
        `[data-port-index='${shipPortIndex}']`
      );
      const shipElement = document.querySelector("#ship");
      shipElement.style.top = `${portElement.offsetTop - 54}px`;
      shipElement.style.left = `${portElement.offsetLeft - 30}px`;
    }

    setSail() {
      const ship = this.ship;
      const currentPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
      const nextPortIndex = currentPortIndex + 1;
      const nextPortElement = document.querySelector(
        `[data-port-index='${nextPortIndex}']`
      );
      if (!nextPortElement) {
        this.renderMessage(
          `${ship.currentPort.name} is the last stop in our itinerary!`
        );
      } else {
        this.renderMessage(`Now departing: ${ship.currentPort.name}`);
      }

      const shipElement = document.querySelector("#ship");
      const sailInterval = setInterval(() => {
        const shipLeft = parseInt(shipElement.style.left, 10);
        if (shipLeft === nextPortElement.offsetLeft - 30) {
          ship.setSail();
          ship.dock();
          this.renderMessage(`Now docked at: ${ship.currentPort.name}`);
          this.headsUpDisplay();
          clearInterval(sailInterval);
        }
        shipElement.style.left = `${shipLeft + 1}px`;
      }, 20);
    }

    renderMessage(message) {
      const messageElement = document.createElement("div");
      messageElement.id = "message";
      messageElement.innerHTML = message;

      const viewport = document.querySelector("#viewport");
      viewport.appendChild(messageElement);

      setTimeout(() => {
        viewport.removeChild(messageElement);
      }, 2136);
    }

    headsUpDisplay() {
      const ship = this.ship;
      const currentPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
      const nextPortIndex = currentPortIndex + 1;
      const displayElement = document.querySelector("#display");
      if (nextPortIndex > ship.itinerary.ports.length - 1) {
        displayElement.innerHTML = `Current port is ${ship.currentPort.name} <br /> This is the last port in our itinerary`;
      } else {
        displayElement.innerHTML = `Current port: ${ship.currentPort.name} <br /> Next port: ${ship.itinerary.ports[nextPortIndex].name}`;
      }
    }
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = Controller;
  } else {
    window.Controller = Controller;
  }
})();
