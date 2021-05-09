const express = require('express');
const router = express.Router();
const listController = require('../controllers/list');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

// @desc    Show create list
// @route   GET /list
router.get('/', /*ensureAuth,*/ listController.showCreate);

// @desc    Process create list
// @route   POST /list
router.post('/', /*ensureAuth,*/ listController.create);

// @desc    View specific list
// @route   GET /list/:id
// router.get('/:id', listController.view);

// @desc    Show edit list
// @route   GET /list/edit/:id
// router.get('/edit/:id', listController.showEdit);

// @desc    Process edit list
// @route   PUT /list/:id
// router.put('/:id', listController.view);

// // @desc    Show all lists
// // @route   GET /lists
// router.get('/:id', listController.getLists);

// @desc    Delete selected list
// @route   DELETE /lists/delete/:id
router.delete('/delete/:id', listController.deleteList);

module.exports = router;
