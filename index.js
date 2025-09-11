const searchBtn = document.getElementById("search-btn")
const searchInput = document.getElementById("search-input")
const resultsArea = document.getElementById("results-area")

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

searchInput.addEventListener('input', async () => {
    const searchResults = await getResults(searchInput.value)
    console.log(Array.isArray(searchResults))
    console.log(searchResults)
    searchResults.forEach(movie => {
        const movieDiv = document.createElement("div")
        movieDiv.innerHTML = `<div>${movie.title}<div><div>${movie.release_date}<div>`
        resultsArea.appendChild(movieDiv)
    })
})

searchBtn.addEventListener('click', (event) => {
    event.preventDefault()

})




