const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router = express.Router()

router.get('/', (request, response) => {
    response.json({ message: 'You are running dangerously low on beer!' })
})

// Register all our routes with the api
app.use('/api', router)

// Start the server
app.listen(port)
console.log(`Insert beer on port ${port}`)