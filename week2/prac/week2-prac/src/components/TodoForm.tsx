import { useState, useContext } from 'react';
import { TodoContext } from '../context/todoContext';

const TodoForm = () => {
    const [input, setInput] = useState<string>('');
    const context = useContext(TodoContext);

    if (!context) return null;
    const { addTodo } = context;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const text = input.trim();
        if (text) {
            addTodo(text);
            setInput('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className='todo-container__form'>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type='text'
                // 기존 클래스 유지 + 다크모드 색상 추가
                className='todo-container__input dark:bg-gray-700 dark:text-white dark:border-gray-600'
                placeholder='할 일 입력'
                required
            />
            <button type='submit' className='todo-container__button'>
                할 일 추가
            </button>
        </form>
    );
};

export default TodoForm;