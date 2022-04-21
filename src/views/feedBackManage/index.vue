<template>
  <div class="feedBackManage">
    <el-table
      :data="tableData"
      border
    >
      <el-table-column
        prop="feedBackId"
        label="编号"
        align="center"
        width="100"
      />
      <el-table-column
        prop="userName"
        label="用户名"
        align="center"
        width="100"
      />
      <el-table-column
        prop="content"
        label="内容"
      />
      <el-table-column
        width="150"
        align="center"
        prop="contact"
        label="联系方式"
      />
      <el-table-column
        width="150"
        align="center"
        prop="isDone"
        label="是否解决"
      >
        <template slot-scope="scope">
          {{ !!scope.row.isDone?'已解决':'未解决' }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { allFeedBack } from '@/api/feedBackManage'
export default {
  name: 'FeedbackManage',
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      if (this.$store.state.user.role === '仓库') {
        this.tableData = []
      } else {
        allFeedBack().then(res => {
          this.tableData = res.data
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.feedBackManage{
  display: flex;
  padding: 1rem;
}
</style>
