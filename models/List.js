const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
   name: {
      type: String,
      require: true,
   },
   userId: {
      type: String,
      require: true,
   },
});

module.exports = mongoose.model('List', ListSchema);