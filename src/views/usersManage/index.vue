<template>
  <div class="userManage">
    <h1>用户管理</h1>
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="filterKey" placeholder="输入关键字进行筛选" @input="filter" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getUserData()">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="loading"
      border
      element-loading-text="加载中..."
      :data="userData"
    >
      <el-table-column
        prop="role"
        width="100"
        label="权限"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.role==='封禁'?'danger':''">{{ scope.row.role }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="imageUrl"
        width="100"
        label="头像"
        align="center"
      >
        <template slot-scope="scope">
          <el-image style="width: 50px;height: 50px;" :src="scope.row.imageUrl" />
        </template>
      </el-table-column>
      <el-table-column
        prop="userName"
        align="center"
        min-width="200"
        label="用户名"
      />
      <el-table-column
        prop="nickName"
        align="center"
        min-width="200"
        label="昵称"
      />
      <el-table-column
        prop="phone"
        align="center"
        width="200"
        label="手机号"
      />
      <el-table-column
        prop="createTime"
        align="center"
        min-width="200"
        label="创建时间"
      />
      <el-table-column
        prop="score"
        align="center"
        min-width="100"
        label="信誉分数"
      />
      <el-table-column
        width="100"
        align="center"
        fixed="right"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            v-if="$store.state.user.role === '商家'"
            type="text"
            @click="disableUser(scope.row)"
          >
            {{ scope.row.role==='用户'?'封禁':'解封' }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { allUser, disable } from '@/api/userManage/userManage'
export default {
  name: 'UsersManage',
  data() {
    return {
      loading: false,
      userData: [],
      filterKey: ''
    }
  },
  mounted() {
    this.getUserData()
  },
  methods: {
    async getUserData() {
      this.loading = true
      if (this.$store.state.user.role === '仓库') {
        this.userData = []
        this.loading = false
      } else {
        const users = await allUser('用户')
        const forbids = await allUser('封禁')
        this.userData = forbids.data.concat(users.data)
        this.loading = false
      }
    },
    disableUser(user) {
      this.loading = true
      const params = {
        userName: user.userName,
        number: user.role === '用户' ? 1 : 0
      }
      disable(params).then().finally(() => {
        this.loading = false
        this.getUserData()
      })
    },
    filter() {
      if (this.filterKey === '') {
        this.getUserData()
      } else {
        this.userData = this.userData.filter((item) => {
          return item.userName.indexOf(this.filterKey) >= 0
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.userManage{
  padding: 1rem;
}
.tag{
  margin-right: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
