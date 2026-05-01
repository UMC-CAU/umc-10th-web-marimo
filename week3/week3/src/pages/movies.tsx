import MovieListFetcher from '../components/MovieListFetcher';

const MoviesPage = () => {
  return (
    <MovieListFetcher
      endpoint="/movie/popular"
      title="Popular Movies"
      description="지금 가장 많은 사랑을 받고 있는 작품들을 확인해 보세요."
    />
  );
};

export default MoviesPage;

