'use strict';

module.exports = function (Appuser) {
	Appuser.afterRemote('register', async (context, user, next) => {
		if (user) {
			user.token = user.id;
		}
	});

	Appuser.afterRemote('login', async (context, user, next) => {
		if (user) {
			user.token = user.id;
		}
	});

	Appuser.observe('after save', function (context, next) {
		if (context.isNewInstance === true) {
			const instance = context.instance;
			instance.createAccessToken(1209600000, function (err, response) {
				if (err === null) {
					context.instance['userId'] = response.userId
					context.instance['token'] = response.id;
				}
				next();
			});
		} else {
			next();
		}
	});
};
