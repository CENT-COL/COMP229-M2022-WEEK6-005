let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET About Us page. */
router.get('/about', indexController.displayAboutPage);

/* GET Products page. */
router.get('/products', indexController.displayProductsPage);

/* GET Services page. */
router.get('/services', indexController.displayServicesPage);

/* GET Contact Us page. */
router.get('/contact', indexController.displayContactPage);

router.get('/login', indexController.displayLoginPage);
router.post('/login', indexController.processLoginPage);

router.get('/register', indexController.displayRegisterPage);
router.post('/register', indexController.processRegisterPage)

router.get('/logout', indexController.performLogout);


module.exports = router;
