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
  else if (e.target.id === 'movies')
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

module.exports =
{
  myLinks,
};
