<template>
  <div class="good_manage">
    <h1>商品管理</h1>
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="filterKey" placeholder="输入关键字进行筛选" @input="filter" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getGoodData()">搜索</el-button>
        <el-button
          type="primary"
          @click="$router.push({path:'/goodManage/goodTable'})"
        >
          新建
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="loading"
      border
      element-loading-text="加载中..."
      :data="goodData"
    >
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
          <el-button type="text" @click="gotoInfo(scope.row)">编辑</el-button>
          <el-button v-if="$store.state.user.role === '商家'" type="text" @click="deleteGood(scope.row.goodId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { allGood, deleteGood } from '@/api/goodManage/goodManage'

export default {
  name: 'GoodManage',
  data() {
    return {
      filterKey: '',
      loading: false,
      goodData: []
    }
  },
  mounted() {
    this.getGoodData()
  },
  methods: {
    filter() {
      if (this.filterKey === '') {
        this.getGoodData()
      } else {
        this.goodData = this.goodData.filter((item) => {
          return item.goodName.indexOf(this.filterKey) >= 0
        })
      }
    },
    deleteGood(goodId) {
      deleteGood(goodId).then(res => {
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
        this.getGoodData()
      })
    },
    getGoodData() {
      this.loading = true
      allGood({}).then(res => {
        this.goodData = res.data
      }).catch().finally(() => {
        this.loading = false
      })
    },
    gotoInfo(good) {
      this.$router.push({ name: 'goodTable', params: { good: good }})
    }
  }
}
</script>

<style scoped lang="scss">
.good_manage{
  padding: 1rem;
}
</style>
