import axios from 'axios'

export default {
    async list (data){
        try{
            const result = await axios.get(`/storage/${data.storage}/list?path=${data.path}`)
            return result
        }catch(error){
            return error.message
        }
    }, 

    async upload (data){
        try{
            const result = await axios.post(`/storage/${data.storage}/upload?path=${data.path}`,data.data)
            return result
        }catch(error){
            return error.message
        }
    }, 

    async mkdir (data){
        try{
            const result = await axios.post(`/storage/${data.storage}/mkdir?path=${data.path}`,data)
            return result
        }catch(error){
            return error.message
        }
    }, 

    async delete (data){
        try{
            console.log("data :" , data)
            const result = await axios.post(`/storage/${data.storage}/delete?path=${data.path}`,data)
            return result
        }catch(error){
            return error.message
        }
    }, 

}