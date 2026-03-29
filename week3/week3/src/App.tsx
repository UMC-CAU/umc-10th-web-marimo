import './App.css'
import { Link, Routes} from './Router';
import { Route } from './Route';

const MarimoPage = () => <h1>Marimo Page</h1>;
const AramPage = () => <h1>Aram Page</h1>;
const PePage = () => <h1>Pe Page</h1>;
const NotFoundPage = () => <h1>Not Found Page</h1>;

const Header = () => {
  return (
    <nav style={{display: 'flex', gap: '10px'}}>
      <Link to="/marimo">Marimo</Link>
      <Link to="/aram">Aram</Link>
      <Link to="/pe">Pe</Link>
      <Link to="/not-found">Not Found</Link>
    </nav>
  );
};

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/marimo" component={MarimoPage} />
        <Route path="/aram" component={AramPage} />
        <Route path="/pe" component={PePage} />
        <Route path="*" component={NotFoundPage} />
      </Routes>
    </>
  ); 
};

export default App
