const Router = require('koa-router');
const uuid4 = require('uuid4');
const config = require('config');

const User = require('../models/User');
const sendMail = require('../libs/sendMail');

const router = new Router();

router.post('/register', async function(ctx) {

	const verifyEmailToken = uuid4();
	const email = ctx.request.body.email;

	try {
		const user = new User({
			email,
			displayName: ctx.request.body.displayName,
			verifyEmailToken: verifyEmailToken,
			verifiedEmail: false,
		});

		await user.setPassword(ctx.request.body.password);

		await user.save();
	} catch(e) {
		if (e.name === 'ValidationError') {
			let errorMessages = '';
			for(let key in e.errors) {
				errorMessages += `${key}: ${e.errors[key].message}<br>`;
			}
			ctx.flash('error', errorMessages);
			return ctx.redirect('/register');
		} else {
			throw e;
		}
	}

	await sendMail({
		template: 'verify-registration-email',
		to: email,
		subject: 'Подтверждение email',
		link: `${config.get('server.host')}:${config.get('server.port')}/confirm/${verifyEmailToken}`
	});

	ctx.body = 'ok';

});

router.get('/confirm/:verifyEmailToken', async function(ctx) {

	const user = await User.findOne({
		verifyEmailToken: ctx.params.verifyEmailToken
	});

	if (!user) {
		ctx.throw(404, 'Ссылка подтверждения недействительна или устарела.');
	}

	if (!user.verifiedEmail) {
		user.verifiedEmail = true;
	}

	user.verifyEmailToken = null;

	await user.save();

	await ctx.login(user);

	ctx.body = 'Confirmed';
});

module.exports = router;
