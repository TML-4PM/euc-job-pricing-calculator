const nodemailer = require("nodemailer");

exports.handler = async function(event) {
    const data = JSON.parse(event.body);
    
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: "your-email@gmail.com", pass: "yourpassword" }
    });

    let mailOptions = {
        from: "your-email@gmail.com",
        to: "troy.latter@unisys.com",
        subject: "New Job Quote",
        text: `Quote Details:\n${JSON.stringify(data, null, 2)}`
    };

    try {
        await transporter.sendMail(mailOptions);
        return { statusCode: 200, body: JSON.stringify({ success: true }) };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};
