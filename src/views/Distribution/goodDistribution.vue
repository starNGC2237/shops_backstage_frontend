<template>
  <div class="goodDistribution">
    <h2>商品分布</h2>
    <el-table :data="tableData" border>
      <el-table-column
        prop="goodId"
        width="100"
        label="商品ID"
        align="center"
      />
      <el-table-column
        prop="goodName"
        width="100"
        label="商品名"
        align="center"
      />
      <el-table-column
        prop="goodName"
        width="100"
        label="商品图片"
        align="center"
      >
        <template slot-scope="scope">
          <el-image
            style="width: 50px;"
            :src="scope.row.imageUrl"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        width="150"
        label="商品标题"
        align="center"
      />
      <el-table-column
        prop="content"
        width="200"
        label="商品描述"
        align="center"
      />
      <el-table-column
        prop="category1Name"
        width="150"
        label="商品一级类别"
        align="center"
      />
      <el-table-column
        prop="category2Name"
        width="150"
        label="商品二级类别"
        align="center"
      />
      <el-table-column
        prop="category3Name"
        width="150"
        label="商品三级类别"
        align="center"
      />
      <el-table-column
        prop="price"
        width="150"
        label="商品价格"
        align="center"
      />
      <el-table-column
        prop="createTime"
        width="150"
        label="创建时间"
        align="center"
      />
      <el-table-column
        width="100"
        align="center"
        fixed="right"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" @click="openGridData(scope.row.numberList)">查看分布</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="收货地址" :visible.sync="dialogTableVisible" @before-close="clearGridData">
      <el-table :data="gridData">
        <el-table-column property="goodId" label="商品ID" width="150" align="center" />
        <el-table-column property="userName" label="后台用户名" width="150" align="center" />
        <el-table-column property="number" label="数量" width="100" align="center" />
        <el-table-column property="role" label="角色" align="center"/>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { getAllGoodInfo } from '@/api/goodManage/goodManage'

export default {
  name: 'GoodDistribution',
  data() {
    return {
      tableData: [],
      dialogTableVisible: false,
      gridData: []
    }
  },
  mounted() {
    this.getGoodData()
  },
  methods: {
    getGoodData() {
      this.loading = true
      getAllGoodInfo().then(res => {
        this.tableData = res.data.filter(item => item.numberList !== '')
      }).catch().finally(() => {
        this.loading = false
      })
    },
    openGridData(data) {
      this.gridData = data
      this.dialogTableVisible = true
    },
    clearGridData() {
      this.gridData = []
    }
  }
}
</script>

<style scoped lang="scss">
.goodDistribution{
  padding: 1rem;
}
</style>
