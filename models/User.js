const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
   email: {
      type: String,
      required: true,
      unique: true,
   },
   userName: {
      type: String,
      required: true,
      unique: true,
   },
   password: {
      type: String,
      required: true,
   },
   created: {
      type: Date,
      required: true,
      default: Date.now,
   },
   admin: {
      type: Boolean,
      required: true,
      default: false,
   },
});

// Password hash middleware.
UserSchema.pre('save', function save(next) {
   const user = this;
   if (!user.isModified('password')) return next();
   bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, (err, hash) => {
         if (err) return next(err);
         user.password = hash;
         next();
      });
   });
});

// Helper to validate user's password
UserSchema.methods.comparePassword = function comparePassword(
   candidatePassword,
   cb
) {
   bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      cb(err, isMatch);
   });
};

module.exports = mongoose.model('User', UserSchema);
