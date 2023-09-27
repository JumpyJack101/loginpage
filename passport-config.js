const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const infos = require("./info");

function initialize(passport) {
    const authenticateUser = async (email, password, done) => {
        try {
            
            const user = await infos.findOne({ email: email }).exec();

            if (!user) {
                return done(null, false, { message: 'No user with that email.' });
            }

            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Password incorrect.' });
            }
        } catch (error) {
            return done(error);
        }
    };

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await infos.findOne({ id: id }).exec();
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
}

module.exports = initialize;





