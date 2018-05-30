const Beer = require('../models/beer')

exports.postBeers = (request, response) => {
    // Create a new instance of the Beer model
    let beer = new Beer()
    // Set the beer properties that came from the POST data
    beer.name = request.body.name
    beer.type = request.body.type
    beer.quanity = request.body.quanity
    // Save the beer and check for errors
    beer.save(error => {
        if (error)
            response.send(error)
        response.json({ message: 'Beer added to the locker!', data: beer })
    })
}

// Create endpoint /api/beers for GET
exports.getBeers = (request, response) => {
    // Use the Beer model to find all the beer
    Beer.find((error, beers) => {
        if (error)
            response.send(error)
        response.json(beers)
    })
}

// Create endpoint /api/beers/:beer_id for GET
exports.getBeer = (request, response) => {
    Beer.findById(request.params.beer_id, (error, beer) => {
        if (error)
            response.send(error)
        response.json(beer)
    })
}

// Create endpoint /api/beers/:beer_id for PUT
exports.putBeer = (request, response) => {
    // Use the Beer model to find a specific beer
    Beer.findById(request.params.beer_id, (error, beer) => {
        if (error)
            response.send(error)
        // Update the existing beer quantity
        beer.quanity = request.body.quanity
        // Save the beer and check for errors
        beer.save(error => {
            if (error)
                response.send(error)
            response.json(beer)
        })
    })
}

// Create endpoint /api/beers/:beer_id for DELETE 
exports.deleteBeer = (request, response) => {
    // Use the Beer model to find a specific beer and remove it
    Beer.findByIdAndRemove(request.params.beer_id, (error) => {
        if (error)
            response.send(error)
        response.json({ message: 'Beer removed from the locker!' })
    })
}