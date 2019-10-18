<template>
    <div class="container">
        <el-row type="flex" justify="space-between">
            <!-- 订单表单 -->
            <div class="main">
                <OrderForm :data="infoData" @setAllPrice="setAllPrice"/>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                    <OrderAside :data="infoData" :allprice="allprice" />
            </div>
        </el-row>
    </div>
</template>

<script>
import OrderForm from "@/components/air/orderForm"
import OrderAside from "@/components/air/orderAside"

export default {
    components:{
        OrderForm,
        OrderAside
    },
    data(){
        return{
           infoData:{
               insurances:[],
               seat_infos: {}
           },
           allprice:0
        }
    },
    mounted(){
        const { id, seat_xid } = this.$route.query

        this.$axios({
            url:`/airs/${id}`,
            params:{
                seat_xid
            }
        }).then( res => {
            this.infoData = res.data
        })
    },
    methods:{
        setAllPrice(price){
            this.allprice = price
        }
    }
}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }
    
    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>