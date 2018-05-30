const User = require('../models/user')

// Create endpoint /api/users for POST
exports.postUsers = (request, response) => {
    let user = new User({
        username: request.body.username,
        password: request.body.password
    })
    user.save(error => {
        if (error) 
            return response.send(error)
        response.json({ message: 'New beer drinker added to the locker room!' })
    })
}

// Create endpoint /api/users for GET
exports.getUsers = (request, response) => {
    User.find((error, users) => {
        if (error)
            return response.send(error)
        response.json(users)
    })
}