const { parseValidationErrors } = require('../utils/parseErrors');


exports.init = app => app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    if (error.name === 'ValidationError') {
      ctx.status = 400;
      ctx.body = parseValidationErrors(error);
    } else if (error.status) {
      ctx.body = error.message;
      ctx.status = error.status;
    } else {
      ctx.body = 'Error 500';
      ctx.status = 500;
    }

  }
});
