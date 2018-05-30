const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router = express.Router()
const mongoose =  require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const beerController = require('./controllers/beer')
const userController = require('./controllers/user')
const authController = require('./controllers/auth')

app.use(bodyParser())
app.use(passport.initialize())

// Connect to the beerlocker MongoDB
mongoose.connect('mongodb://localhost:27017/beerlocker')

// Create endpoint handlers for /beers
router.route('/beers')
    .post(authController.isAuthenticated, beerController.postBeers)
    .get(authController.isAuthenticated, beerController.getBeers)

// Create endpoint handlers for /beers/:beer_id
router.route('beers/:beer_id')
    .get(authController.isAuthenticated, beerController.getBeer)
    .put(authController.isAuthenticated, beerController.putBeer)
    .delete(authController.isAuthenticated, beerController.deleteBeer)

// Create endpoint handlers for /users
router.route('/users')
    .get(authController.isAuthenticated, userController.getUsers)
    .post(userController.postUsers)

// Register all our routes with the api
app.use('/api', router)

// Start the server
app.listen(port)


