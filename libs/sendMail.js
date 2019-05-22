const juice = require('juice');
const config = require('config');
const path = require('path');
const pug = require('pug');

const nodemailer = require('nodemailer');
const htmlToText = require('nodemailer-html-to-text').htmlToText;
const stubTransport = require('nodemailer-stub-transport');
const SMTPTransport = require('nodemailer-smtp-transport');

const transportEngine = (process.env.NODE_ENV === 'test' || process.env.MAILER_DISABLED)
  ? stubTransport()
  : new SMTPTransport({
    service: 'Yandex',
    debug: true,
    auth: {
      user: config.get('mailer.yandex.user'),
      pass: config.get('mailer.yandex.password')
    }
  });

const transport = nodemailer.createTransport(transportEngine);

transport.use('compile', htmlToText());

module.exports = async function sendMail(options) {
  const sender = config.mailer.senders[options.from || 'default'];
  const locals = { sender };
  
  const html = pug.renderFile(
    path.join(config.get('templatesRoot'), 'email', `${options.template}.pug`),
    Object.assign({}, locals, { link: options.link })
  );

  const message = {
    from: {
      address: sender.fromEmail,
      name: sender.fromName,
    },
    html: juice(html), // inline styles
    to: {
      address: options.to,
    },
    subject: options.subject,
    headers: options.headers || {},
  };

  return await transport.sendMail(message);

};
