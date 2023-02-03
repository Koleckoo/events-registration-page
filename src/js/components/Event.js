export class Event {
    constructor(properties) {
        this.element = document.createElement("div")
        this.element.classList.add("events__container");

        this.name = properties.name
        this.id = properties.id
        this.date = properties.date
        this.description = properties.description
        this.image_url = properties.image_url

        this.displayModal = false;

        this.registered = false;

        
    
        this.createNewEvent();
    }
    
    createNewEvent = () => {
        this.element.innerHTML = `
        <div class="event">
            ${this.name}
            <button id="${this.id}" class="event__btn-more">More</button>
            <div id="myModal" class="event__modal">
                <div class="overlay"></div>
                <div class="event__modal-content">
                    <strong>Name of the Event:</strong> ${this.name}<br>
                    <strong>Date:</strong> ${this.date}
                    <img src="${this.image_url}">
                    <strong>Description:</strong> ${this.description}
                    <div class = 'form__container'>
                        ${
                            this.registered ? "":
                            `<form action="submit">
                                <label for="name">*First Name:</label>
                                <input type="text" id="name" required>
                                <label for="lname">*Last Name:</label>
                                <input type="text" id="lname" required>
                                <label for="email">*email:</label>
                                <input type="email" id="email" required>
                                <label for="phone-number"> *phone: </label>
                                <input type="text" id="phone-number" required>
                                <label for="age">
                                    <input type="checkbox" id="age" required>
                                    *I'm old enough to participate
                                </label>
                                <input class="register" type="submit" value="Register">
                            </form>`
                        }
                    </div>
                    <button class="event__btn-less">&#9587;</button>

                </div>

            </div>

        </div>
        `
        const moreModal = this.element.querySelector("#myModal");
        if (this.displayModal) {
            moreModal.style.display = "block";

        } else {
            moreModal.style.display = "none";
        }

        this.addListenertoButton();
        this.addListenertoButtonOff();
        !this.registered && this.addListenerRegister();
        
    }

    addListenertoButton = () => {
        const moreButton = this.element.querySelector(".event__btn-more");
        moreButton.addEventListener(("click"), () => {
            this.displayModal = !this.displayModal;
            this.createNewEvent();
        })
    }

    addListenertoButtonOff = () => {
        const lessButton = this.element.querySelector(".event__btn-less");

        lessButton.addEventListener(("click"), () => {
            this.displayModal = !this.displayModal;
            this.createNewEvent();
        })
    }

    addListenerRegister = () => {
        const register = this.element.querySelector(".register");

        register.addEventListener(("click"), (event) => {
            event.preventDefault();
            this.postInfo();
        })
    }

    postInfo = async() => {
        const url = `https://test-api.codingbootcamp.cz/api/f8df0d4d/events/${this.id}/registrations`;

        let data = {
            first_name: this.element.querySelector("#name").value,
            last_name: this.element.querySelector("#lname").value,
            email: this.element.querySelector("#email").value,
            phone_number: this.element.querySelector("#phone-number").value,
            age: this.element.querySelector("#age").value
        
        }
        const register = await fetch (url, {
            'method':'POST',
            'body':JSON.stringify(data),
            'headers': {
                'content-type': 'application/json'
            }
        })
        const readableResponse = await register.json();
        console.log(readableResponse)
        
        if (readableResponse.status === 'success') {
            alert("You have been registered!")
            this.registered = !this.registered
            this.createNewEvent()
        }
    }
  }


