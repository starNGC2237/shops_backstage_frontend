<template>
  <div class="orderManage">
    <h1>订单管理</h1>
    <el-table :data="orderData" border>
      <el-table-column
        label="订单名"
        align="center"
        prop="orderName"
      />
      <el-table-column
        label="商品名"
        align="center"
        prop="goods.goodName"
      />
      <el-table-column
        label="应处理后台用户用户名"
        align="center"
        prop="toUser"
      />
      <el-table-column
        width="100"
        align="center"
        fixed="right"
        label="操作"
      >
        <!--todo-->
        <template slot-scope="scope">
          <el-button v-if="scope.row.toUser === $store.state.user.userName" type="text" @click="deliverOrder(scope.row.orderName,1)">
            {{ !!scope.row.isCarry?'确认用户已取':'确认已发货' }}
          </el-button>
          <el-button v-if="scope.row.toUser === $store.state.user.userName" type="text" @click="deliverOrder(scope.row.orderName,0)">
            确认已发货
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { allOrder, deliver } from '@/api/orderManage/orderManage'

export default {
  name: 'OrderManage',
  data() {
    return {
      orderData: []
    }
  },
  mounted() {
    this.getAllOrder()
  },
  methods: {
    getAllOrder() {
      allOrder(1).then(res => {
        this.orderData = res.data
        this.orderData.forEach((item) => {
          if (item.goods.length === 1) {
            item.goods = item.goods[0]
          }
        })
      }).finally()
    },
    deliverOrder(orderName, isCarry) {
      deliver(orderName, isCarry).then(res => {
        if (res.code === '200') {
          this.$message({
            type: 'success',
            message: res.msg
          })
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      }).finally(() => {
        this.getAllOrder()
      })
    }
  }
}
</script>

<style scoped lang="scss">
.orderManage{
  padding: 1rem;
}
</style>
