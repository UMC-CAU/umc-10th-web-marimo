import { useContext } from 'react';
import { TodoContext } from '../context/todoContext';
import TodoForm from './TodoForm';
import TodoList from './TodoList';

const Todo = () => {
    // Context에서 필요한 데이터와 함수만 꺼내옴
    const context = useContext(TodoContext);
    if (!context) return null;

    const { todos, doneTodos, completeTodo, deleteTodo } = context;
    
    return (
        <div className='todo-container'>
            <h1 className='todo-container__header'>Marimo Todo</h1>
            {/* props를 넘길 필요가 없어짐! */}
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