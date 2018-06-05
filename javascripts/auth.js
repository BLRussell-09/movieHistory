const {getAllMoviesEvent,} = require('./events');

const checkLoginStatus = () =>
{
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      $('#moviesNav, #searchMe, #logout').removeClass('hidden');
      $('#myMovies').removeClass('hidden');
      $('#authScreen').addClass('hidden');
      $('#search').addClass('hidden');
      $('#auth').addClass('hidden');
      getAllMoviesEvent();
    } else {
      // No user is signed in.
      $('#myMovies').addClass('hidden');
      $('#search').addClass('hidden');
      $('#moviesNav, #searchMe, #logout').addClass('hidden');
      $('#authScreen').removeClass('hidden');
    }
  });
};

module.exports = {checkLoginStatus,};
