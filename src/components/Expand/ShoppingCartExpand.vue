<template>
  <div class="expand">
    <el-table :data="props" border>
      <el-table-column
        align="center"
        label="状态"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.orderStatus === 0">订单未提交</span>
          <span v-if="scope.row.orderStatus === 1">订单已提交</span>
          <span v-if="scope.row.orderStatus === 2">订单已发</span>
          <span v-if="scope.row.orderStatus === 3">订单已完成</span>
        </template>
      </el-table-column>
      <el-table-column
        width="150"
        align="center"
        prop="orderName"
        label="订单名"
      />
      <el-table-column
        align="center"
        prop="goods.goodName"
        label="商品名称"
      />
      <el-table-column
        align="center"
        width="100"
        prop="goods.price"
        label="单价"
      />
      <el-table-column
        width="200"
        align="center"
        prop="goods.number"
        label="数量"
      />
      <el-table-column
        align="center"
        label="小计"
      >
        <template slot-scope="scope">
          {{ (scope.row.goods.number * scope.row.goods.price).toFixed(4) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="isCarry"
        align="center"
        label="是否是自取"
      >
        <template slot-scope="scope">
          {{ !!scope.row.isCarry?"是":"否" }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  name: 'ShoppingCartExpand',
  props: ['props']
}
</script>

<style scoped lang='scss'>
.expand{
    width: 100%;
    box-sizing: border-box;
    padding: 0 10px;
}
</style>
