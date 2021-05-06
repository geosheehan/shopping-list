const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
   name: {
      type: String,
      require: true,
   },
   qty: {
      type: Number,
      require: true,
   },
   units: {
      type: String,
      required: true,
   },
   catId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
   },
});

module.exports = mongoose.model('Category', CategorySchema);
