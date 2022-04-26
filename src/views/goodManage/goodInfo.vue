<template>
  <div class="good_info">
    <!--
    {
    "category1Id": 0,
    "category1Name": "string",
    "category2Id": 0,
    "category2Name": "string",
    "category3Id": 0,
    "category3Name": "string",
    "content": "string",
    "createTime": "2022-04-21T12:56:11.240Z",
    "goodId": 0,
    "goodName": "string",
    "imageUrl": "string",
    "number": 0,
    "price": 0,
    "title": "string",
    "userName": "string"
    }
    -->
    <el-form
      ref="form"
      :model="form"
    >
      <el-form-item v-if="!!form.goodId" label="商品ID">
        <el-input v-model="form.goodId" />
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{ form.goodId?'修改':'新建' }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'GoodInfo',
  data() {
    return {
      form: {}
    }
  }
}
</script>

<style scoped>
.good_info{
  padding: 1rem;
}
</style>
