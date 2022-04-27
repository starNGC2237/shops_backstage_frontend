<template>
  <div class="good_info">
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
