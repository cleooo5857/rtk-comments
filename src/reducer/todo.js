import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TodoApi } from 'apis/todoApi';
import { CommentApi } from 'apis/comment';
import { reducerUtils } from '../utils/reducerUtils';
// todo/addTodo 타입명 key값이라 생각하면됨
// 비동기 통신을 하기위한 함수, return값에는 비동기 통신의 성공한 data.data가 담겨있다.
/* 매개변수 todo(input에담긴 value)를 받아 백엔드한테 전달 요청성공 후 백엔드에서 저장된 값을
    전달받음 결국 return 사용자가 input에 담은 value값이 되겠다
*/
export const addTodos = createAsyncThunk('todo/addTodo', async (todo) => {
    try {
        const response = await TodoApi.createTodo(todo);
        return response.data.data
    } catch (err) {
        return err;
    }
});

export const getTodos = createAsyncThunk('todo/getTodo', async () => {
    try {
        const response = await TodoApi.getTodos()
        return  response.data.data
    } catch (err) {
    }
});

export const getDetailTodos = createAsyncThunk('todo/getDetailTodo', async (id) => {
    try {
        const response = await TodoApi.getdetailTodo({id})
        return response.data.data
    } catch (err) {
        console.log(err);
    }
});



export const DeleteTodos = createAsyncThunk('todo/DeleteTodo', async (id) => {
    try{
        console.log(id);
        const response = await TodoApi.deleteTodo({id})
        return response.data.data
    }catch(err){
        console.log(err);
    }
})

export const addComments = createAsyncThunk('todo/addComment', async (title,data) => {
    try {
        const response = await CommentApi.createComment(title,data)
        console.log(response);
        return response.data.data
    } catch (err) {
        console.log(err);
    }
});

const initialState = {
    todos: [

        
    ],
    addtodo: {
        loading: false,
        done: false,
        err: null,
    },
    getTodos: {
        loading: false,
        done: false,
        err: null,
    },
    deleteTodos: {
        loading: false,
        done: false,
        err: null,
    },
    getDetailTodos: {
        loading: false,
        done: false,
        err: null,
    },
    addComments: {
        loading: false,
        done: false,
        err: null,
    },
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    // 주의 전역상태를 활용한다는 것은 최적화 = 최적화는 비용
    // 적절하게 전역 상태를 사용해야할 때 사용해야한다
    // 전역 상태가 랜더링되면 그것을 참조하고 있는 모든 컴포넌트 랜더링 => 랜더링 최적화 x
    extraReducers: (builder) => {
        builder.addCase(addTodos.pending, (state) => {
            reducerUtils.loading(state.addtodo)
        });
        // action값에는 addTodos return 값이 들어와있다
        builder.addCase(addTodos.fulfilled, (state,action) => {
            reducerUtils.success(state.addtodo)
            console.log(action);
            state.todos.unshift(action.payload)
        });

        builder.addCase(addTodos.rejected, (state, action) => {
            reducerUtils.err(state.addtodo,action.payload)
        });

        // todolist읽어오기
        builder.addCase(getTodos.pending, (state) => {
            state.getTodos.loading = true;
            state.getTodos.done = false;
            state.getTodos.err = null;
        });

        builder.addCase(getTodos.fulfilled, (state,action) => {
            state.getTodos.loading = false;
            state.getTodos.done = true;
            state.todos = action.payload
        });

        builder.addCase(getTodos.rejected, (state, action) => {
            state.getTodos.loading = false;
            state.getTodos.done = false;
            state.getTodos.err = action.payload;
        });

        // 상세페이지 
        builder.addCase(getDetailTodos.pending, (state) => {
            reducerUtils.loading(state.getDetailTodos)
        });
        builder.addCase(getDetailTodos.fulfilled, (state,action) => {
            reducerUtils.success(state.getDetailTodos)
            state.todos = action.payload
            
        });

        builder.addCase(getDetailTodos.rejected, (state, action) => {
            reducerUtils.err(state.getDetailTodos,action.payload)
        });

        //삭제
        builder.addCase(DeleteTodos.pending, (state) => {
            reducerUtils.loading(state.deleteTodos)
        });

        builder.addCase(DeleteTodos.fulfilled, (state,action) => {
            reducerUtils.loading(state.deleteTodos)
            const todoList_d = state.todos.filter((todo) => todo.id !== action.payload);
            state.todos = todoList_d
        });

        builder.addCase(DeleteTodos.rejected, (state, action) => {
            reducerUtils.err(state.deleteTodos, action.payload)
        });


        // 댓글
        builder.addCase(addComments.pending, (state) => {
            reducerUtils.loading(state.addComments)
        });

        builder.addCase(addComments.fulfilled, (state,action) => {
            reducerUtils.success(state.addComments)
            // state.todos.unshift(action.payload)
        });

        builder.addCase(addComments.rejected, (state, action) => {
            reducerUtils.err(state.addComments, action.payload)
        });
    },
});

export const { addtodo, removetodo, updatetodo } = todoSlice.actions;

