
import express from 'express'

// creating two different apps to handle two servers
export const app = express();
export const app2 = express();

//allows me 
//"Cross Origin Resource Sharing" - changes security configurations which allows me to make requests to tmdb 
import cors from 'cors'
app.use(cors())
app2.use(cors())

//setting the ports where servers will run
const PORT = process.env.PORT || 3000


//storing the api authentication token in a variable for future use
const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYWJhNDI4ZDhlM2I4ZjU4NzgxMjdlMTVkMTMyZTljMCIsIm5iZiI6MTc1NzQzMzMzMy41NDQ5OTk4LCJzdWIiOiI2OGMwNGRmNTY0ZDI3ODc4OWIxZjVhOTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1TWIu5uuFI21JK8ut--UogQGmmQlImswus54yi8UOzA'

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

const router = express.Router() //setting up a route for similar movies in addition to the route for search by title

router.get('/movie/:movieId/similar', async (req, res) => { //":movieId" is a placeholder for the id that will go in that spot
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

app.use(router)

//creating a server instance and listening for requests
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`)
})


