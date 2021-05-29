const fs = require('fs');

// configure for emailing
const { EMAIL_FROM_SUPPORT, EMAIL_TEMPLATE_BASE } = require('../../config/vars');
const handlebars = require('handlebars');

// load template file & inject data => return content with injected data.
const template = (fileName: string, data: any) => {
  const content = fs.readFileSync(EMAIL_TEMPLATE_BASE + fileName).toString();
  const inject = handlebars.compile(content);
  return inject(data);
};

// --------- Email Templates --------- //

export function welcomeEmail({ name, email }: { name: string; email: string }) {
  return {
    from: EMAIL_FROM_SUPPORT,
    to: `${name} <${email}>`,
    subject: 'Welcome!',
    text: template('welcome.txt', { name, email }),
    html: template('welcome.html', { name, email })
  };
}

export function forgotPasswordEmail({ name, email, tempPass }: { name: string; email: string; tempPass: string }) {
  return {
    from: EMAIL_FROM_SUPPORT,
    to: `${name} <${email}>`,
    subject: 'Your one-time temporary password',
    text: template('forgot-password.txt', { name, email, tempPass }),
    html: template('forgot-password.html', { name, email, tempPass })
  };
}

// resetPswEmail, forgotPswEmail, etc.

// --------- Nodemailer and Mailgun setup --------- //
const nodemailer = require('nodemailer');

export async function sendEmail(data: any) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'amrits.test@gmail.com',
      pass: 'Test@123456'
    }
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: data.from, // sender address
    to: data.to, // list of receivers
    subject: data.subject, // Subject line
    text: data.text, // plain text body
    html: data.html // html body
  });

  return data;
}
