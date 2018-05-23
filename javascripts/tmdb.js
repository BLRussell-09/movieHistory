/* eslint camelcase: 0 */

const dom = require('./dom');

let tmdbKey = '';

const setKey = (key) =>
{
  tmdbKey = key;
};

const searchTMDB = (txt) =>
{
  return new Promise((resolve, reject) =>
  {
    $.ajax(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&language=en-US&query=${txt}&page=1&include_adult=false`).done((result) =>
    {
      resolve(result);
    }).fail((err) =>
    {
      reject(err);
    });
  });
};

const showResults = (searchText) =>
{
  searchTMDB(searchText).then((result) =>
  {
    dom.domString(result.results);
  }).catch((err) =>
  {
    console.error('search error', err);
  });
};

module.exports =
{
  showResults,
  setKey,
};
