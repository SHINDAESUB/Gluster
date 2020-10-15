import axios from 'axios'

export default {

    async list (data){
        try{
            const result = await axios.get('/storage/{storage}/list',data)
            return result.data
        }catch(err){
            return error.message
        }
    }, 

    async upload (data){
        try{
            const result = await axios.post('/storage/{storage}/upload?path={path}',data)
            return result.data
        }catch(err){
            return error.message
        }
    }, 

    async mkdir (data){
        try{
            const result = await axios.post('/storage/{storage}/mkdir?path={path}',data)
            return result.data
        }catch(err){
            return error.message
        }
    }, 

    async delete (data){
        try{
            const result = await axios.post('/storage/{storage}/delete?path={path}',data)
            return result.data
        }catch(err){
            return error.message
        }
    }, 

}