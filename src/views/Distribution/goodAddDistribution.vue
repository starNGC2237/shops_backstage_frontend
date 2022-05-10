<template>
  <div>
    <h2>添加商品分布</h2>
    <el-form
      ref="form"
      :model="form"
      label-position="top"
    >
      <el-form-item label="商品">
        <el-select v-model="form.item" placeholder="请选择" value-key="goodId">
          <el-option
            v-for="(item,index) in tableData"
            :key="index"
            :label="item.goodName"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-switch
          v-model="form.type"
          active-text="增加"
          inactive-text="减少"
          active-color="#13ce66"
          inactive-color="#ff4949"
        />
      </el-form-item>
      <el-form-item>
        <el-input-number v-model="form.number" label="描述文字" />
      </el-form-item>
      <el-form-item label="后台用户">
        <el-select v-model="form.user" placeholder="请选择" value-key="goodId">
          <el-option
            v-for="(item,index) in backstageUserData"
            :key="index"
            :label="item.userName"
            :value="item.userName"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button>确认</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
import { getAllGoodInfo } from '@/api/goodManage/goodManage'
import { allUser } from '@/api/userManage/userManage'

export default {
  name: 'GoodAddDistribution',
  data() {
    return {
      form: {
        item: '',
        type: true,
        number: 0,
        username: ''
      },
      tableData: [],
      backstageUserData: []
    }
  },
  mounted() {
    this.getGoodData()
    this.getUserData()
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
    getUserData() {
      this.loading = true
      if (this.$store.state.user.role === '仓库') {
        this.backstageUserData = [this.$store.state.user]
        this.loading = false
      } else {
        const cks = allUser('仓库')
        const gly = allUser('商家')
        Promise.all([cks, gly]).then(res => {
          this.backstageUserData = res[0].data
          this.backstageUserData = this.backstageUserData.concat(res[1].data)
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
