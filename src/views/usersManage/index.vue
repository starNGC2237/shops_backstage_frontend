<template>
  <div class="userManage">
    <h1>用户管理</h1>
    <el-table
      v-loading="loading"
      border
      element-loading-text="加载中..."
    >
      <el-table-column
        prop="userName"
        label="用户名"
      />
      <el-table-column
        prop="nickName"
        label="昵称"
      />
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'UsersManage',
  data() {
    return {
      loading: false
    }
  }
}
</script>

<style scoped lang="scss">
.userManage{
  padding: 1rem;
}
</style>
