const eventAPI = (() => {
    const Event_API_URL = "http://localhost:3000/events";
    async function getEvent() {
      // GET request to the server
      const response = await fetch(Event_API_URL);
  
      // response.json also returns a promise
      const todos = await response.json();
      //   console.log(todos);
      return todos;
    }
  
    async function postEvent(newEvent) {
      const response = await fetch(Event_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });
  
      const event = await response.json();
      //   console.log(todo.id);
      return event;
    }
  
    async function deleteEvent(id) {
      const response = await fetch(`${Event_API_URL}/${id}`, {
        method: "DELETE",
      });
  
      await response.json();
      return id;
    }
  
    async function editEvent(id, newEvent) {
      const response = await fetch(`${Event_API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });
  
      const updatedEvent = await response.json();
      return updatedEvent;
    }
  
    return {
      getEvent,
      postEvent,
      deleteEvent,
      editEvent,
    };
  })();
  