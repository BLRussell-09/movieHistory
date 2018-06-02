/* eslint camelcase: 0 */

const tmdb = require('./tmdb');
const firebaseAPI = require('./firebaseAPI');
const dom = require('./dom');

const myLinks = () =>
{
  $(document).click(showShit);
};

const showShit = (e) =>
{
  if (e.target.id === 'auth')
  {
    $('#authScreen').removeClass('hidden');
    $('#myMovies').addClass('hidden');
    $('#search').addClass('hidden');
  }
  else if (e.target.id === 'moviesNav')
  {
    $('#myMovies').removeClass('hidden');
    $('#authScreen').addClass('hidden');
    $('#search').addClass('hidden');
    getAllMoviesEvent();
  }
  else if (e.target.id === 'searchMe')
  {
    $('#search').removeClass('hidden');
    $('#myMovies').addClass('hidden');
    $('#authScreen').addClass('hidden');
  }
};

const pressEnter = () =>
{
  $(document).keypress((e) =>
  {
    if (e.key === 'Enter')
    {
      const searchWords = $('#searchBar').val().replace(' ', '%20');
      tmdb.showResults(searchWords);
    }
  });
};

const saveMovieToWishlistEvent = () =>
{
  $(document).on('click', '.addMovieToWishList', (e) =>
  {
    const movieToAddCard = $(e.target).closest('.movie');
    const movieToAdd =
    {
      title: movieToAddCard.find('.movie-title').text(),
      overview: movieToAddCard.find('.movie-overview').text(),
      poster_path: movieToAddCard.find('img').data('poster'),
      rating: 0,
      isWatched: false,
    };
    firebaseAPI.saveMovieToWishList(movieToAdd).then(() =>
    {
      movieToAddCard.remove();
    }).catch((err) =>
    {
      console.error('Error in saving movie', err);
    });
  });
};

const getAllMoviesEvent = () => {
  firebaseAPI.getAllMovies()
    .then((moviesArray) => {
      dom.domString(moviesArray, tmdb.getImageConfig(), 'savedMovies', true);
    })
    .catch((error) => {
      console.error('error in get all movies', error);
    });
};

const getWatchedMoviesEvent = () => {
  firebaseAPI.getWatchedMovies()
    .then((moviesArray) => {
      dom.domString(moviesArray, tmdb.getImageConfig(), 'savedMovies', true);
    })
    .catch((error) => {
      console.error('error in get watched movies', error);
    });
};

const getWishlistMoviesEvent = () => {
  firebaseAPI.getWishlistMovies()
    .then((moviesArray) => {
      dom.domString(moviesArray, tmdb.getImageConfig(), 'savedMovies', true);
    })
    .catch((error) => {
      console.error('error in get wishlist movies', error);
    });
};

const deleteMovieEvent = () =>
{
  $(document).on('click', '.deleteMovie', (e) =>
  {
    const movieToDeleteId = $(e.target).closest('.movie').data('firebaseId');
    firebaseAPI.deleteMovieFromDb(movieToDeleteId).then(() =>
    {
      getAllMoviesEvent();
    }).catch((error) =>
    {
      console.error(error);
    });
  });
};

const updateMovieEvnt = () =>
{
  $(document).on('click', '.updateMovieToWatched', (e) =>
  {
    const movieToUpdateId = $(e.target).closest('.movie').data('firebaseId');
    const movieToUpdateCard = $(e.target).closest('.movie');
    const updatedMovie =
    {
      title: movieToUpdateCard.find('.movie-title').text(),
      overview: movieToUpdateCard.find('.movie-overview').text(),
      poster_path: movieToUpdateCard.find('img').data('poster'),
      rating: 0,
      isWatched: true,
    };
    firebaseAPI.updateMovieToWatched(updatedMovie, movieToUpdateId)
      .then(() =>
      {
        getAllMoviesEvent();
      })
      .catch((err) =>
      {
        console.error(err);
      });
  });
};

const filterEvents = () =>
{
  $('#filterButtons').on('click', (e) =>
  {
    const classList = e.target.classList;
    if (classList.contains('wishlist'))
    {
      // Show only isWatched: false
      getWishlistMoviesEvent();
    }
    else if (classList.contains('watched'))
    {
      // Show only if isWatched: true
      getWatchedMoviesEvent();
    }
    else
    {
      // Show everything
      getAllMoviesEvent();
    }
  });
};

const initializer = () =>
{
  myLinks();
  pressEnter();
  saveMovieToWishlistEvent();
  deleteMovieEvent();
  updateMovieEvnt();
  filterEvents();
};

module.exports =
{
  initializer,
};
