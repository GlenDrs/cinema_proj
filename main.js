let selector = document.getElementById('resultBoard')
let i = 0;
var input = '';

async function apiCall(input) {
  let response = await fetch(`https://www.omdbapi.com/?s=${encodeURI(input)}&apikey=API_KEY`);
  //  let response = await fetch(` http://www.omdbapi.com/?i=tt3896198&apikey=API_KEY`);

  const movies = await response.json();
    if (response.ok) {
    for(element of movies.Search){
      let id = element.imdbID;
      apidCall(id);
    }
  } else {
    const responseError = {
      type: 'Error',
      message: result.message || 'Something went wrong',
      data: result.data || '',
      code: result.code || '',
    };
    const error = new Error();
    error.info = responseError;
    return (error);
  }
}

async function apidCall(id) {
  let response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=API_KEY`); 
  const movie = await response.json();

  if (response.ok) {
    let title = movie.Title;
    let date = movie.Released;
    let posterUrl = movie.Poster;
    let plot = movie.Plot;
    let actors = movie.Actors;

    showMovies(title, date, posterUrl, plot, actors);
  } else {
    const responseError = {
      type: 'Error',
      message: result.message || 'Something went wrong',
      data: result.data || '',
      code: result.code || '',
    };

    const error = new Error();
    error.info = responseError;

    return (error);
  }
}

const showMovies = (title, date, posterUrl, plot, actors) => {
  if(posterUrl == 'N/A'){
    posterUrl = 'https://i.goopics.net/1LYEA.jpg'
  }
    selector.innerHTML += `
        <div class="card" style="width: 18rem;">
          <img class="card-img-top" src="${posterUrl}" alt="Poster">
          <div class="card-body">
            <p class="card-title title">${title}</p>
            <p class="card-text">${date}</p>
            <div class="text-center">
              <input class="btn btn-secondary btn-sm" type="button" value="Read More" onclick="(modal${++i}).classList.add('active')" />
            </div>
          </div>
          <div id="modal${i}" class="lockBg">
            <div class="myModal">
              <p class="title">${title}</p>
              <hr>
              <p>Plot:</p>
              <p>${plot}</p>
              <p>Actors:</p>
              <p>${actors}</p>
              <div class="text-center">
                <input class="btn btn-secondary btn-sm" type="button" value="Close" onclick="(modal${i}).classList.remove('active')" />
              </div>
            </div>
          </div>
        </div>
    `
    obs();
}

function callModal(modalId){
  modalId.classList.add('active');
}

function exitModal(modalId){
  modalId.classList.remove('active');
}

function searchMovie() {
  selector.innerHTML = " ";
  input = document.getElementById("searchBar").value;
  apiCall(input);
}

function obs(){
  let observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if(entry.intersectionRatio > 0.3){
        entry.target.classList.remove('not-visible')
      }
    });

  }, {
    threshold : [0.3]
  })

  let items = document.querySelectorAll('.card')
  items.forEach(function (item) {
    item.classList.add('not-visible')
    observer.observe(item)
  });
}