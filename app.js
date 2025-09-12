import dotenv from 'dotenv' //this module allows me to hide my authentication token in a file that will not be visible to the client
dotenv.config(); //loads envorionment variables into process.env and makes them available for use

import express from 'express'

// creating two different apps to handle two servers
const app = express();
const app2 = express();

//allows me 
//"Cross Origin Resource Sharing" - changes security configurations which allows me to make requests to tmdb 
import cors from 'cors'
app.use(cors())
app2.use(cors())

//setting the ports where servers will run
const PORT = process.env.PORT || 3000
const PORT2 = process.env.PORT || 3001

//storing the api authentication token in a variable for future use
const accessToken = process.env.AUTH_TOKEN

//setting the route for the request
app.get('/movies', async (req, res) => { //targeting the movies param of the url
    try {
        const searchQuery = req.query.q // pulling the query segment of the url and storing it
        const url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`; //add query to url
        const options = {  //customizing the configuration of the http request
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        }
        const response = await fetch(url, options); //waiting for the promised response to be resolved and then storing it
        const data = await response.json(); //parses JSON
        res.json(data); //sends json data to the client/ makes it available
    } catch (error) {
        console.log(`Error fetching data: ${error}`)
    }
})


//uses the same structure as the one above
app2.get('/movie/:movieId/similar', async (req, res) => { //":movieId" is a placeholder for the id that will go in that spot
    try {
        const Id = req.params.movieId
        const url = `https://api.themoviedb.org/3/movie/${Id}/similar?language=en-US&page=1`

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${accessToken}`
            }

        }
        const response = await fetch(url, options);
        const data = await response.json();
        res.json(data)
    } catch (error) {
        console.log(`Error fetching data: ${error}`)
    }
})


//creating two server instances and listening for requests
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app2.listen(PORT2, () => {
    console.log(`Server running on port ${PORT2}`)
})
