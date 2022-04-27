<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎您， {{ $store.state.user.nickName }}</div>
    <div id="main" ref="main" />
  </div>
</template>

<script>
import { getRegisterUsers } from '@/api/dashboard/dashboard'
export default {
  name: 'Dashboard',
  data() {
    return {
      option: {
        title: {
          text: '前七天用户日增长折线图',
          subtext: '不包括被封禁的用户',
          x: 'center',
          y: 'top',
          textAlign: 'center'
        },
        xAxis: {
          type: 'category',
          data: [
            '0-24小时间',
            '24-48小时间',
            '48-72小时间',
            '72-96小时间',
            '96-120小时间',
            '120-144小时间',
            '144-168小时间'
          ]
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [1, 2, 4, 5, 1, 1, 2],
            type: 'line'
          }
        ]
      }
    }
  },
  computed: {
    // 基于准备好的dom，初始化echarts实例
    myChart: function() {
      return this.$echarts.init(this.$refs.main)
    }
  },
  mounted() {
    this.getAllRegisterUsers()
  },
  methods: {
    getAllRegisterUsers() {
      getRegisterUsers().then(res => {
        this.option.series[0].data = res.data
      }).finally(() => {
        this.myChart.setOption(this.option)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
#main {
  width: 100%;
  height: 400px;
  margin-top: 2rem;

}
</style>
