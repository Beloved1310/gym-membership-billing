
const express = require('express');
const memberController = require('../controllers/membership');
const router = express.Router();

router.post('/member', memberController.createMembership);

module.exports = router;
