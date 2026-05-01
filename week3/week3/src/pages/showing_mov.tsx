import MovieListFetcher from '../components/MovieListFetcher';

const NowPlayingMoviesPage = () => {
  return (
    <MovieListFetcher
      endpoint="/movie/now_playing"
      title="Now Playing"
      description="현재 극장에서 상영 중인 영화를 빠르게 확인해 보세요."
    />
  );
};

export default NowPlayingMoviesPage;

