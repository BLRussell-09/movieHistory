const domString = (movArr, config) =>
{
  let domString = '';
  movArr.forEach(element =>
  {
    domString += `<div class="col-sm-6 col-md-4">`;
    domString += `<div class="thumbnail">`;
    domString += `<img src="${config.base_url}/w342/${element.poster_path}" alt="Movie Poster">`;
    domString += `<div class="caption">`;
    domString += `<h3>${element.original_title}</h3>`;
    domString += `<p>${element.overview}</p>`;
    domString += `<p><a href="#" class="btn btn-primary" role="button">Review</a> <a href="#" class="btn btn-default" role="button">Wishlist</a></p>`;
    domString += `</div>`;
    domString += `</div>`;
    domString += `</div>`;
    domString += `</div>`;
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
