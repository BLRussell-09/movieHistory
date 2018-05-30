const domString = (movArr, config) =>
{
  let domString = '';
  movArr.forEach((element, index) =>
  {
    if (index % 3 === 0)
    {
      domString += `<div class="row">`;
    }
    domString += `<div class="col-sm-6 col-md-4">`;
    domString += `<div class="thumbnail movie">`;
    domString += `<img data-poster="${element.poster_path}" src="${config.base_url}/w342/${element.poster_path}" alt="Movie Poster">`;
    domString += `<div class="caption">`;
    domString += `<h3 class="movie-title">${element.original_title}</h3>`;
    domString += `<p class="movie-overview">${element.overview}</p>`;
    domString += `<p><a href="#" class="btn btn-primary" role="button">Review</a> <a class="btn btn-default addMovieToWishList" role="button">Wishlist</a></p>`;
    domString += `</div>`;
    domString += `</div>`;
    domString += `</div>`;
    if (index % 3 === 2)
    {
      domString += `</div>`;
    }
  });
  printToDom(domString);
};

const printToDom = (domString) =>
{
  $('#movies').html(domString);
};

module.exports =
{
  domString,
};
