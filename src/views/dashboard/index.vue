<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎您， {{ $store.state.user.nickName }}</div>
    <el-card v-if="$store.state.user.role === '商家'" shadow="hover" style="margin-bottom: 1rem">
      <div id="feeds" ref="feeds" />
    </el-card>
    <el-card v-if="$store.state.user.role === '商家'" shadow="hover" style="margin-bottom: 1rem">
      <div id="users" ref="users" />
    </el-card>
  </div>
</template>

<script>
import { getRegisterUsers, getStatisticsFeedBack } from '@/api/dashboard/dashboard'
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
            data: [0, 0, 0, 0, 0, 0, 0],
            type: 'line'
          }
        ]
      },
      optionFeedback: {
        title: {
          text: '反馈解决情况',
          subtext: 'Feedback solution',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Feedback solution',
            type: 'pie',
            radius: '50%',
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  },
  computed: {
    // 基于准备好的dom，初始化echarts实例
    myChart: function() {
      return this.$echarts.init(this.$refs.users)
    },
    myChart2: function() {
      return this.$echarts.init(this.$refs.feeds)
    }
  },
  mounted() {
    this.getAllRegisterUsers()
    this.getStatisticsFeedBacks()
  },
  methods: {
    getAllRegisterUsers() {
      getRegisterUsers().then(res => {
        this.option.series[0].data = res.data
      }).finally(() => {
        this.myChart.setOption(this.option)
        this.myChart2.setOption(this.optionFeedback)
      })
    },
    getStatisticsFeedBacks() {
      getStatisticsFeedBack().then(res => {
        this.optionFeedback.series[0].data = res.data
      }).finally(() => {
        this.myChart2.setOption(this.optionFeedback)
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
    margin-bottom: 2rem;
  }
}
#users {
  width: 100%;
  height: 400px;
}
#feeds {
  width: 100%;
  height: 400px;
}
</style>
