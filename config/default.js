const path = require('path');

module.exports = {
  server: {
    host: 'http://localhost',
    port: 3000,
  },
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
    yandex: {
      user: 'questymark@yandex.ru',
      password: 'questionmark93'
    },
    senders:  {
      default:  {
        fromEmail: 'questymark@yandex.ru',
        fromName:  'Georgy Lobko',
        signature: "<em>С уважением,<br>Георгий Лобко</em>"
      },
    }
  },
};
