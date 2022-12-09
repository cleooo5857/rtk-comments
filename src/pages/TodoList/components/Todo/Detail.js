import { axiosInstance } from 'apis';
import { useEffect,useState } from 'react';
import {  textarea,flexCenter,title,btn } from 'libs/styles/common';
import {  useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { addtodo, addTodos, getDetailTodos, addComments } from 'reducer/todo';
import useInput from 'hooks/useInput';
import styled from 'styled-components';


function CommentList(){
    
    const todoList = useSelector((state)=> state.todo.todos)
    const location = useLocation();
    const [comment, setcomment] = useInput('');
    
    const dispatch = useDispatch()
    const id = location.pathname.slice(7)

    // 백엔드에게 detail 페이지에 보여줄 게시물의 해당 id를 요청하거나,

    useEffect(() => {
        // return 되는 값을 dispatch에 보냄
        dispatch(getDetailTodos(id))
    }, []);


    const onChangeComments = () => {
        console.log(comment);
        dispatch(addComments({title:todoList.content,content : comment}))
    }
   

    const commentList = async () => {
        const res = await axiosInstance.get('/comment');
        console.log(res);
    }

    return(
        <>
                    <s.Title>
                        {todoList.content}
                    </s.Title>
                <s.Wrapper>
                    <s.Textarea value={comment} onChange={setcomment} placeholder='댓글을 입력해주세요'></s.Textarea>
                    <s.Button onClick={onChangeComments}>등록</s.Button>
                </s.Wrapper>
        </>
    )
}
export default CommentList

const Wrapper = styled.div`
${flexCenter}
${title}
justify-content: flex-start;
`;

const Title = styled.div`
${title} 
line-height:initial !important;
font-size: 24px;
margin-bottom: 20px;
font-weight: 500;
margin-top: 50px;
`

const Textarea = styled.textarea`
    ${textarea}
        overflow-x: hidden;
    overflow-y: auto;
    display: block;
    min-height: 17px;
    border: 0;
    font-size: 13px;
    -webkit-appearance: none;
    resize: none;
    box-sizing: border-box;
`;

const Button = styled.button `
${btn}
margin-left:50px;
`

const s = {
    Textarea,
    Wrapper,
    Title,
    Button
}