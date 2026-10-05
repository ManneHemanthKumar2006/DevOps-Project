const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("/app/frontend"));

app.post("/submit", (req, res) => {
    const registration = req.body;

    let registrations = [];

    if (fs.existsSync("registrations.json")) {
        registrations = JSON.parse(
            fs.readFileSync("registrations.json", "utf-8")
        );
    }

    registrations.push(registration);

    fs.writeFileSync(
        "registrations.json",
        JSON.stringify(registrations, null, 2)
    );

    console.log("Registration saved:");
    console.log(registration);

    res.json({
        message: "Registration saved successfully!"
    });
});
app.get("/registrations", (req, res) => {
    let registrations = [];

    if (fs.existsSync("registrations.json")) {
        registrations = JSON.parse(
            fs.readFileSync("registrations.json", "utf-8")
        );
    }

    res.json(registrations);
});
app.delete("/registrations/:index", (req, res) => {
    let registrations = [];

    if (fs.existsSync("registrations.json")) {
        registrations = JSON.parse(
            fs.readFileSync("registrations.json", "utf-8")
        );
    }

    const index = parseInt(req.params.index);

    if (index < 0 || index >= registrations.length) {
        return res.status(404).json({
            message: "Registration not found"
        });
    }

    registrations.splice(index, 1);

    fs.writeFileSync(
        "registrations.json",
        JSON.stringify(registrations, null, 2)
    );

    res.json({
        message: "Registration deleted successfully!"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});