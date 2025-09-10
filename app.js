import dotenv from 'dotenv' //this module allows me to hide my authentication token in a file that will not be visible to the client
dotenv.config();

import express from 'express'
const app = express();

import cors from 'cors'


app.use(cors())
const accessToken = process.env.AUTH_TOKEN


app.listen(3000, () => {
    console.log("Server running on port 3000")
})


app.get('/movies', async (req, res) => {
    try {
        const searchQuery = req.query.q
        const url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        }
        const response = await fetch(url, options);
        const data = await response.json()
        const movies = res.json(data.results)
        console.log(movies)
        return JSON.stringify(movies)
    } catch (error) {
        console.log(`Error fetching data: ${error}`)
    }
})
