const Koa = require('koa');
const pick = require('lodash').pick;

const app = new Koa();

require('./handlers/01-favicon').init(app);
require('./handlers/02-static').init(app);
require('./handlers/03-logger').init(app);
require('./handlers/05-errors').init(app);
require('./handlers/06-session').init(app);
require('./handlers/07-bodyParser').init(app);

const Router = require('koa-router');
const router = new Router();

const User = require('./models/User');

async function getUser(ctx) {
  let user;
  try {
    user = await User.findById(ctx.params.id);
  } catch (error) {
    ctx.throw(404);
  }

  return user;
}

router.get('/users', async (ctx, next) => {
  ctx.body = await User.find();

  await next();
});

router.get('/users/:id', async (ctx, next) => {
  ctx.body = await getUser(ctx);

  await next();
});

router.post('/users', async (ctx) => {
  const user = pick(ctx.request.body, ['email', 'displayName']);
  ctx.body = await User.create(user);
});

router.patch('/users/:id', async (ctx) => {
  const user = await getUser(ctx);

  const updatedFields = pick(ctx.request.body, ['email', 'displayName']);
  user.set(updatedFields);
  await user.save();

  ctx.body = user;
});

router.del('/users/:id', async (ctx) => {
  const user = await getUser(ctx);

  await user.remove();

  ctx.body = 'ok';
});

app.use(router.routes());

module.exports = app;
