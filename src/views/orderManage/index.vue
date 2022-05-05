<template>
  <div>
    <h1>订单管理</h1>
    <el-table />
  </div>
</template>

<script>
import { allOrder } from '@/api/orderManage/orderManage'

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
      }).finally()
    }
  }
}
</script>

<style scoped lang="scss">

</style>
