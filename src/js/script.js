import { Event } from "./components/Event";

const loadData = async() => {
    const response = await fetch("https://test-api.codingbootcamp.cz/api/1948f405/events");
    const eventList = await response.json();
    eventList.forEach((event, index) =>{
        const newElement = new Event({
            id: event.id,
            name: event.name, 
            date: event.date,
            description: event.description,
            image_url: event.image_url
            
        });
        const sectionForEvents = document.querySelector(".small_event");
        sectionForEvents.appendChild(newElement.element);
    
    })
    
}

loadData();





