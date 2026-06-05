import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UseCallbackPage from './07-useCallback-Memo/useCallbackPage'

function MovieDetailPage() {
  return <div>영화 상세 페이지</div>
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UseCallbackPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
