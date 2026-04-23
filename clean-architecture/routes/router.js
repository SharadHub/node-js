// importing dependecies
const express = require('express');

// creating router variable that handle urls and redirect them to controller
const router = express.Router();

// importing controllers
const { getNote, createNote } = require('../controllers/controllers');

// routing URLs
router.route('/').get(getNote);
router.route('/:id').get(getNote);

router.route('/').post(createNote);
router.route('/:id').post(createNote);
// router.route('/').get(getNote).post(createNote);

// exporting this routing file
module.exports = router;
