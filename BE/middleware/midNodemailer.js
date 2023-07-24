const nodemailer = require('nodemailer');
const fs = require('fs');
const handlebars = require('handlebars');
const path = require('path');

const HTMLpath = path.join(__dirname, '../templetes/templateRegister.hbs');

const readHTMLFile = fs.readFileSync(HTMLpath, "utf8");
const template = handlebars.compile(readHTMLFile);



const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    }
});


const sendMail = (mailOptions) => {
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send({
                statusCode: 500,
                message: 'Internal server error',
                error,
            });
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}


module.exports = {
    sendMail,
    template,
};


