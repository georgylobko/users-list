const path = require('path');

module.exports = {
  // secret data can be moved to env variables
  // or a separate config
  port: 3000,
  secret: 'mysecret',
  root: process.cwd(),
  templatesRoot: path.join(process.cwd(), 'templates'),
  crypto: {
    hash: {
      length: 128,
      iterations: 10
    }
  },
  mongodb: {
    uri: 'mongodb://localhost/users_app'
  },
  providers: {
    vk: {
      appId: '6992534',
      appSecret: 'fXo97GN5PHhRxjSIeWTc',
      passportOptions: {
        scope: ['email'],
        display: 'mobile'
      }
    }
  },
  mailer: {
    gmail: {
      user: 'mr.georgy93@gmail.com',
      password: ''
    },
    senders:  {
      default:  {
        fromEmail: 'mr.georgy93@gmail.com',
        fromName:  'Georgy Lobko',
        signature: "<em>С уважением,<br>Георгий Лобко</em>"
      },
    }
  },
};
