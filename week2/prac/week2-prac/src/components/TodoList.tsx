import type { TTodo } from '../types/todo';

interface ITodoListProps {
    title: string;
    todos: TTodo[];
    buttonLabel: string;
    buttonColor: string;
    onClick: (todo: TTodo) => void;
}

const TodoList = ({ title, todos, buttonLabel, buttonColor, onClick }: ITodoListProps) => {
    return (
        // 기존 클래스 유지 + 다크모드 섹션 배경색
        <div className='render-container__section dark:bg-[#2a2a2a]'>
            <h2 className='render-container__title dark:text-white'>{title}</h2>
            <ul id='todo-list' className='render-container__list'>
                {todos.map((todo) => (
                    // 기존 클래스 유지 + 다크모드 아이템 배경색 및 테두리
                    <li key={todo.id} className='render-container__item dark:bg-[#333] dark:border-gray-600'>
                        <span className='render-container__item-text dark:text-white'>
                            {todo.text}
                        </span>
                        <button
                            onClick={() => onClick(todo)}
                            style={{ backgroundColor: buttonColor }}
                            className='render-container__item-button'
                        >
                            {buttonLabel}
                        </button>
                    </li>
                ))}
            </ul>                
        </div>
    );
};

export default TodoList;