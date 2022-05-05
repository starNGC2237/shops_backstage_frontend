<template>
  <div class="pushManage">
    <h1>推送管理</h1>
    <el-button style="width: fit-content;margin-bottom: 1rem;">新建公告</el-button>
    <el-button style="width: fit-content;margin-bottom: 1rem;" type="primary" @click="getAllAnnounce">刷新</el-button>
    <el-table
      v-loading="loading"
      border
      :data="pushData"
    >
      <el-table-column
        width="150"
        label="是否正在使用"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag>{{ !!scope.row.isActive?'正在使用':'未使用' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="标题"
        align="center"
        prop="title"
      />
      <el-table-column
        label="内容"
        align="center"
        prop="content"
      />
      <el-table-column
        width="150"
        label="创建日期"
        align="center"
        prop="createTime"
      />
      <el-table-column
        width="150"
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="text">{{ !!scope.row.isActive?'激活':'关闭' }}</el-button>
          <el-button type="text" @click="delete(scope.row.announceId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { allAnnounce, deleteAnnounce } from '@/api/pushManage/pushManage'

export default {
  name: 'Push',
  data() {
    return {
      loading: false,
      pushData: []
    }
  },
  mounted() {
    this.getAllAnnounce()
  },
  methods: {
    getAllAnnounce() {
      this.loading = true
      allAnnounce().then(res => {
        this.pushData = res.data
      }).finally(() => {
        this.loading = false
      })
    },
    delete(id) {
      deleteAnnounce(id).then().finally(() => {
        this.getAllAnnounce()
      })
    }
  }
}
</script>

<style scoped lang="scss">
.pushManage{
  padding: 1rem;
}
</style>
