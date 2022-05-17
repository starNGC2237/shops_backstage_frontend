<template>
  <div class="orderManage">
    <h1>订单管理</h1>
    <el-table :data="orderNames" border class="a">
      <el-table-column type="expand" width="100px">
        <template slot-scope="scope">
          <ShoppingCartExpand :props="scope.row.goodList" @fatherMethod="getAllOrder" />
        </template>
      </el-table-column>
      <el-table-column
        label="订单名"
        align="center"
        prop="orderName"
      />
      <el-table-column
        width="300"
        align="center"
        fixed="right"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button v-if="scope.row.goodList.some(item=>item.isCarry === 1)" type="text" @click="deliverOrder(scope.row.orderName,1)">
            确认用户已取
          </el-button>
          <el-button v-if="scope.row.goodList.some(item=>item.isCarry === 0)" type="text" @click="deliverOrder(scope.row.orderName,0)">
            确认已发货
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { allOrder, deliver } from '@/api/orderManage/orderManage'
import ShoppingCartExpand from '@/components/Expand/ShoppingCartExpand'

export default {
  name: 'OrderManage',
  components: {
    ShoppingCartExpand
  },
  data() {
    return {
      orderData: [],
      orderNames: []
    }
  },
  mounted() {
    this.getAllOrder()
  },
  methods: {
    getAllOrder() {
      this.orderData = []
      this.orderNames = []
      allOrder(1).then(res => {
        this.orderData = res.data
        this.orderData.forEach(item => {
          if (item.goods.length === 1) {
            item.goods = item.goods[0]
          }
          item.number = item.goods.number
          if (this.orderNames.some(itemO => itemO.orderName === item.orderName)) {
            this.orderNames.forEach(itemO => {
              if (itemO.orderName === item.orderName) {
                itemO.goodList.push(item)
              }
            })
          } else {
            this.orderNames.push({ orderName: item.orderName, goodList: [item] })
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
::v-deep .el-table__expanded-cell{
  padding: 10px !important;
}
</style>
