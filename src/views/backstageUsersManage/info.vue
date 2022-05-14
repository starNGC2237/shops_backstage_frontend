<template>
  <div class="user_info">
    <el-form
      ref="form"
      :model="form"
      label-position="top"
    >
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
        <span>{{ form.address }}</span>
        <el-button @click="dialogVisible = true">{{ form.address?'修改':'新增' }}</el-button>
      </el-form-item>
      <el-form-item label="用户权限">
        <el-input v-model="form.role" disabled />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{ form.userName?'修改':'新建' }}</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
      title="添加地址"
      :visible.sync="dialogVisible"
      width="40%"
      @close="dialogVisible = false;"
      @closed="clearForm"
    >
      <el-form label-position="top">
        <el-form-item label="请选择省">
          <el-select v-model="address.sheng">
            <el-option
              v-for="item in areas['0']"
              :key="item.area_id"
              :label="item.name"
              :value="item.area_id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="请选择市">
          <el-select v-model="address.shi">
            <el-option
              v-for="item in (areas[address.sheng] || [])"
              :key="item.area_id"
              :label="item.name"
              :value="item.area_id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="请选择区">
          <el-select v-model="address.qu" placeholder="请选择，若无可不填">
            <el-option
              v-for="item in (areas[address.shi] || [])"
              :key="item.area_id"
              :label="item.name"
              :value="item.area_id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="请输入详细地址">
          <el-input v-model="address.info" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAllAreaMap } from '@/api/backstageUserManage/backstageUserManage'

export default {
  name: 'Info',
  data() {
    return {
      dialogVisible: false,
      disabled: false,
      address: {
        sheng: '',
        shi: '',
        qu: '',
        info: ''
      },
      form: {
        userName: '',
        nickName: '',
        phone: '',
        passWord: '',
        address: '',
        role: '仓库'
      },
      areas: {}
    }
  },
  mounted() {
    if (this.$route.params.user) {
      Object.assign(this.form, this.$route.params.user)
      if (this.form.addressList.length === 0) {
        this.form.address = ''
      } else {
        this.form.address = ((this.form.addressList[0].provinceName || '') + (this.form.addressList[0].cityName || '') + (this.form.addressList[0].districtName || '') + (this.form.addressList[0].addressInfo || ''))
      }
      this.disabled = true
      this.$route.meta.title = '修改仓库信息'
    } else {
      this.$route.meta.title = '添加仓库用户'
    }
    this.getAreas()
  },
  methods: {
    getAreas() {
      getAllAreaMap().then(res => {
        if (res.code === '200') {
          this.areas = res.data
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    clearForm() {
      this.address = {
        sheng: '',
        shi: '',
        qu: '',
        info: ''
      }
    },
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    commitAddAddress() {
      /*
      * const data = {
        addressInfo: this.address.info,
        provinceName: this.areas['0'].filter((item) => {
          return item.area_id === this.address.sheng
        })[0].name || '',
        cityName: this.areas[this.address.sheng].filter((item) => {
          return item.area_id === this.address.shi
        })[0].name || '',
        districtName: typeof this.address.qu === 'string' ? '' : this.areas[this.address.shi].filter((item) => {
          return item.area_id === this.address.qu
        })[0].name,
        isUsing: 0
      }
      * */
      // todo
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped lang="scss">
.user_info{
  padding: 1rem 4rem;
}
.line{
  text-align: center;
}
</style>
