const List = require('../models/List');
// const List = require('../models/Item');

module.exports = {
   showCreate: (req, res) => {
      res.render('list/create');
   },
   create: async (req, res) => {
      try {
         const userId = req.user._id;
         const order = await List.countDocuments({ userId });
         const newObj = await List.create({ ...req.body, order, userId });
         console.log('Created: ', newObj);
         res.redirect('/dashboard');
      }
      catch (error) {
         console.error(error);
         res.status(500).json({ message: error.message });
      }
   },
   view: (req, res) => {

   },

};