// Includes
const mongoose = require('mongoose');
const config = require('../config/config');
const User = require('../models/User');

// Constants
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy;

module.exports = function (passport) {
   passport.use(
      new OIDCStrategy({
         identityMetadata: config.creds.identityMetadata,
         clientID: config.creds.clientID,
         responseType: config.creds.responseType,
         responseMode: config.creds.responseMode,
         redirectUrl: config.creds.redirectUrl,
         allowHttpForRedirectUrl: config.creds.allowHttpForRedirectUrl,
         clientSecret: config.creds.clientSecret,
         validateIssuer: config.creds.validateIssuer,
         isB2C: config.creds.isB2C,
         issuer: config.creds.issuer,
         passReqToCallback: config.creds.passReqToCallback,
         scope: config.creds.scope,
         loggingLevel: config.creds.loggingLevel,
         nonceLifetime: config.creds.nonceLifetime,
         nonceMaxAmount: config.creds.nonceMaxAmount,
         useCookieInsteadOfSession: config.creds.useCookieInsteadOfSession,
         cookieEncryptionKeys: config.creds.cookieEncryptionKeys,
         clockSkew: config.creds.clockSkew,
      },
         async (accessToken, refreshToken, profile, done) => {
            console.log('auth: ', profile);
            const newUser = {
               microsoftId: profile.oid,
               displayName: profile.displayName,
            }

            try {
               let user = await User.fineOne({ microsoftId: profile.oid });

               if (!user) {
                  user = await User.create(newUser);
               }
               done(null, user);
            }
            catch (err) {
               console.error(err);
            }
         }
      )
   );

   passport.serializeUser((user, done) => {
      done(null, user.id);
   });

   passport.deserializeUser((id, done) => {
      User.findById(id, (err, user) => done(err, user));
   });
}