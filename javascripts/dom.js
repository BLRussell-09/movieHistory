const domString = (movArr, config, whereToPrint, myCollectionMode = false) =>
{
  let domString = '';
  movArr.forEach((element, index) =>
  {
    if (index % 3 === 0)
    {
      domString += `<div class="row">`;
    }
    domString += `<div class="col-sm-6 col-md-4">`;
    domString += `<div class="thumbnail movie" data-firebase-id="${element.id}">`;
    if (myCollectionMode)
    {
      domString += `<a class="btn btn-danger deleteMovie">X</a>`;
    }
    domString += `<img data-poster="${element.poster_path}" src="${config.base_url}/w342/${element.poster_path}" alt="Movie Poster">`;
    domString += `<div class="caption">`;
    domString += `<h3 class="movie-title">${element.original_title ? element.original_title : element.title}</h3>`;
    domString += `<p class="movie-overview">${element.overview}</p>`;
    if (!myCollectionMode)
    {
      domString += `<p><a class="btn btn-default addMovieToWishList" role="button">Wishlist</a></p>`;
    }
    else if (myCollectionMode && !element.isWatched)
    {
      domString += `<p><a class="btn btn-primary updateMovieToWatched" role="button">I've Watched It</a></p>`;
    }
    else
    {
      domString += `<p>I'm going to star this</p>`;
    }
    domString += `</div>`;
    domString += `</div>`;
    domString += `</div>`;
    if (index % 3 === 2)
    {
      domString += `</div>`;
    }
  });
  printToDom(whereToPrint, domString);
};

const printToDom = (whereToPrint, domString) =>
{
  $(`#${whereToPrint}`).html(domString);
};

module.exports =
{
  domString,
};
