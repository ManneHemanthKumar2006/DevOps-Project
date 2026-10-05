const container = document.getElementById("registrations");
const count = document.getElementById("count");
const eventFilter = document.getElementById("eventFilter");

let allRegistrations = [];

fetch("/registrations")
    .then(response => response.json())
    .then(data => {
        allRegistrations = data;
        displayRegistrations(data);
    });

function displayRegistrations(data) {
    container.innerHTML = "";

    count.textContent = `Total Registrations: ${data.length}`;

    data.forEach(registration => {
        const div = document.createElement("div");

        div.innerHTML = `
    <p><strong>Name:</strong> ${registration.name}</p>
    <p><strong>Roll Number:</strong> ${registration.rollNumber}</p>
    <p><strong>Email:</strong> ${registration.email}</p>
    <p><strong>Phone:</strong> ${registration.phone}</p>
    <p><strong>Event:</strong> ${registration.event}</p>
    <button onclick="deleteRegistration(${allRegistrations.indexOf(registration)})">
        Delete
    </button>
`;
        container.appendChild(div);
    });
}

eventFilter.addEventListener("change", () => {
    const selectedEvent = eventFilter.value;

    if (selectedEvent === "All") {
        displayRegistrations(allRegistrations);
    } else {
        const filtered = allRegistrations.filter(
            registration => registration.event === selectedEvent
        );

        displayRegistrations(filtered);
    }
});

function deleteRegistration(index) {
    fetch(`/registrations/${index}`, {
        method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        location.reload();
    })
    .catch(error => {
        console.error(error);
        alert("Delete failed!");
    });
}