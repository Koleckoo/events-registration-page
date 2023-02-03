export class Event {
    constructor(properties) {
        this.element = document.createElement("div")
        this.element.classList.add("events__container");
        this.id = properties.id

        this.displayModal = false;
        this.overlayOn = false;

        this.name = properties.name

        this.createNewEvent();
    }
    
    createNewEvent = () => {
        this.element.innerHTML = `
        <div class="event">
        ${this.name}
        <button id="${this.id}" class="event__btn-more">More</button>
        <div id="myModal" class="event__modal">
        <div class="overlay"></div>
        <div class="event__modal-content"></div>
        </div>

        </div>
        `
        const moreModal = this.element.querySelector("#myModal");
        if (this.displayModal) {
            moreModal.style.display = "block";

        }

        const overlayDiv = document.createElement("div");
        document.body.appendChild(overlayDiv);
        if (this.overlayOn) {
            overlayBody.classList.add("overlay");
        }
        this.addListenertoButton();
    }

    addListenertoButton = () => {
        const moreButton = this.element.querySelector(".event__btn-more");
        
        moreButton.addEventListener(("click"), () => {
            this.displayModal = !this.displayModal;
            this.overlayOn = !this.overlayOn;
            this.createNewEvent();
        })
    }

}