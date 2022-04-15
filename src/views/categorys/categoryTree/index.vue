<template>
  <div class="app-container">
    <el-input
      v-model="filterText"
      placeholder="输入关键词进行筛选"
      style="margin-bottom:30px;"
    />
    <el-tree
      ref="tree2"
      accordion
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
              type="text"
              size="mini"
              @click.stop="a(data,'添加')"
            >
              添加
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click.stop="a(data,'编辑')"
            >
              编辑
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click.stop="a(data,'删除')"
            >
              删除
            </el-button>
          </span>
        </div>
      </span>
    </el-tree>
  </div>
</template>

<script>
import { getAllCategory } from '@/api/categorys/categoryTree'
export default {

  data() {
    return {
      filterText: '',
      categoryData: [
        {
          categoryName: '根目录',
          categoryId: 0,
          categoryChild: []
        }
      ],
      defaultProps: {
        children: 'categoryChild',
        label: 'categoryName'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },
  mounted() {
    getAllCategory().then(res => {
      this.categoryData[0].categoryChild = res.data
    })
  },
  methods: {
    a(data, msg) {
      if (data.categoryId === 0 && data.categoryName === '根目录' && (msg === '删除' || msg === '编辑')) {
        this.$message(`根目录无法${msg}`)
      } else {
        console.log(data)
      }
    },
    filterNode(value, data) {
      if (!value) return true
      return data.categoryName.indexOf(value) !== -1
    }
  }
}
</script>

