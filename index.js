const searchBtn = document.getElementById("search-btn")
const searchInput = document.getElementById("search-input")
const resultsArea = document.getElementById("results-area")
const noResult = document.getElementById("no-result")


async function getResults(query) {
    const search = encodeURIComponent(query)

    try {
        const movieData = await fetch(`http://localhost:3000/movies?q=${search}`)
        const movies = await movieData.json()
        const results = movies.results
        return results
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

async function getSimilar(id) {
    try {
        const similarData = await fetch(`http://localhost:3001/movie/${id}/similar`)
        const similarMovies = await similarData.json()
        const similarResults = similarMovies.results
        console.log(similarResults)
        return similarResults
    } catch (error) {
        console.log(`Error: ${error}`)
    }

}

searchBtn.addEventListener('click', async (event) => {
    event.preventDefault()
    resultsArea.innerHTML = ""
    noResult.innerHTML = ""
    const searchResults = await getResults(searchInput.value)
    if (searchResults.length === 0) {
        const message = document.createElement("div")
        message.innerHTML = "<h2>Hmm...couldn't find that title. Try another search</h2>"
        noResult.appendChild(message)
    }
    searchResults.forEach(movie => {
        let overview
        const movieDiv = document.createElement("div")
        if (movie.overview.length > 187) {
            overview = movie.overview.substring(0, 188) + "..."
        } else {
            overview = movie.overview
        }
        movieDiv.innerHTML = `<div><img src="https://image.tmdb.org/t/p/w154/${movie.poster_path}"></div><div>${movie.title}<div><div>${movie.release_date}<div><div>${overview}</div><h2 style="display: block; font-size: 30px">Show Similar Movies</h2>`
        movieDiv.classList.add('movieCard')
        movieDiv.addEventListener('click', async () => {
            resultsArea.innerHTML = ""
            const similarMovieResults = await getSimilar(movie.id)
            if (similarMovieResults.length === 0) {
                const message = document.createElement("div")
                message.innerHTML = "<h2>Looks like this title is one of a kind...we couldn't find any similar movies for ya</h2>"
                noResult.appendChild(message)

            }
            similarMovieResults.forEach(simMovie => {
                const simMovieCard = document.createElement("div")
                if (simMovie.overview.length > 187) {
                    overview = simMovie.overview.substring(0, 188) + "..."
                } else {
                    overview = simMovie.overview
                }
                simMovieCard.innerHTML = `<div><img src="https://image.tmdb.org/t/p/w154/${simMovie.poster_path}"></div><div>${simMovie.title}</div><div>${simMovie.release_date}</div><div>${overview}</div>`
                simMovieCard.classList.add('similarCard')
                resultsArea.appendChild(simMovieCard)
            })


        })
        resultsArea.appendChild(movieDiv)
    })
})






