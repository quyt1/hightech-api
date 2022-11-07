let _ = require('lodash');
const Sentry = require('@sentry/node');

module.exports = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
        .catch(err => {
                /*
                * Sentry report
                */
                Sentry.withScope((scope) => {
                    scope.setLevel('error');
                    if (typeof req.user != "undefined") {
                        scope.setUser({'email': req.user.email});
                        scope.setExtra("user", req.user);
                    }
                    scope.setExtra("errors", err);
                    Sentry.captureException(err);
                });
            console.log(err);
            next(err);
        });
};
