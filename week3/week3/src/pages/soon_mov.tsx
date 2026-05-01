import MovieListFetcher from '../components/MovieListFetcher';

const UpcomingMoviesPage = () => {
  return (
    <MovieListFetcher
      endpoint="/movie/upcoming"
      title="Upcoming Movies"
      description="곧 개봉할 기대작들을 미리 만나보세요."
    />
  );
};

export default UpcomingMoviesPage;

