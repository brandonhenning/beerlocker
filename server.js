const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router = express.Router()
const mongoose =  require('mongoose')
const bodyParser = require('body-parser')
const Beer = require('./models/beer')

app.use(bodyParser())

// Connect to the beerlocker MongoDB
mongoose.connect('mongodb://localhost:27017/beerlocker')

// Register all our routes with the api
app.use('/api', router)

// Start the server
app.listen(port)
console.log(`Insert beer on port ${port}`)

router.get('/', (request, response) => {
    response.json({ message: 'You are running dangerously low on beer!' })
})

// Create a new route with the prefix /beers
const beersRoute = router.route('/beers')

// Create endpoint for api/beers for POST
beersRoute.post((request, response) => {
    // Create a new instance of the Beer model
    let beer = new Beer()

    beer.name = request.body.name
    beer.type = request.body.type
    beer.quantity = request.body.quantity

    // Save the beer and check for errors
    beer.save(error => {
        if (error)
            response.send(error)
        response.json({ message: 'Beer added to the locker!', data: beer })
    })
})

// Create endpoint for api/beers for GET
beersRoute.get((request, response) => {
    // Use the Beer model to find all the beer
    Beer.find((error, beers) => {
        if (error)
            response.send(error)
        response.json(beers)
    })
})

// Create a new route to search for beer by id
const beerRoute = router.route('/beers/:beer_id')

// Create endpoint /api/beers/:beer_id for GET
beerRoute.get((request, response) => {
    // Use the Beer model to find a specific beer
    Beer.findById(request.params.beer_id, (error, beer) => {
        if (error)
            response.send(error)
        response.json(beer)
    })
})

// Create endpoint /api/beers/:beer_id for PUT
beerRoute.put((request, response) => {
    // Use the Beer model to find a specific beer
    Beer.findById(request.params.beer_id, (error, beer) => {
        if (error)
            response.send(error)
        // Update the beer quantity
        beer.quantity = request.body.quantity
        // Save the beer and check for errors
        beer.save(error => {
            if (error)
                response.send(error)
            response.json(beer)
        })
    })
})

// Create endpoint /api/beers/:beer_id for DELETE
beerRoute.delete((request, response) => {
    // Use the Beer model to find a specific beer and remove it
    Beer.findByIdAndRemove(request.params.beer_id, error => {
        if (error)
            response.send(error)
        response.json({ message: 'Beer removed from the locker!' })
    })
})



