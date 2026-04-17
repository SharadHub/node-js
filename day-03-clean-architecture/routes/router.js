// importing dependecies
const express = require('express');

// creating router variable that handle urls and redirect them to controller
const router = express.Router();

// importing controllers
const { getNotes, createNotes } = require('../controllers/controllers');

// routing URLs
router.route('/').get(getNotes).post(createNotes);

// exporting this routing file
module.exports = router;
