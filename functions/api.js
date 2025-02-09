const express = require("express");
const nodemailer = require("nodemailer");
const fs = require("fs");
const { createObjectCsvWriter } = require("csv-writer");

const app = express();
app.use(express.json());

const csvWriter = createObjectCsvWriter({
    path: "quotes.csv",
    header: [
        { id: "email", title: "Email" },
        { id: "product", title: "Product" },
        { id: "quantity", title: "Quantity" },
        { id: "price", title: "Price" }
    ],
    append: true
});

app.post("/quote", (req, res) => {
    const { email, items } = req.body;

    csvWriter.writeRecords(items.map(item => ({
        email: email || "Manual Entry",
        product: item.name,
        quantity: item.quantity,
        price: item.price
    })));

    sendQuoteEmail(email, items);
    res.json({ message: "Quote Sent" });
});

function sendQuoteEmail(email, items) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "your-email@gmail.com",
            pass: "your-password"
        }
    });

    let emailContent = `Hello,\n\nYour quote is below:\n\n` + 
        items.map(item => `${item.name} - ${item.quantity} x $${item.price}`).join("\n") +
        `\n\nTotal Price: $${items.reduce((sum, item) => sum + (item.quantity * item.price), 0).toFixed(2)}`;

    transporter.sendMail({
        from: "your-email@gmail.com",
        to: email,
        subject: "Your Job Quote",
        text: emailContent
    });
}

app.listen(3001, () => console.log("API running on port 3001"));
