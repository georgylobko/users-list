const Koa = require('koa');
const pick = require('lodash').pick;

const app = new Koa();

const config = require('config');

require('./handlers/01-favicon').init(app);
require('./handlers/02-static').init(app);
require('./handlers/03-logger').init(app);
require('./handlers/05-errors').init(app);
require('./handlers/06-session').init(app);
require('./handlers/07-bodyParser').init(app);

const Router = require('koa-router');
const router = new Router();

const User = require('./models/User');

router.get('/users', async (ctx, next) => {
  ctx.body = [];

  await next();
});

router.post('/users', async (ctx, next) => {
  const user = pick(ctx.request.body, ['email', 'displayName']);
  try {
    ctx.body = await User.create(user);
  } catch (error) {
    console.dir(error);
  }
});

app.use(router.routes());

module.exports = app;
