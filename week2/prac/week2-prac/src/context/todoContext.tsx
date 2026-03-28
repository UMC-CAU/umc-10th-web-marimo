import { createContext, useState } from 'react';
import type {ReactNode} from 'react';
import type { TTodo } from '../types/todo';

// 1. Context에서 관리할 타입 정의
interface TodoContextType {
    todos: TTodo[];
    doneTodos: TTodo[];
    addTodo: (text: string) => void;
    completeTodo: (todo: TTodo) => void;
    deleteTodo: (todo: TTodo) => void;
}

// 2. Context 생성
export const TodoContext = createContext<TodoContextType | null>(null);

// 3. Provider 컴포넌트 생성 (상태와 로직을 품고 있는 껍데기)
export const TodoProvider = ({ children }: { children: ReactNode }) => {
    const [todos, setTodos] = useState<TTodo[]>([]);
    const [doneTodos, setDoneTodos] = useState<TTodo[]>([]);

    const addTodo = (text: string) => {
        const newTodo: TTodo = { id: Date.now(), text };
        setTodos((prevTodos) => [...prevTodos, newTodo]);
    };

    const completeTodo = (todo: TTodo) => {
        setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));
        setDoneTodos((prevDoneTodos) => [...prevDoneTodos, todo]);
    };

    const deleteTodo = (todo: TTodo) => {
        setDoneTodos((prevDoneTodos) => 
            prevDoneTodos.filter((t) => t.id !== todo.id)
        );
    };

    return (
        <TodoContext.Provider value={{ todos, doneTodos, addTodo, completeTodo, deleteTodo }}>
            {children}
        </TodoContext.Provider>
    );
};