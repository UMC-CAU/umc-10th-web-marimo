import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import type { Credits, MovieDetails } from '../types/movie-detail';
import { useCustomFetch } from '../hooks/useCustomFetch';

const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();

  const isValidMovieId = Boolean(movieId);

  const {
    data: movie,
    loading: movieLoading,
    error: movieError,
  } = useCustomFetch<MovieDetails>(`/movie/${movieId}`, {
    params: {
      language: 'ko-KR',
    },
    enabled: isValidMovieId,
  });

  const {
    data: credits,
    loading: creditsLoading,
    error: creditsError,
  } = useCustomFetch<Credits>(`/movie/${movieId}/credits`, {
    params: {
      language: 'ko-KR',
    },
    enabled: isValidMovieId,
  });

  const loading = movieLoading || creditsLoading;
  const error = !isValidMovieId
    ? '유효하지 않은 영화 ID입니다.'
    : movieError || creditsError;

  const directorNames = useMemo(() => {
    if (!credits) return [];
    return credits.crew
      .filter((member) => member.job === 'Director')
      .map((member) => member.name);
  }, [credits]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-100">
        <div className="w-12 h-12 rounded-full border-4 border-white/30 border-t-cyan-300 animate-spin" />
        <p className="mt-4 text-base md:text-lg font-semibold">영화 상세 정보를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6">
        <div className="max-w-lg rounded-2xl border border-rose-400/40 bg-rose-500/10 p-6 text-center">
          <p className="text-rose-100 font-semibold leading-7">
            {error}
            <br />
            새로고침하거나 잠시 후 다시 시도해 주세요.
          </p>
        </div>
      </div>
    );
  }

  if (!movie || !credits) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6">
        <p className="text-slate-100 font-semibold text-center">영화 정보를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(160deg,#020617_0%,#0f172a_40%,#1e293b_100%)] text-white p-5 md:p-10">
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[320px,1fr] gap-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-6 shadow-2xl overflow-hidden">
        {movie.backdrop_path && (
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <img
              src={`${imageBaseUrl}${movie.backdrop_path}`}
              alt="backdrop"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <img
          src={`${imageBaseUrl}${movie.poster_path}`}
          alt={movie.title}
          className="relative z-10 w-full rounded-2xl shadow-2xl object-cover"
        />

        <div className="relative z-10 space-y-5">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{movie.title}</h1>

          <div className="flex flex-wrap gap-3 text-sm">
            <span className="px-3 py-1 rounded-full bg-amber-400 text-black font-bold">
              평점 {movie.vote_average.toFixed(1)}
            </span>
            <span className="px-3 py-1 rounded-full bg-cyan-500/80">개봉일 {movie.release_date}</span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/80">상영시간 {movie.runtime}분</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {movie.genres.map((genre) => (
              <span key={genre.id} className="px-2 py-1 text-xs rounded-md bg-white/20">
                {genre.name}
              </span>
            ))}
          </div>

          <p className="leading-7 text-slate-100/90 whitespace-pre-line">{movie.overview}</p>

          <div>
            <h2 className="text-xl font-bold mb-2">감독</h2>
            <p className="text-slate-200">{directorNames.length > 0 ? directorNames.join(', ') : '정보 없음'}</p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4">주요 출연진</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {credits.cast.slice(0, 10).map((member) => (
            <li key={member.id} className="bg-white/10 border border-white/15 rounded-xl p-3 backdrop-blur-sm hover:bg-white/15 transition-colors">
              <img
                src={
                  member.profile_path
                    ? `${imageBaseUrl}${member.profile_path}`
                    : 'https://via.placeholder.com/300x450?text=No+Image'
                }
                alt={member.name}
                className="w-full aspect-[2/3] object-cover rounded-md mb-2"
              />
              <p className="font-semibold text-sm line-clamp-1">{member.name}</p>
              <p className="text-xs text-slate-300 line-clamp-1">{member.character}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default MovieDetailPage;
