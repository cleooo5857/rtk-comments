import { axiosInstance } from "apis";

const path = '/todo';

export const TodoApi = {
    createTodo: (data) => {
        //http://localhost:9000
        return axiosInstance.post(path, data);
    },
    getdetailTodo:({id}) =>{
        //http://localhost:9000/todo
        return axiosInstance.get(path + '/' + id)
    },
    getTodos:() => {
        return axiosInstance.get(path);
    }, 
    updateTodo:({id,data})=>{
        return axiosInstance.put(path + '/' + id , data)
    },
    deleteTodo:({id})=>{
        return axiosInstance.delete(path + '/' + id)
            
    }
}