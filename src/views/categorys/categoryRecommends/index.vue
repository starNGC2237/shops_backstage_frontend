<template>
  <div class="app-container">
    <el-button @click="getPer">添加推荐类别</el-button>
    <div class="tags">
      推荐类别：
      <template
        v-for="item in categoryOneData"
      >
        <el-tag
          v-if="!!parseInt(item.isRecommended,10)"
          :key="item.categoryId"
          closable
          @close="deleteRecommend(item)"
        >
          {{ item.categoryName }}
        </el-tag>
      </template>
    </div>
    <el-dialog
      title="添加推荐类别"
      :visible.sync="dialogVisible"
      width="40%"
      @close="dialogVisible = false;"
      @closed="clearForm"
    >
      <el-form>
        <el-form-item label="请选择推荐类别">
          <el-select v-model="form.categoryId">
            <el-option
              v-for="item in categoryOneData"
              :key="item.categoryId"
              :label="item.categoryName"
              :value="item.categoryId"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="recommendCategory()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAllCategory } from '@/api/categorys/categoryTree'
import { categoryRecommended } from '@/api/categorys/categoryRecommend'
import { Message } from 'element-ui'

export default {

  data() {
    return {
      loading: false,
      dialogVisible: false,
      categoryOneData: [],
      form: {
        categoryId: ''
      }
    }
  },
  mounted() {
    this.getCategory()
  },
  methods: {
    getCategory() {
      this.loading = true
      getAllCategory().then(res => {
        this.categoryOneData = res.data
      }).finally(() => {
        this.loading = false
      })
    },
    clearForm() {
      this.form = {
        categoryId: ''
      }
    },
    deleteRecommend(item) {
      if (this.$store.state.user.role === '仓库') {
        Message({
          message: '没有权限',
          type: 'error'
        })
      } else {
        const data = {
          categoryId: item.categoryId,
          isRecommended: 0
        }
        categoryRecommended(data).then(res => {
          Message({
            message: res.msg,
            type: 'success'
          })
        }).finally(() => {
          this.getCategory()
        })
      }
    },
    getPer() {
      if (this.$store.state.user.role === '仓库') {
        Message({
          message: '没有权限',
          type: 'error'
        })
      } else {
        this.dialogVisible = true
      }
    },
    recommendCategory() {
      const data = {
        categoryId: this.form.categoryId,
        isRecommended: 1
      }
      categoryRecommended(data).then(res => {
        Message({
          message: res.msg,
          type: 'success'
        })
      }).finally(() => {
        this.dialogVisible = false
        this.getCategory()
      })
    }
  }
}
</script>
<style scoped>
.tags :not(:last-child){
  margin-right: 1rem;
}
.tags div{
  margin-top: 0.5rem;
}
.tags{
  display: flex;
}
.tags{
  margin-top: 1rem;
}
</style>

