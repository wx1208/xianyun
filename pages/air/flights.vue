<template>
  <section class="contianer">
    <el-row
      type="flex"
      justify="space-between"
    >

      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div>
          <FlightsFilters
            :data="flightsDatas"
            @setdataList="setdataList"
          />
        </div>

        <!-- 航班头部布局 -->
        <div>
          <FlightsListHead />
        </div>

        <!-- 航班信息 -->
        <div>
          <FlightsItem
            v-for="(item,index) in dataList"
            :key="index"
            :data="item"
          />
        </div>
        <el-pagination
          v-if="flightsData.flights.length"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="flightsData.total"
        >
        </el-pagination>
         
        <div
          v-if="flightsData.flights.length === 0 && !loading"
          style="padding: 50px; text-align:center"
        >
          该航班暂无数据
        </div>
      </div>
        
      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <FlightsAside :data="flightsData"/>
      </div>
    </el-row>
  </section>
</template>

<script>

import moment from "moment";
import FlightsListHead from "@/components/air/flightsListHead"
import FlightsItem from "@/components/air/flightsItem"
import FlightsFilters from "@/components/air/flightsFilters"
import FlightsAside from "@/components/air/flightsAside"
export default {
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },
  data() {
    return {
      flightsDatas: {
        flights: [],
        info: {},
        options: {}
      },
      flightsData: {
        flights: [],
        info: {},
      },
      pageIndex: 1,
      pageSize: 5,
      loading: true,
    }
  },
  computed: {
    dataList() {
      const arr = this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      )
      return arr
    }
  },
  methods: {
    setdataList(arr) {
       if (arr) {
        this.pageIndex = 1
        this.flightsData.flights = arr
        this.flightsData.total = arr.length
      }
      // 多选
      // let data = this.flightsData.flights
      // let list = []
      // let startTime = 0
      // let endTime = 23
      // if (arr.flightTimes !== '') {
      //   let time = arr.flightTimes.split(',')
      //     startTime = Number(time[0])
      //     endTime = Number(time[1])
      // }
      // for (let item of data) {
      //   let start = Number(item.dep_time.split(':')[0])
      //   let end = Number(item.dep_time.split(':')[0])
      //   let org_airport_name = item.org_airport_name === arr.airport || arr.airport === ''
      //   let time = startTime <= start && start <= endTime
      //   let company = item.airline_name === arr.company || arr.company === ''
      //   let plane_size = item.plane_size === arr.airSize || arr.airSize === ''
      //   if (org_airport_name && time && company && plane_size) {
      //     list.push(item)
      //   }
      // }
      // this.flightsItemData = list
 
     

    },
    handleCurrentChange(val) {
      this.pageIndex = val
    },

    handleSizeChange(val) {
      this.pageSize = val
      this.pageIndex = val
    },

  getaxios(){
    this.$axios({
      url: "/airs",
      params: this.$route.query
    }).then(res => {
      let data = res.data
      this.flightsData = res.data
      this.flightsDatas = { ...res.data }
      this.loading = false
    })
    }
  },

  mounted() {
    this.getaxios()
  },
  watch:{
    $route(){
      this.getaxios()
    }
  }
}
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>