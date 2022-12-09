import { axiosInstance } from "apis";


const path = '/comment';

export const CommentApi = {
    createComment: (title,data) => {
      return axiosInstance.post(path, title ,data);
    },
    getdetailComment:({id}) =>{
    },

    updateComment:({id,data})=>{
        
    },
    deleteComment:({id})=>{
        
            
    }
}