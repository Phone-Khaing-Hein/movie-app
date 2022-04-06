let API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=5f9ead882212148c022f29e19bedbb98&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?&api_key=5f9ead882212148c022f29e19bedbb98&query="'

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const next = document.getElementById('next');
const prev = document.getElementById('prev');



// get initial movie
getMovie(API_URL)

async function getMovie(url){
    const response = await fetch(url)
    const data = await response.json()

    showMovie(data.results)
}

function showMovie(movies){
    main.innerHTML = '';

    movies.forEach((movie) => {
        const {title,poster_path,vote_average,overview} = movie;

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
            
        `;

        main.appendChild(movieEl);

    });
}

function getClassByRate(vote){
    if(vote >= 8){
        return 'green';
    }else if(vote >= 5){
        return 'orange';
    }else{
        return 'red';
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    const searchTerm =search.value;

    if(searchTerm && searchTerm !== ''){
        getMovie(SEARCH_API + searchTerm);

        search.value = '';
    }else{
        window.location.reload();
    }
})