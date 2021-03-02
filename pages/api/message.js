
import {TwilioKey} from './twilio-config';
import * as sgMail from '@sendgrid/mail';

sgMail.setApiKey(TwilioKey);



export default async function  handler(req, res) {
    if (req.method === 'POST') {
      // Process a POST request
      let formInputs = req.body;
        const msg = {
            to:  'baibars.dev@outlook.com', 
            from: 'baibars.dev@outlook.com', 
            subject: 'Shopify Customer is sending Message',
            text: 
              `Customer Name: ${formInputs.name}\nCustomer Email: ${formInputs.email}\nSubject:${formInputs.subject}\n\nMessage:\n\n${formInputs.message}`,
        }
        sgMail.send
        try{
            await sgMail.send(msg);
            console.log('Email sent')
        } catch(error) {
            console.error(error);
        }
    } else {
      // Handle any other HTTP method
      res.status(401).json({ error: 'Incorrect method' });
    }
    res.status(200).json({ name: 'John Doe' });
  }