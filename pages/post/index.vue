<template>
  <el-container class="auto">
    <div>
<el-aside  class="post-aside" style="overflow:visible;float: left; " >
   <div class="post-lists" style=" width:260px;">
     <div style="padding:0 10px;" class="post-bolk">
       <div class="post-ul">
          <div 
              class="post-list"
              @mousemove="handleIndex(index)"
              v-for="(item,index) in listtype"
              :key="index">
           {{item.type}} <span class="icon el-icon-arrow-right"></span>
          </div>
     </div>
      <div class="post-right">
        <div 
         v-for="(item,index) in listtypes.children"
        :key="index"
        @click="handlecity(item.city)"
        ><i>{{index + 1}} </i><em>{{item.city}} </em> <span> {{item.desc}}</span></div>
      </div>
    </div>
  <div class="post-list-bottom">
    <h4>推荐城市</h4>
    <img src="http://image.naic.org.cn/uploadfile/2017/1001/1506829957472789.jpg" style="width:100% !important;">
  </div>  
  </div>
</el-aside>
 </div>

 <div style="width:100%;">
    <el-header style="height:80px">
      <div class="input-with-select el-input">
        <el-input
          placeholder="请输入你想去的地方，比如：“广州”"
          v-model="input"
          @keydown.enter.native="handleInput(input)"
        >
        </el-input>
        <div class="icon el-icon-search post-header-button" @click="handleBtn(input)"></div>
      </div>
      <div class="post-text">
        <i>推荐：</i>
        <span 
         v-for="(item,index) in citys"
        :key="index"
        v-if="index > -1 && index < 3"
        @click="handleGZ(item.value)"> {{item.value}} </span>
      </div>

    </el-header>
    <el-main>
      <div class="post-header">
        <span>推荐攻略</span>
        <el-row style="float: right;line-height: 20px;">
          <el-button
            type="primary"
            icon="el-icon-edit"
            style="margin-top:6px;"
            @click="handleNew"
          >写游记</el-button>
        </el-row>
      </div>
      <!-- 多图片 -->
      <div
        class="post-main-text"
        v-for="(item, index) in dataList"
        :key="index"
        v-if="dataList[index].images.length >=3"
      >
        <div style="color:#000;border-bottom:1px solid #eee" >
          <a href="javascript:;">
            <h3 class="voer-hiddle1" @click="handleID(item.id,item.watch)" >{{item.title}}</h3>
          </a>
          <div >
            <a
              href="javascript:;"
              class="voer-hiddle"
              @click="handleID(item.id,item.watch)"
              v-html="item.summary">
            </a>
            <div class="post-main-img clearfix">
              <a href="javascript:;">
                <img
                  v-for="(item,index) in dataList[index].images"
                  :src="item"
                  v-if="index < 3"
                  @click="handleID(item.id,item.watch)"
                >
              </a>
            </div>
          </div>
          <div class="post-main-id">
            <span class="icon el-icon-location-outline"> {{item.cityName}} by </span>
            <a href="javascript:;"><img
                :src="$axios.defaults.baseURL + $store.state.user.userInfo.user.defaultAvatar"
                style="height: 20px;width:20px !important;"
              > {{$store.state.user.userInfo.user.nickname}}</a>
            <span class="icon el-icon-view post-main-zan"> {{item.watch}}</span>
            <span style="font-size:16px;float: right;color:orange;"><i>23 </i> 赞</span>
          </div>
        </div>
      </div>
      <!-- 单图片 -->
      <div
        class="post-main-text2"
        v-for="(item,index) in dataList"
        :key="index"
        v-if="dataList[index].images.length >0 && dataList[index].images.length <=2"
      >
        <a href="javascript:;">
          <img
            v-for="(item,index) in dataList[index].images"
            :key="index"
            :src="item"
            v-if="index >= 0 && index < 1"
             @click="handleID(item.id,item.watch)"
          >
        </a>
        <div style="margin-left: 250px;">
          <a href="javascript:;">
            <h3
              style="color:#000;"
              class="voer-hiddle1"
               @click="handleID(item.id,item.watch)"
            >{{item.title}}</h3>
          </a>
          <a
            href="javascript:;"
            style="margin:15px 0;display: block; color:#888; font-size: 14px;"
            class="voer-hiddle"
            @click="handleID(item.id,item.watch)"
            v-html="item.summary"></a>
          <div
            class="post-main-id"
            style="font-size:14px; height: 25px;padding-right: 20px;"
          >
            <span class="icon el-icon-location-outline"> {{item.cityName}} by </span>
            <a href="javascript:;"><img     
                :src="$axios.defaults.baseURL + item.account.defaultAvatar"
                style="left:-40px; top: -10px;height: 20px;width:20px !important;"
              > {{item.account.nickname}}</a>
            <em class="icon el-icon-view"> {{item.watch}}</em>
            <span style="font-size:16px;float: right;color:orange;"><i>23 </i> 赞</span>
          </div>
        </div>
      </div>

    </el-main>
    <el-footer style="height:25px; margin-top:10px;">
       <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
             @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[3, 5, 10, 15]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
  </div>
    </el-footer>
</div>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      activeIndex: "",
      pageIndex: 1,
      pageSize: 3,
      list: [],
      listtype:[],
      listtypes:[],
      total:0,
      citys:[],
      pagecity:"",
      city:""
    }
  },
  
  mounted() {
    // 渲染城市
    this.$axios({
      url:"posts/cities",
    }).then(res=>{
      const { data } = res.data
      this.listtype = data
    }),
    // 渲染详情
    this.$axios({
      url: "posts",
    }).then(res => {
      const { data ,total } = res.data
      this.list = data
      console.log(this.list);
          data.map(v => {
            v.value = v.cityName.replace("市", "")
            this.citys.push(v)
          return v
          })
      this.total = total
    })
  },
