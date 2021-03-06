"use strict";


import * as testAccount from './email-config';
const nodemailer = require("nodemailer");



export default async function  handler(req, res) {

    // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

    if (req.method === 'POST') {
      // Process a POST request
      let formInputs = req.body;
  // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        tls: {
          ciphers:'SSLv3'
        },
        auth: {
          user: testAccount.email, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });

      try { 
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: `"MyWebStoreName 🌈" <${testAccount.email}>`, // sender address
        to: testAccount.email, // list of receivers
        subject: formInputs.subject, // Subject line
        html: `<p><strong>Customer Name</strong>: ${formInputs.name}</p>
            <p><strong>Customer Email</strong>: ${formInputs.email}</p>
            <p><strong>Subject</strong>: ${formInputs.subject}</p>
            <p><strong>Message</strong>:</p><h3 style="text-align:center;">${formInputs.subject}</h3>
            <p>${formInputs.message}</p>`,
      });
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account

      } catch(error) {
            console.error(error);
            res.status(404).json({ error: 'Could not send email' });
      }
    } else {
      // Handle any other HTTP method
      res.status(401).json({ error: 'Improper request method' });
    }
    res.status(200).json({ name: 'John Doe' });
  }