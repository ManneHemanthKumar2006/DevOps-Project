const form = document.getElementById("registrationForm");
const message = document.getElementById("message");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const rollNumber = document.getElementById("rollNumber").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const event = document.getElementById("event").value;

    const registrationData = {
        name,
        rollNumber,
        email,
        phone,
        event
    };

    fetch("/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(registrationData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        message.textContent = data.message;
        form.reset();
    })
    .catch(error => {
        console.error(error);
        message.textContent = "Registration failed!";
    });
});