import { axiosInstance } from "apis";

const path = '/todo';

export const TodoApi = {
    createTodo: (data) => {
        return axiosInstance.post(path, data);
    },
    // getTodo:() =>{
    //     return axiosInstance.get(path, { content })
    // },
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