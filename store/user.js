import { Store } from "vuex"

export const state = () => ({
    userInfo:{
        token:"",
        user:{}
    }
})

export const mutations = {
    setUserInfo(state,data){
        state.userInfo = data
    }
}


export const actions = {
    // 登录封装
    async login(store,data){
       var res = await this.$axios({
            url:"/accounts/login",
            method:"POST",
            data
        })
           
        if(res.status === 200){
            store.commit("setUserInfo", res.data)
        }
        return res
    },

    // 注册封装
     async register(store,data){
       var res = await this.$axios({
                url: "/accounts/register",
                method: "POST",
                data
              })
              
              if(res.staus === 200){
                store.commit("setUserInfo", res.data)
              }
            return res
    },
    
    // 验证码封装
    async sendCaptcha(store,tel){
        const res = await this.$axios({
            url: "/captchas",
            method: "POST",
            data: {
                 tel 
            }
          })
          return res
    },
}