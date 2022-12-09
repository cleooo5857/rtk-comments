import { axiosInstance } from 'apis';
import { TodoApi } from 'apis/todoApi';
import axios from 'axios';
import useInput from 'hooks/useInput';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { DeleteTodos } from 'reducer/todo';
import styled from 'styled-components';

function Todo({ todo, todoList, setTodoList }) {
  

    const [edit, setEdit] = useState(false);
    const [newTodo, onChangeNewTodo] = useInput(todo.content);
    const dispatch = useDispatch()
    const onChnageEdit = () => {
        setEdit(true);
    };

    const onDeleteTodo = () => {
       
        // try{
            //     const res = await TodoApi.deleteTodo({id});
            //     if (res.status === 200) {
                //         const todoList_d = todoList.filter((todo) => todo.id !== res.data.data);
                //         setTodoList(todoList_d);
                //     }
                // }catch(err){
                    //     console.log(err);
                    // }
        
        const id = todo.id
        console.log(todo);
        dispatch(DeleteTodos(id))
    };
    const onUpdateTodo = async () => {
    

        if (todo.content === newTodo) return setEdit(false);

        
        try{
            const data = {
            content: newTodo,
            flag: todo.flag,
            };

            const id = todo.id;

            const res = await TodoApi.updateTodo({id,data});
            console.log(res);
            if (res.status === 200) {
                const { data } = res.data;
                console.log(data);
                const newTodoList = [...todoList];
                let todo = newTodoList.find((todo) => todo.id === data.id);
                todo.content = data.content;
                setTodoList(newTodoList);
                setEdit(false);
            }
        }catch(err){
            console.log(err);
        }

    };

    const onUpdateFlag = async() => {
     
        try{
            const data = {
                content: todo.content,
                flag: !todo.flag,
            };
            const id = todo.id;

            const res  = await TodoApi.updateTodo({id,data})
                if (res.status === 200) {
                const { data } = res.data;
                const newTodoList = [...todoList];
                let todo = newTodoList.find((todo) => todo.id === data.id);
                todo.flag = data.flag;
                setTodoList(newTodoList);
            }
        }catch(err){
            console.log(err);
        }

    };

    return (
        <S.Wrapper>
            <div onClick={onUpdateFlag}>{todo.flag ? '완료' : '미완료'}</div>
            <div>
                {edit ? (
                    <textarea value={newTodo} onChange={onChangeNewTodo}></textarea>
                ) : (
                    <Link to={`/todo/:${todo.id}`} key={todo.id}>
                            {todo.content}
                    </Link>
                )}
            </div>
            <button onClick={onDeleteTodo}>삭제</button>
            {edit ? (
                <button onClick={onUpdateTodo}>완료</button>
            ) : (
                <button onClick={onChnageEdit}>수정</button>
            )}
        </S.Wrapper>
    );
}
export default Todo;

const Wrapper = styled.div`
    display: flex;
    margin: 8px 0;
`;

const S = {
    Wrapper,
};
