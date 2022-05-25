const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
    console.log('send mailer hit')
    const transporter = nodeMailer.createTransport({
        //simple mail transfar protocol
        // host: process.env.SMPT_HOST,
        // port: process.env.SMPT_PORT,
        service: "gmail",
        auth: {
            user: "mostofatawsif160@gmail.com",
            pass: "fkooeuivieymdkrk",
        },
    });
    // console.log(transporter);
    const mailOptions = {
        from: "mostofatawsif160@gmail.com",
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    // console.log(object);

    await transporter.sendMail((mailOptions), function (error, info) {
        if (error) {
            console.log(error)
        }
        else {
            // console.log(info);
        }
    });
};

module.exports = sendEmail;
