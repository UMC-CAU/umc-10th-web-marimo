import { useState, useContext } from 'react';
import { TodoContext } from '../context/todoContext';

// 부모로부터 props를 받을 필요가 없음
const TodoForm = () => {
    const [input, setInput] = useState<string>('');
    const context = useContext(TodoContext);

    if (!context) return null; // 타입스크립트 에러 방지
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
                className='todo-container__input'
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