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

const initializer = () =>
{
  myLinks();
  pressEnter();
  saveMovieToWishlistEvent();
  deleteMovieEvent();
};

module.exports =
{
  initializer,
};
