import { Message } from 'element-ui';

export default (context)=>{
    context.$axios.onError(res =>{
        const { message , statusCode } = res.response.data
        if(statusCode === 400){
            Message.error(message)
        }

        // if(statusCode === 403 || statusCode === 401){
            if([403,401].indexOf(statusCode) > -1 ){   
            context.redirect.push("/user/login")
        }
    })
}