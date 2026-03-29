import { useContext } from 'react';
import { TodoContext } from '../context/todoContext';
import { ThemeContext } from '../context/ThemeContext';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

const Todo = () => {
    const todoContext = useContext(TodoContext);
    const themeContext = useContext(ThemeContext);

    if (!todoContext || !themeContext) return null;

    const { todos, doneTodos, completeTodo, deleteTodo } = todoContext;
    const { isDarkMode, toggleDarkMode } = themeContext;
    
    return (
        <div className='todo-container dark:bg-[#1e1e1e]'>
            {/* 레이아웃을 해치지 않는 선에서 토글 버튼 추가 */}
            <button 
                onClick={toggleDarkMode}
                style={{ marginBottom: '10px', padding: '5px 10px', cursor: 'pointer' }}
                className="dark:text-white dark:bg-gray-700"
            >
                {isDarkMode ? '☀️ 라이트 모드' : '🌙 다크 모드'}
            </button>

            <h1 className='todo-container__header dark:text-white'>Marimo Todo</h1>
            <TodoForm />
            
            <div className='render-container'>
                <TodoList 
                    title='할 일'
                    todos={todos}
                    buttonLabel='완료'
                    buttonColor='#28a745'
                    onClick={completeTodo}
                />
                <TodoList 
                    title='완료'
                    todos={doneTodos}
                    buttonLabel='삭제'
                    buttonColor='#dc3545'
                    onClick={deleteTodo}
                />
            </div>
        </div>
    );
};

export default Todo;