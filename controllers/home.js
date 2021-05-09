const List = require('../models/List');

module.exports = {
   landing: (req, res) => {
      res.render('index');
   },
   dashboard: async (req, res) => {
      const lists = await List.find({ userId: req.user._id });
      res.render('dashboard', { user: req.user, lists });
   }
}
