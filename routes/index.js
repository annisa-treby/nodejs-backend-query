const express = require('express');
const router = express.Router();

const categoryRoutes = require('./category.route');
const noRoute = require('./no.route');
const logRoute = require('./log.route');

router.use(logRoute);
router.use('/category', categoryRoutes);
router.use(noRoute);

module.exports = router;
