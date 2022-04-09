require('dotenv').config();

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function sendMail(templateId, email, dynamicTemplateData) {
  const msg = {
    to: email,
    from: 'henrysshgb4@gmail.com',
    templateId,
    dynamic_template_data: dynamicTemplateData,
  };
  sgMail.send(msg);
}

module.exports = sendMail;
