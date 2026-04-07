import './App.css';
import Todo from './components/Todo';
import { TodoProvider } from './context/todoContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <TodoProvider>
        <div className="min-h-screen dark:bg-[#121212] transition-colors duration-200">
          <Todo />
        </div>
      </TodoProvider>
    </ThemeProvider>
  );
}

export default App;