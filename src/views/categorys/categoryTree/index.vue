<template>
  <div class="app-container">
    <el-input
      v-model="filterText"
      placeholder="输入关键词进行筛选"
      style="margin-bottom:30px;"
    />
    <el-tree
      ref="tree2"
      v-loading="loading"
      :data="categoryData"
      :props="defaultProps"
      node-key="categoryId"
      :default-expanded-keys="[0]"
      :filter-node-method="filterNode"
    >
      <span slot-scope="{ node, data }" style="width: 100%;">
        <div style="display: flex;justify-content: space-between;width: 100%;">
          <span>{{ node.label }}</span>
          <span>
            <el-button
              v-if="data.categoryLevel!== 3 && $store.state.user.role === '商家'"
              type="text"
              size="mini"
              @click.stop="categoryMethod(data,'添加')"
            >
              添加子类
            </el-button>
            <el-button
              v-if="data.categoryId !== 0 && $store.state.user.role === '商家'"
              type="text"
              size="mini"
              @click.stop="categoryMethod(data,'编辑')"
            >
              编辑
            </el-button>
            <el-button
              v-if="data.categoryId !== 0 && $store.state.user.role === '商家'"
              type="text"
              size="mini"
              @click.stop="categoryMethod(data,'删除')"
            >
              删除
            </el-button>
          </span>
        </div>
      </span>
    </el-tree>
    <el-dialog
      :title="msg+'商品分类'"
      :visible.sync="dialogVisible"
      width="40%"
      class="dialogClass"
      @close="cancelChange"
      @closed="clearChange"
    >
      <el-form>
        <el-form-item v-if="msg !=='添加'" label="分类ID：">
          <el-input v-model="categoryItem.categoryId" disabled />
        </el-form-item>
        <el-form-item label="商品分类名：">
          <el-input v-model="categoryItem.categoryName" />
        </el-form-item>
        <el-form-item label="商品分类级别：">
          <el-input v-model="categoryItem.categoryLevel" disabled />
        </el-form-item>
        <el-form-item label="分类父分类ID：">
          <el-input v-model="categoryItem.categoryParent" disabled />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelChange();">取 消</el-button>
        <el-button type="primary" @click="check()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="dialogDeleteVisible"
      width="40%"
      @close="cancelDelete"
      @closed="clearDelete"
    >
      <span>确认要删除  “{{ categoryItem.categoryName }}”  这条类别吗，其下的所有的子类别也会被删除！</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelDelete();">取 消</el-button>
        <el-button type="primary" @click="confirmDelete()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addCategory, deleteCategory, getAllCategory, reviseCategory } from '@/api/categorys/categoryTree'
export default {

  data() {
    return {
      loading: false,
      dialogDeleteVisible: false,
      dialogVisible: false,
      filterText: '',
      categoryData: [
        {
          categoryName: '根目录',
          categoryId: 0,
          categoryParent: null,
          categoryLevel: 0,
          categoryChild: []
        }
      ],
      defaultProps: {
        children: 'categoryChild',
        label: 'categoryName'
      },
      categoryItem: {
        categoryName: ''
      },
      msg: ''
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },
  mounted() {
    this.getCategory()
  },
  methods: {
    getCategory() {
      this.loading = true
      getAllCategory().then(res => {
        this.categoryData[0].categoryChild = res.data
      }).finally(() => {
        this.loading = false
      })
    },
    categoryMethod(data, msg) {
      if (data.categoryId === 0 && data.categoryName === '根目录' && (msg === '删除' || msg === '编辑') && data.categoryLevel === 3) {
        this.$message(`根目录无法${msg}或无法增加更多的子类别了`)
      } else {
        const { categoryId, categoryName, categoryParent, categoryLevel } = data
        if (msg === '编辑') {
          this.msg = '编辑'
          this.categoryItem.categoryId = categoryId
          this.categoryItem.categoryName = categoryName
          this.categoryItem.categoryLevel = categoryLevel
          this.categoryItem.categoryParent = categoryParent
          this.dialogVisible = true
        } else if (msg === '删除') {
          this.msg = '删除'
          this.dialogDeleteVisible = true
          this.categoryItem = data
        } else if (msg === '添加') {
          this.msg = '添加'
          this.categoryItem.categoryLevel = categoryLevel + 1
          this.categoryItem.categoryParent = categoryId
          this.dialogVisible = true
        }
      }
    },
    filterNode(value, data) {
      if (!value) return true
      return data.categoryName.indexOf(value) !== -1
    },
    check() {
      if (this.msg === '添加') {
        this.add()
      } else {
        this.revise()
      }
    },
    // 添加方法
    add() {
      addCategory(this.categoryItem).finally(() => {
        this.after()
      })
    },
    revise() {
      reviseCategory(this.categoryItem).finally(() => {
        this.after()
      })
    },
    after() {
      this.loading = false
      this.dialogVisible = false
      this.getCategory()
    },
    // 删除方法
    delete(categoryId) {
      this.loading = true
      deleteCategory(categoryId).finally(() => {
        this.loading = false
        this.dialogDeleteVisible = false
        this.getCategory()
      })
    },
    clearChange() {
      this.categoryItem = {
        categoryName: ''
      }
      this.msg = ''
    },
    cancelChange() {
      this.dialogVisible = false
    },
    clearDelete() {
      this.categoryItem = {
        categoryName: ''
      }
    },
    // 取消删除
    cancelDelete() {
      this.dialogDeleteVisible = false
    },
    // 确认删除
    confirmDelete() {
      this.delete(this.categoryItem.categoryId)
    }
  }
}
</script>
<style scoped>
.dialogClass /deep/ .el-dialog__body {
  padding: 1rem 20px;
}
</style>

