const mongoose = require('mongoose');
const Category = require('./Category');

const ListSchema = new mongoose.Schema({
   name: {
      type: String,
      require: true,
   },
   desc: {
      type: String,
      default: '',
   },
   order: {
      type: Number,
      required: true,
      unique: false,
   },
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      unique: false,
   },
});

ListSchema.index({ order: 1, userId: 1 }, { unique: true });

ListSchema.post('save', async function (doc) {
   await Category.create({
      name: 'Uncategorized',
      listId: doc._id
   });
});

module.exports = mongoose.model('List', ListSchema);
