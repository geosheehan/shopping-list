const mongoose = require('mongoose');
const List = require('./List');

const ItemSchema = new mongoose.Schema({
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
   checked: {
      type: Boolean,
      required: true,
      default: false,
   },
   listId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: List,
      required: true,
   }
});

module.exports = mongoose.model('Item', ItemSchema);
