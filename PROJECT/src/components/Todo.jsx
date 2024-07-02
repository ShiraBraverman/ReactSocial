import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Todo({ todo, todos, searchCriteria, setTodos, indexUpdateTask, setIndexUpdateTask }) {
    const navigate = useNavigate();
    const [updateTask, setUpdateTask] = useState('');

    const deleteTodo = (id) => {
        fetch(`http://localhost:3000/todos/${id}`, {
            method: 'DELETE',
        })
            .then(() => {
                const updatedTodos = todos.filter((todo) => todo.id !== id);
                setTodos(updatedTodos);
                setUpdateTask('');
                navigate(`../users/${todo.userId}/todos`);
            })
    };

    const updateDB = (todo) => {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
        };

        fetch(`http://localhost:3000/todos/${todo.id}`, requestOptions)
            .then(res => res.json())
            .then(data => {
                setTodos(todos.map(currentTodo => data.id == currentTodo.id ? data : currentTodo))
                setIndexUpdateTask(-1);
                setUpdateTask('');
                navigate(`../users/${todo.userId}/todos`);
            })
    };

    const updateTodoStatus = (todo) => {
        updateDB({ ...todo, completed: !todo.completed })
    };

    const UpdateTodoTitle = (todo) => {
        if (updateTask.length > 0) {
            updateDB({ ...todo, title: updateTask })
        }
        else {
            setIndexUpdateTask(-1);
            navigate(`../users/${todo.userId}/todos`);
        }
    };

    const handleTodoUpdate = () => {
        if (todo.id == indexUpdateTask) {
            setIndexUpdateTask(-1);
            navigate(`../users/${todo.userId}/todos`);
        }
        else {
            setIndexUpdateTask(todo.id);
            navigate(`../users/${todo.userId}/todos/${todo.id}`);
        }
    };

    const highlightSearchTerm = (title) => {
        const index = title.toLowerCase().indexOf(searchCriteria.toLowerCase());
        if (index !== -1) {
            return (
                <span>
                    {title.substring(0, index)}
                    <strong className="searchTitle">{title.substring(index, index + searchCriteria.length)}</strong>
                    {title.substring(index + searchCriteria.length)}
                </span>
            );
        }
        return title;
    };

    return (
        <div>
            {(todo.title.toLowerCase().includes(searchCriteria) || todo.id.toString().includes(searchCriteria) || todo.completed.toString().includes(searchCriteria)) &&
                <div id="todoList">
                    <span>{todo.id}. </span>
                    <input type="checkbox" checked={todo.completed} onChange={() => updateTodoStatus(todo)} />
                    <span>{highlightSearchTerm(todo.title)} </span>
                    <button onClick={() => deleteTodo(todo.id)}>🗑️</button>
                    <button onClick={() => handleTodoUpdate()}>✏️</button>
                    {indexUpdateTask == todo.id && (
                        <div>
                            <input type="text" value={updateTask} onChange={(e) => setUpdateTask(e.target.value)} placeholder="Enter title of task" className='inputItem' />
                            <button onClick={() => UpdateTodoTitle(todo)}>Update Task</button>
                        </div>
                    )}
                </div>}
        </div >
    )
}

export default Todo