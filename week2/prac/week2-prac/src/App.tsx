import './App.css';
import { useState, useEffect} from 'react';

interface Todo{
  id: number;
  text: string;
  done: boolean;
}

function App() {

  // 예시: 투두 데이터가 객체 배열 형태로 State에 들어있다고 가정합니다.
  const [todo, todoAdd] = useState<Todo[]>((() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    }
    return [];
  }));

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todo));
  }, [todo]);

  const [inputText, setInputText] = useState("");

  
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(inputText === "") return;

    const newTodoItem = {
      id: Date.now(),
      text: inputText,
      done: false
    };

    todoAdd([...todo, newTodoItem]);

    setInputText("");

  }

  const toggleDone = (id: number) => {
    const updateTodo = todo.map((item) => {
      if(item.id === id){
        return{...item, done: !item.done};
      }
      return item;
    });
    todoAdd(updateTodo);
  };

  const deleteTodo = (id: number) => {
    const remainTodo = todo.filter((item) => item.id !== id);
    todoAdd(remainTodo);
  };


  return (
    <>
        <div className="todo-container">
            <h1 className="todo-container__header">MARIMO TODO</h1>
            <form id="todo-form" className="todo-container__form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="todo-input"
                    className="todo-container__input"
                    placeholder="할 일을 입력해주세요."
                    required
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                />
                <button type="submit" className="todo-container__button">
                    할일 추가
                </button>
            </form>
            <div className="render-container">
                <div className="render-container__section">
                    <h2 className="render-container__title">할 일</h2>
                    <ul id="todo-list" className="render-container__list">
                      {todo
                      .filter((item) => item.done === false)
                      .map((todo) => (
                        <li key ={todo.id}>
                          <span>{todo.text}</span>
                          <button onClick={() => toggleDone(todo.id)}>완료</button>
                        </li>
                      ))}
                    </ul>
                </div>
                <div className="render-container__section">
                    <h2 className="render-container__title">완료</h2>
                    <ul id="done-list" className="render-container__list">
                      {todo
                        .filter((item) => item.done === true)
                        .map((todo) => (
                          <li key ={todo.id}>
                            <span>{todo.text}</span>
                            <button onClick={() => deleteTodo(todo.id)}>삭제</button>
                          </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </>
  );
}


export default App;


