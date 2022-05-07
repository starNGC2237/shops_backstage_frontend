<template>
  <div class="pushManage">
    <h1>推送管理</h1>
    <el-button style="width: fit-content;margin-bottom: 1rem;" @click="dialogVisible = true">新建公告</el-button>
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
          <el-button type="text" @click="toReAnnounce(scope.row,'修改状态')">{{ !!scope.row.isActive?'关闭':'激活' }}</el-button>
          <el-button type="text" @click="deleteAnnounce(scope.row.announceId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="添加公告"
      :visible.sync="dialogVisible"
      width="40%"
      @close="dialogVisible = false;"
      @closed="clearForm"
    >
      <el-form label-position="top">
        <el-form-item label="标题">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="form.content" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="newAnnounce">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addAnnounce, allAnnounce, deleteAnnounce, reAnnounce } from '@/api/pushManage/pushManage'

export default {
  name: 'Push',
  data() {
    return {
      dialogVisible: false,
      loading: false,
      pushData: [],
      form: {
        content: '',
        title: ''
      }
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
    deleteAnnounce(id) {
      deleteAnnounce(id).then(res => {
        this.showMsg(res)
      }).finally(() => {
        this.getAllAnnounce()
      })
    },
    toReAnnounce(announce, tag) {
      let params = {}
      if (tag === '修改状态') {
        params = {
          announceId: announce.announceId,
          isActive: announce.isActive === 1 ? 0 : 1
        }
      }
      reAnnounce(params).then(res => {
        this.showMsg(res)
      }).finally(() => {
        this.getAllAnnounce()
      })
    },
    showMsg(res) {
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
    },
    newAnnounce() {
      addAnnounce(this.form.title, this.form.content).then(res => {
        this.showMsg(res)
      }).finally(() => {
        this.dialogVisible = false
        this.getAllAnnounce()
      })
    },
    clearForm() {
      this.form = {
        content: '',
        title: ''
      }
    }
  }
}
</script>

<style scoped lang="scss">
.pushManage{
  padding: 1rem;
}
</style>
