const express = require('express');
const router = express.Router();
const listController = require('../controllers/list');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

// @desc    Show all lists
// @route   GET /lists
router.get('/', ensureAuth, listController.getLists);

// // @desc    Show all lists
// // @route   GET /lists
// router.get('/:id', listController.getLists);

// @desc    Add new list
// @route   POST /lists/add
router.post('/add', listController.addList);

// @desc    Delete selected list
// @route   DELETE /lists/delete/:id
router.delete('/delete/:id', listController.deleteList);

module.exports = router;
