const searchBtn = document.getElementById("search-btn")
const searchInput = document.getElementById("search-input")

async function getResults(query) {
    const search = encodeURIComponent(query)

    try {
        const movieData = await fetch(`http://localhost:3000/movies?q=${search}`)
        const movieJSON = await movieData.json()
        console.log(movieJSON)
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

searchBtn.addEventListener('click', (e) => {
    e.preventDefault()

})

getResults("Jack Reacher")

