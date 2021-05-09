const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
   name: {
      type: String,
      require: true,
      unique: false,
      default: 'Uncategorized',
   },
   listId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'List',
      required: true,
      unique: false,
   },
});

// Ensure (name, listId) pairs are unique
CategorySchema.index({ name: 1, listId: 1 }, { unique: true });

module.exports = mongoose.model('Category', CategorySchema);
