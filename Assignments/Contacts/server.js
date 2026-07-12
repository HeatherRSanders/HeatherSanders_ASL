const express = require("express");

const contactsRouter = require("./routes/contacts");

const app = express();

const PORT = 8080;

app.use(express.json());

app.use("/v1/contacts", contactsRouter);


app.use((req, res) => {
    res.status(404).json({
        message: "Resource not found"
    });
});


app.listen(PORT, () => {
    console.log(`Contacts API running on port ${PORT}`);
});