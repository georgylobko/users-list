const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();

const usersRouter = require('./routes/users');

require('./handlers/01-favicon').init(app);
require('./handlers/02-static').init(app);
require('./handlers/03-logger').init(app);
require('./handlers/05-errors').init(app);
require('./handlers/06-session').init(app);
require('./handlers/07-bodyParser').init(app);
require('./handlers/08-passport').init(app);

const router = new Router();

router.post('/login', require('./routes/login').post);

app.use(router.routes());

app.use(usersRouter.routes());

module.exports = app;
