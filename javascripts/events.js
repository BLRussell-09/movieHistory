const tmdb = require('./tmdb');

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
      tmdb.showResults('cow');
    }
  });
};

const initializer = () =>
{
  myLinks();
  pressEnter();
};

module.exports =
{
  initializer,
};