watch:{ 
  $route(){
     this.input = this.$route.query.city
  },
},
   computed: {
    dataList() {
      const arr = this.list.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      )
      return arr
    }
  },
  
  methods: {
    // 发布
    handleNew(){
      this.$router.push("post/create")
    },
    // 点击跳转ID
    handleID(id,watch){
      // console.log(++watch);
      this.$router.push({
        path:`post/detail`,
        query:{
          id
        }
      }) 
    },
    // 按钮
    handleBtn(input){
      this.$axios({
         url:"posts",
         params:{city:input}
      }).then(res=>{
        this.list = [...res.data.data];
        this.total = res.data.total
      })
    },
    // 输入框
    handleInput(input){
      this.$axios({
        url:"posts",
        params:{city:input}
      }).then(res=>{
        this.list = [...res.data.data];
        this.total = res.data.total
      })
    },
    // 推荐
    handleGZ(value){
      this.$axios({
        url:"posts",
        params:{
          city:value
        }
      }).then(res=>{
        this.input = value
        this.list = [...res.data.data]
        this.total = res.data.total
      })
    },
     handleIndex(index){
      this.listtypes = this.listtype[index] 
    },
    // 给请求后加上条数和获取的条数  参数
getPostList(){
  this.$axios({
    url:`/posts?_start=${(this.pageIndex - 1) * this.pageSize}&_limit=${this.pageSize}${this.city?"&city="+this.city+"":''}`
  }).then(res=>{
    this.list = [...res.data.data]
    this.total = res.data.total
  })
},
    // 选择城市
    handlecity(city){
      this.city = city
      this.getPostList()
      this.$axios({
      url:"posts",
      params:{city}
    }).then( res => {
        this.$router.push({
          path:"/post",
          query:{city}
        }) 
        this.list = [...res.data.data]
        this.total = res.data.total
        
    })
    },

// 底部分页
    handleCurrentChange(val) {
      this.pageIndex = val
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.pageIndex = 1
    },
  }
}
</script>

<style lang="less" scoped>
.clearfix:before,
.clearfix:after {
  content: "";
  display: block;
  clear: both;
  
}
.clearfix {
  zoom: 1;
}
.voer-hiddle {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  height: 60px;
}

.voer-hiddle1 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

img {
  object-fit: cover;
  height: 150px;
  width: 200px !important;
  display: block;
}

.post-main-text2 {
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  img {
    float: left;
    margin-left: 10px;
    width: 30%;
    margin-top: 10px;
  }
}
 .auto{
     padding: 20px 0;
     margin: 0 auto;
     width: 1000px;
   }
.post-main-id {
  padding-bottom: 10px;
  position: relative;
  color: #888;
  a {
    left: 30px;
    color: orange;
    position: relative;
    img {
      top: 0px;
      left: -30px;
      position: absolute;
      width: 30%;
      border-radius: 50%;
    }
  }
  .post-main-zan {
    position: absolute;
    left: 200px;
    bottom: 12px;
  }
  em {
    position: absolute;
    left: 200px;
    bottom: 18px;
  }
}
.post-main-img {
  img {
    margin: 15px 0;
    width: 32%;
    margin-left: 9px;
    float: left;
  }
  img:nth-child(1) {
    margin-left: 0px;
  }
}
.post-main-text {
  padding: 0 20px;
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;

  div {
    font-size: 14px;
    color: #888;
  }
}
h3 {
  font-size: 18px;
  padding-top: 15px;
  margin-bottom: 5px;
  font-weight: 400;
}
h3:hover {
  color: orange !important;
}
.post-header {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #eee;
  padding: 0 20px;
  span {
    font-size: 18px;
    color: orange;
    border-bottom: 3px solid orange;
    padding-bottom: 11px;
  }
}
.post-text {
  font-size: 14px;
  padding: 10px 0;
  color: #888;
  span{
    cursor:pointer
  }
  span:hover {
    color: orange;
    
  }
}
.el-select .el-input {
  width: 130px;
}
.input-with-select {
  position: relative;
  border: 3px solid orange;
  /deep/.el-input__inner{
    border: none;
  }
  .post-header-button {
    position: absolute;
    top: 0;
    right: 0;
    text-align: center;
    line-height: 40px;
    width: 50px;
    height: 40px;
    font-size: 20px;
    font-weight: 600;
    color: orange;
  }
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.el-main {
  padding: 0px;
}

body > .el-container {
  margin-bottom: 40px;
}

.post-aside{


img{
  object-fit: cover;
  height: 170px;
}
.post-list-bottom{
  h4{
    font-weight: 400;
    border-bottom: 1px solid #888;
    margin-top: 20px;
    padding: 10px 0;
  }
  img{
    margin-top: 10px;
    width: 100%;
  }
}
      .post-ul .post-list:hover {
        color: orange;
      }
    .post-lists {
      position: relative;
    }
  .post-bolk:hover .post-right{
      display: block;
  }
  .post-ul{
    position: relative;
    border: 1px solid #888;
    border-bottom: none;
    .post-list{
      height: 25px;
      line-height: 25px;
      padding: 10px;
      font-size: 14px;
      border-bottom: 1px solid #888;
      span{
        float: right;
        margin-top: 5px;
      }
    }
  }
    .post-right{
      position: absolute;
      top: 0px;
      right: -340px;
      border: 1px solid #888;
      background: #fff;
      z-index: 10;
      width: 350px;
      display: none;
      div{
        display: block;
        padding: 10px;
        cursor:pointer;
        i{
          font-size: 20px;
          color: orange;
        }
        em{
          color: orange;
          padding: 0 10px;
        }
        span{
          font-size: 14px;
          color: #888;
        }
      }
     
    }
  }
</style>