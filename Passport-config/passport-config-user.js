const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    
    const user = getUserByEmail(email)
 
    if (user == null) {
      return done(null, false, { message: 'No user with that email' })
    }

    try {
        const hashedPassword = user.password.toString();
      if (await bcrypt.compare(password, hashedPassword)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use('user', new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.user_id))
  passport.deserializeUser((user_id, done) => {
    return done(null, getUserById(user_id))
  })
}

module.exports = initialize;