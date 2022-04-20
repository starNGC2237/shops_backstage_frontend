<template>
  <div class="backstageUserManage">
    <h1>后台用户管理</h1>
    <el-form :inline="true">
      <el-form-item>
        <!--todo-->
        <el-input placeholder="输入关键字进行筛选" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getUserData()">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="loading"
      border
      element-loading-text="加载中..."
      :data="backstageUserData"
    >
      <el-table-column
        prop="role"
        width="100"
        label="权限"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag>{{scope.row.role}}</el-tag>
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
        align="center"
        min-width="300"
        label="仓库地址"
      >
        <template slot-scope="scope">
          {{ scope.row.addressList[0].provinceName + scope.row.addressList[0].cityName + scope.row.addressList[0].districtName + scope.row.addressList[0].addressInfo }}
        </template>
      </el-table-column>
      <el-table-column
        width="100"
        align="center"
        fixed="right"
        label="操作"
      >
        <!--todo-->
        <el-button type="text">编辑</el-button>
        <el-button type="text">删除</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { allUser } from '@/api/userManage/userManage'

export default {
  name: 'BackstageUsersManage',
  data() {
    return {
      loading: false,
      backstageUserData: []
    }
  },
  mounted() {
    this.getUserData()
  },
  methods: {
    getUserData() {
      this.loading = true
      allUser('仓库').then(res => {
        this.backstageUserData = res.data
      }).catch().finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped lang="scss">
.backstageUserManage{
  padding: 1rem;
}
</style>
