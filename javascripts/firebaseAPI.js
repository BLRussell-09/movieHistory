let firebaseConfig = {};

const setConfig = (fbConfig) =>
{
  firebaseConfig = fbConfig;
};

const saveMovieToWishList = (newMovie) =>
{
  return new Promise((resolve, reject) =>
  {
    $.ajax(
      {
        method: 'POST',
        url: `${firebaseConfig.databaseURL}/movies.json`,
        data: JSON.stringify(newMovie),
      }).done((uniqueKey) =>
    {
      resolve(uniqueKey);
    }).fail((err) => {
      reject(err);
    });
  });
};

const getAllMovies = () => {
  return new Promise((resolve, reject) => {
    const allMoviesArray = [];
    $.ajax({
      method: 'GET',
      url: `${firebaseConfig.databaseURL}/movies.json`,
    })
      .done((allMoviesObj) => {
        if (allMoviesObj !== null) {
          Object.keys(allMoviesObj).forEach((fbKey) => {
            allMoviesObj[fbKey].id = fbKey;
            allMoviesArray.push(allMoviesObj[fbKey]);
          });
        }
        resolve(allMoviesArray);
      })
      .fail((error) => {
        reject(error);
      });
  });
};

const deleteMovieFromDb = (movieId) =>
{
  return new Promise ((resolve, reject) =>
  {
    $.ajax(
      {
        method: 'DELETE',
        url: `${firebaseConfig.databaseURL}/movies/${movieId}.json`,
      }).done(() =>
    {
      resolve();
    }).fail((err) =>
    {
      reject(err);
    });
  });
};

module.exports = {
  setConfig,
  saveMovieToWishList,
  getAllMovies,
  deleteMovieFromDb,
};
