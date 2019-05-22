const Router = require('koa-router');
const config = require('config');

const passport = require('../libs/passport');

const router = new Router();

router.post('/login', async (ctx, next) => {
  await passport.authenticate('local', async function(err, user, info) {
    if (err) throw err;

    if (user) {
      await ctx.login(user);
      ctx.body = {displayName: user.displayName, email: user.email};
    } else {
      ctx.status = 401;
      ctx.body = info;
    }
  })(ctx, next);
});

router.get('/login/vkontakte', passport.authenticate('vkontakte', config.get('providers.vk.passportOptions')));
router.get('/oauth/vkontakte', passport.authenticate('vkontakte', {
  successRedirect: '/',
  failureRedirect: '/'
}));

module.exports = router;
