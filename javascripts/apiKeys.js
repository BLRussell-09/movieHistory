const tmdb = require('./tmdb');
const firebaseAPI = require('./firebaseAPI');
const {checkLoginStatus,} = require('./auth');

const apiKeys = () =>
{
  return new Promise((resolve, reject) =>
  {
    $.ajax('./db/apiKeys.json').done((data) =>
    {
      resolve(data.apiKeys);
    }).fail((err) =>
    {
      reject(err);
    });
  });
};

const retrieveKeys = () =>
{
  apiKeys().then((results) =>
  {
    tmdb.setKey(results.tmdb.apiKey);
    firebaseAPI.setConfig(results.firebase);
    firebase.initializeApp(results.firebase);
    checkLoginStatus();
  }).catch((err) =>
  {
    console.error('No keys', err);
  });
};

module.exports =
{
  retrieveKeys,
};
