<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="form.userName" :disabled="disabled" />
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.nickName" />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.phone" type="number" auto-complete="off" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.passWord" show-password auto-complete="off" />
      </el-form-item>
      <el-form-item label="仓库地址">
        <el-input v-model="form.address" />
      </el-form-item>
      <el-form-item label="用户权限">
        <el-input v-model="form.role" disabled />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{ form.userName?'修改':'新建' }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Info',
  data() {
    return {
      disabled: false,
      form: {
        userName: '',
        nickName: '',
        phone: '',
        passWord: '',
        address: '',
        role: '仓库'
      }
    }
  },
  mounted() {
    if (this.$route.params.user) {
      Object.assign(this.form, this.$route.params.user)
      this.disabled = true
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.line{
  text-align: center;
}
</style>
