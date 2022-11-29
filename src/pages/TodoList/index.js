
import { axiosInstance } from 'apis';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from '../../reducer/todo';
import TodoForm from './components/Form/Form';
import Todo from './components/Todo/Todo';

function TodoListpage() {
    //map을 돌리기위해 userlist를 가져옴
    const todoList = useSelector((state)=> state.todo.todos)
    const gettodolist = useSelector((state)=> state.todo.getTodos)
    const dispatch = useDispatch();

    console.log(todoList);
    useEffect(() => {
        dispatch(getTodos())
    }, []);

    if(gettodolist.loading){
        return <div>Loading...</div>
    }

    return (
        <>
            {todoList.map((todo) => (
                <Todo key={todo.id} todo={todo} todoList={todoList} />
            ))}
            <TodoForm todoList={todoList}  />
        </>
    );
}
export default TodoListpage;
