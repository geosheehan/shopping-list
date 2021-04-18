const List = require('../models/List');
// const List = require('../models/Item');

module.exports = {
   getLists: async (req, res) => {
      try {
         const shoppingLists = await List.find();
         // shoppingLists.forEach(list => {
         //    const items = list.itemIds.map(async (id) => await Item.findById(id));
         //    list.items = items;
         // });
         res.render('list.ejs', { shoppingLists });
      }
      catch (err) {
         console.log(err);
      }
   },
   addList: async (req, res) => {

   },
   deleteList: async (req, res) => {

   },

};