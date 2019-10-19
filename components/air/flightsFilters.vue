<template>
  <div class="filters">
    <el-row
      type="flex"
      class="filters-top"
      justify="space-between"
      align="middle"
    >
      <el-col :span="8">
        单程：
        {{data.info.departCity}} - {{data.info.destCity}}
        /
        {{data.info.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select
          size="mini"
          clearable
          v-model="form.airport"
          placeholder="起飞机场"
        >
          <el-option
            v-for="(item,index) in data.options.airport"
            :key="index"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          size="mini"
          clearable
          v-model="form.flightTimes"
          placeholder="起飞时间"
        >
          <el-option
            v-for="(item,index) in data.options.flightTimes"
            :key="index"
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          size="mini"
          clearable
          v-model="form.company"
          placeholder="航空公司"
        >
          <el-option
            v-for="(item,index) in data.options.company"
            :key="index"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          size="mini"
          clearable
          v-model="form.airSize"
          placeholder="机型"
        >
          <el-option
            v-for="(item,index) in sizeOptions"
            :key="index"
            :label="item.name"
            :value="item.size"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button
        type="primary"
        round
        plain
        size="mini"
        @click="handleFiltersCancel"
      >
        撤销
      </el-button>
    </div>
    <span v-show="false">{{hanle}}</span>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      form: {
        airport: "",        // 机场
        flightTimes: "",    // 出发时间
        company: "",        // 航空公司
        airSize: "",        // 机型大小
      },
      sizeOptions: [
        { name: "大", size: "L" },
        { name: "中", size: "M" },
        { name: "小", size: "S" },
      ],
    }
  },
  // 多项筛选
  computed: {
    hanle(){
      var arr = this.data.flights.filter(v => {
          let valid = true
          if (this.form.company && this.form.company !== v.airline_name) {
            valid = false
          }
          if (this.form.airport && this.form.airport !== v.org_airport_name) {
            valid = false;
          }
          if (this.form.flightTimes) {
            const arr = this.form.flightTimes.split(",");
            const start = +v.dep_time.split(":")[0];
            if (start < +arr[0] || start >= +arr[1]) {
              valid = false
            }
          }
          if (this.form.airSize && this.form.airSize !== v.plane_size) {
            valid = false;
          }
          return valid
      })
      this.$emit("setdataList", arr)
      return 123
    }
  },
        
  methods: {
    // 撤销条件时候触发
    handleFiltersCancel() {
      this.form.airport = "";
      this.form.flightTimes = "";
      this.form.company = "";
      this.form.airSize = "";
      this.$emit("setdataList", this.data.flights)
    },
  }
}
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>