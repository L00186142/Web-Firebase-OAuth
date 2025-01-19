const passport = require('passport');
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy;

console.log('Loading Microsoft OIDC Strategy');

passport.use('oidc', new OIDCStrategy({
    identityMetadata: `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID}/v2.0/.well-known/openid-configuration`,
    clientID: process.env.MICROSOFT_CLIENT_ID,
    clientSecret: process.env.MICROSOFT_CLIENT_SECRET,
    responseType: 'code',
    responseMode: 'query',
    redirectUrl: process.env.MICROSOFT_CALLBACK_URL,
    allowHttpForRedirectUrl: true,
    scope: ['openid', 'profile', 'email'],
}, (profile, done) => {
    console.log('Microsoft profile received:', profile);
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

console.log('Microsoft OIDC Strategy Initialized');
