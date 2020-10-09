const express = require('express');
const router = express.Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to customer api crafted with love!',
    });
});
// Import contact controller
var customerController = require('./controller/customerController');
// Contact routes
router.route('/customers')
    .get(customerController.index);
router.route('/customer/:customer_id')
    .get(customerController.view)
    .patch(customerController.update)
    .put(customerController.update)
    .delete(customerController.delete);
router.route('/add')
    .post(customerController.new);

// Export API routes
module.exports = router;