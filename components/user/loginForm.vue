<template>
   <el-form 
        :model="form" 
        ref="form"
        :rules="rules" 
        class="form">

        <el-form-item class="form-item" prop="username">
            <el-input 
            placeholder="用户名/手机"
            v-model="form.username"
            >
            </el-input>
        </el-form-item>

        <el-form-item class="form-item" prop="password">
            <el-input 
            placeholder="密码" 
            type="password"
            v-model="form.password"
            >
            </el-input>
        </el-form-item>

        <p class="form-text">
            <nuxt-link to="#">忘记密码</nuxt-link>
        </p>

        <el-button 
        class="submit"
        type="primary"
        @click="handleLoginSubmit">
            登录
        </el-button>
    </el-form>
</template>

<script>
import { async } from 'q'
export default {
    data(){
        return{
            form:{
                username:"",
                password:""
            },
            rules:{
                username:[
                    {required: true, message: '请输入用户名',  trigger: 'blur' }
                    ],
                password:[
                    {required: true, message: '请输入密码',  trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        handleLoginSubmit(){
            this.$refs.form.validate(async v => {
                if(v){
                    const res = await this.$store.dispatch("user/login",this.form)

                       if(res.status === 200){
                        this.$message.success('登录成功')
                        this.$router.back('/')
                    }else{
                        this.$message.error('账号或密码错误')
                    }
                }

            })
        }
    }

}
</script>

<style lang="less" scoped>

  .form{
        padding:25px;
    }

    .form-item{
        margin-bottom:20px;
    }

    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }

    .submit{
        width:100%;
        margin-top:10px;
    }

</style>