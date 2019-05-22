const Koa = require('koa');

const app = new Koa();

const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');

require('./handlers/01-favicon').init(app);
require('./handlers/02-static').init(app);
require('./handlers/03-logger').init(app);
require('./handlers/05-errors').init(app);
require('./handlers/06-session').init(app);
require('./handlers/07-bodyParser').init(app);
require('./handlers/08-passport').init(app);

app.use(loginRouter.routes());
app.use(registerRouter.routes());
app.use(usersRouter.routes());

module.exports = app;
