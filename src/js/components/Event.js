export class Event {
    constructor(properties) {
        this.element = document.createElement("div")
        this.element.classList.add("events__container");
        this.id = properties.id

        this.name = properties.name

        this.createNewEvent();
    }

    createNewEvent = () => {
        this.element.innerHTML = `
            <div class="event">
                ${this.name}
                <button id="${this.id}" class="event__btn-more">More</button>
            </div>
        `
    }
}