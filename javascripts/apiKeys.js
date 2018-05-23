const tmdb = require('./tmdb');

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
    tmdb.setKey(results.tmdb.apiKeys);
  }).catch((err) =>
  {
    console.error('No keys', err);
  });
};

module.exports =
{
  retrieveKeys,
};
