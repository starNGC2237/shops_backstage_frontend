<template>
  <div class="good_info">
    <el-form
      ref="form"
      :model="form"
      label-position="top"
    >
      <el-form-item label="商品图片">
        <div style="display: flex">
          <el-upload
            class="upload-demo"
            action=""
            :http-request="()=>{}"
            :on-change="handleChange"
            :multiple="false"
            :show-file-list="false"
          >
            <el-image v-if="!!form.imageUrl" style="width: 150px;" :src="form.imageUrl" alt="" />
            <el-button type="text">{{ !!form.imageUrl?"修改图片":"添加图片" }}</el-button>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item v-if="!!this.$route.params.good" label="商品ID">
        <el-input v-model="form.goodId" />
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="form.goodName" />
      </el-form-item>
      <el-form-item label="商品标题">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="商品简介">
        <el-input v-model="form.content" />
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input v-model="form.price" type="number" />
      </el-form-item>
      <el-form-item v-if="!!this.$route.params.good" label="创建时间">
        <el-input v-model="form.createTime" disabled />
      </el-form-item>
      <el-form-item label="一级分类">
        <el-select v-model="form.category1" value-key="categoryId">
          <el-option
            v-for="item in category1"
            :key="item.categoryId"
            :value="item"
            :label="item.categoryName"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          v-model="form.category2"
          value-key="categoryId"
        >
          <el-option
            v-for="item in category2"
            :key="item.categoryId"
            :value="item"
            :label="item.categoryName"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          v-model="form.category3"
          value-key="categoryId"
        >
          <el-option
            v-for="item in category3"
            :key="item.categoryId"
            :value="item"
            :label="item.categoryName"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="judge">{{ form.goodId?'修改':'新建' }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addGood, addImage } from '@/api/goodManage/goodManage'
import { mapCategory } from '@/api/categorys/categoryTree'

export default {
  name: 'GoodInfo',
  data() {
    return {
      disabled: false,
      form: {
        goodName: '',
        title: '',
        imageUrl: '',
        content: '',
        price: '',
        category1: {
          categoryId: '',
          categoryName: ''
        },
        category2: {
          categoryId: '',
          categoryName: ''
        },
        category3: {
          categoryId: '',
          categoryName: ''
        }
      },
      categoryData: []
    }
  },
  computed: {
    category1() { return this.categoryData.filter(item => item.categoryLevel === 1) },
    category2() {
      return this.categoryData.filter(item => {
        return item.categoryLevel === 2 && item.categoryParent === this.form.category1.categoryId
      })
    },
    category3() {
      return this.categoryData.filter(item => {
        return item.categoryLevel === 3 && item.categoryParent === this.form.category2.categoryId
      })
    }
  },
  mounted() {
    if (this.$route.params.good) {
      Object.assign(this.form, this.$route.params.good)
      this.form.category1 = {
        categoryId: this.$route.params.good.category1Id,
        categoryName: this.$route.params.good.category1Name
      }
      this.form.category2 = {
        categoryId: this.$route.params.good.category2Id,
        categoryName: this.$route.params.good.category2Name
      }
      this.form.category3 = {
        categoryId: this.$route.params.good.category3Id,
        categoryName: this.$route.params.good.category3Name
      }
      this.$route.meta.title = '修改商品'
      this.disabled = true
    } else {
      this.$route.meta.title = '添加商品'
    }
    mapCategory().then(res => {
      this.categoryData = res.data
    })
  },
  methods: {
    // 将上传图片的原路径赋值给临时路径
    handleChange(file) {
      this.form.imageUrl = null
      // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
      if (window.createObjectURL !== undefined) { // basic
        this.form.imageUrl = window.createObjectURL(file.raw)
      } else if (window.URL !== undefined) { // mozilla(firefox)
        this.form.imageUrl = window.URL.createObjectURL(file.raw)
      } else if (window.webkitURL !== undefined) { // webkit or chrome
        this.form.imageUrl = window.webkitURL.createObjectURL(file.raw)
      }
    },
    judge() {
      if (this.form.imageUrl !== '') {
        if (this.$route.meta.title === '添加商品') {
          const data = {
            category1Id: this.form.category1.categoryId || null,
            category1Name: this.form.category1.categoryName || null,
            category2Id: this.form.category2.categoryId || null,
            category2Name: this.form.category2.categoryName || null,
            category3Id: this.form.category3.categoryId || null,
            category3Name: this.form.category3.categoryName || null,
            content: this.form.content || undefined,
            goodName: this.form.goodName || undefined,
            price: parseInt(this.form.price, 10) || undefined,
            title: this.form.title || undefined
          }
          addGood(data).then(res => {
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
            this.addImage(res.data)
          }).finally(() => {
            this.$router.push({ path: '/goodManage/goods' })
          })
        } else if (this.$route.meta.title === '修改商品') {
        // todo
        }
      } else {
        this.$message.warning('请添加商品图片')
      }
    },
    addImage(goodId) {
      const blob = new Blob([this.form.imageUrl], {
        type: 'text/plain'
      })
      // todo 上传文件
      addImage(goodId, blob).then().catch().finally()
    }
  }
}
</script>

<style scoped>
.good_info{
  padding: 1rem 4rem;
}
</style>
