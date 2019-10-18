<template>
  <div>

    <div>
        <span 
            v-for="(item,index) in ['新闻','狗带','拉拉']"
            :key="index"
            @click="handleTab(index)"
            :class="{atv: current === index}"
            style="cursor:pointer;"
            
            >


            {{item}}

        </span>
      </div>

      <div v-if="current === 0">
          <p>新闻联播时间</p>
          <p>新闻联播时间</p>
          <p>新闻联播时间</p>
          <p>新闻联播时间</p>
      </div>

      <div v-if="current === 1">
          <p>坚决不够带</p>
          <p>坚决不够带</p>
          <p>坚决不够带</p>
          <p>坚决不够带</p>
          <p>坚决不够带</p>
      </div>

      <div v-if="current === 2 ">
          <p>淘宝搜索拉拉</p>
          <p>淘宝搜索拉拉</p>
          <p>淘宝搜索拉拉</p>
          <p>淘宝搜索拉拉</p>
      </div>

  </div>
</template>

<script>
export default {
    data(){
        return{
            // tab栏目切换
            current:0
        }
    },
    methods:{
        handleTab(index){
            this.current = index
        }
    }
}
</script>

<style lang="less" scoped>
    .atv{
        color: red;
    }

</style>