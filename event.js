function createEditableRow(event = {}) {
  const row = document.createElement("tr");

  // Editable Event Name
  const nameCell = document.createElement("td");
  nameCell.innerHTML = `<input type="text" placeholder="Enter Event Name" value="${event.name || ""}">`;

  // Editable Start Date
  const startCell = document.createElement("td");
  startCell.innerHTML = `<input type="date" value="${event.start || ""}">`;

  // Editable End Date
  const endCell = document.createElement("td");
  endCell.innerHTML = `<input type="date" value="${event.end || ""}">`;

  // Actions
  const actionsCell = document.createElement("td");

  // Save Button
  const saveButton = document.createElement("button");
  saveButton.textContent = "save";
  saveButton.addEventListener("click", async () => {
    const newEvent = {
      eventName: nameCell.querySelector("input").value,
      startDate: startCell.querySelector("input").value,
      endDate: endCell.querySelector("input").value,
    };

    if (!newEvent.eventName || !newEvent.startDate || !newEvent.endDate) {
      alert("Please fill out all fields.");
      return;
    }

    let addedEvent;
    if (event.id) {
      // Update existing event
      addedEvent = await eventAPI.editEvent(event.id, newEvent);
    } else {
      // Create a new event
      addedEvent = await eventAPI.postEvent(newEvent);
    }

    // Replace the editable row with a regular row
    const newRow = createEventRow(addedEvent);
    row.replaceWith(newRow); // Replace the current editable row with the saved row
  });

  // Cancel Button
  const cancelButton = document.createElement("button");
  cancelButton.textContent = "cancel";
  cancelButton.addEventListener("click", () => {
    row.remove(); // Remove the editable row if canceled
  });

  actionsCell.appendChild(saveButton);
  actionsCell.appendChild(cancelButton);

  // Append cells to the row
  row.appendChild(nameCell);
  row.appendChild(startCell);
  row.appendChild(endCell);
  row.appendChild(actionsCell);

  return row;
}

function createEventRow(event) {
  const row = document.createElement("tr");

  // Event Name
  const nameCell = document.createElement("td");
  nameCell.textContent = event.eventName;

  // Start Date
  const startCell = document.createElement("td");
  startCell.textContent = event.startDate;

  // End Date
  const endCell = document.createElement("td");
  endCell.textContent = event.endDate;

  // Actions
  const actionsCell = document.createElement("td");

  // Edit Button
  const editButton = document.createElement("button");
  editButton.textContent = "edit";
  editButton.addEventListener("click", () => {
    const editableRow = createEditableRow(event);
    row.replaceWith(editableRow); // Replace the static row with an editable one
  });

  // Delete Button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "delete";
  deleteButton.addEventListener("click", async () => {
    await eventAPI.deleteEvent(event.id);
    row.remove(); // Remove the row directly from the table
  });

  actionsCell.appendChild(editButton);
  actionsCell.appendChild(deleteButton);

  // Append cells to the row
  row.appendChild(nameCell);
  row.appendChild(startCell);
  row.appendChild(endCell);
  row.appendChild(actionsCell);

  return row;
}

async function renderEvents() {
  const tableBody = document.querySelector("#eventTable tbody");
  tableBody.innerHTML = ""; // Clear existing rows

  const events = await eventAPI.getEvent();
  events.forEach((event) => {
    const row = createEventRow(event);
    tableBody.appendChild(row);
  });
}

function setUpAddEventButton() {
  const addButton = document.getElementById("add-event");
  addButton.addEventListener("click", () => {
    const tableBody = document.querySelector("#eventTable tbody");
    const editableRow = createEditableRow(); // Create an editable row
    tableBody.appendChild(editableRow); // Add it to the table
  });
}

// Initialize the app
(function initApp() {
  setUpAddEventButton();
  renderEvents(); // Load and render existing events
})();
