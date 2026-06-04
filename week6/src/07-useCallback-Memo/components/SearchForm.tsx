import { memo, type FormEvent } from 'react';

interface SearchFormProps {
  query: string;
  includeAdult: boolean;
  language: string;
  onQueryChange: (value: string) => void;
  onAdultChange: (value: boolean) => void;
  onLanguageChange: (value: string) => void;
  onSubmit: () => void;
}

// memo: movies 상태 변경 시 SearchForm이 불필요하게 리렌더링되는 것을 방지
const SearchForm = memo(function SearchForm({
  query,
  includeAdult,
  language,
  onQueryChange,
  onAdultChange,
  onLanguageChange,
  onSubmit,
}: SearchFormProps) {
  console.log('[SearchForm] 렌더링');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-row">
        <input
          type="text"
          className="search-input"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="영화 제목을 입력하세요"
        />
        <button type="submit" className="search-btn">
          검색
        </button>
      </div>
      <div className="search-options">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={includeAdult}
            onChange={(e) => onAdultChange(e.target.checked)}
          />
          성인 콘텐츠 포함
        </label>
        <select
          className="language-select"
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
        >
          <option value="ko-KR">한국어</option>
          <option value="en-US">영어</option>
          <option value="ja-JP">일본어</option>
        </select>
      </div>
    </form>
  );
});

export default SearchForm;
