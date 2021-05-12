const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const List = require('./List');

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
   favorites: {
      type: mongoose.Schema.Types.ObjectId,
      ref: List,
   },
   admin: {
      type: Boolean,
      required: true,
      default: false,
   },
});

// Password hash middleware.
UserSchema.pre('save', function (next) {
   const user = this;
   if (!user.isModified('password')) return next();
   user.hashPassword(next);
});

UserSchema.post('save', async function (doc) {
   await List.create({
      _id: doc.favorites,
      name: 'Favorites',
      order: 0,
      userId: doc._id,
   });
});

// Helper to validate user's password
UserSchema.methods.hashPassword = function (next) {
   const user = this;
   bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, (err, hash) => {
         if (err) return next(err);
         user.password = hash;
         next();
      });
   });
};

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
   bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      cb(err, isMatch);
   });
};

module.exports = mongoose.model('User', UserSchema);
