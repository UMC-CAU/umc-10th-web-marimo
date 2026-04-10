import MovieListFetcher from '../components/MovieListFetcher';

const TopRatedMoviesPage = () => {
  return (
    <MovieListFetcher
      endpoint="/discover/movie"
      title="Top Rated Movies"
      description="평점과 투표 수를 기준으로 엄선된 작품들을 확인해 보세요."
      baseParams={{
        include_adult: false,
        include_video: false,
        sort_by: 'vote_average.desc',
        without_genres: '99,10755',
        'vote_count.gte': 200,
      }}
    />
  );
};

export default TopRatedMoviesPage;

