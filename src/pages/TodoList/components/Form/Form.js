import { axiosInstance } from 'apis';
import { TodoApi } from 'apis/todoApi';
import useInput from 'hooks/useInput';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodos } from 'reducer/todo';

function TodoForm({ todoList, setTodoList }) {
    const [todo, onChangeTodo, setTodo] = useInput('');
    const dispatch = useDispatch();
    const addTodoState = useSelector((state) => state.todo.addtodo);
    console.log(addTodoState);

    const onClickAddBtn = () => {
      dispatch(addTodos({content:todo}))
      
    };



    useEffect(()=> {
        if(!addTodoState.done) return
        if(addTodoState.done){
            setTodo(''); 
        }
    },[addTodoState.done])

    useEffect(()=>{
        if(!addTodoState.err)return
        if(addTodoState.err){
            alert(addTodoState.err)
        }
    },[addTodoState.err])

    return (
        <>
            <input value={todo} onChange={onChangeTodo} />
            <button onClick={onClickAddBtn}>추가</button>
        </>
    );
}
export default TodoForm;
