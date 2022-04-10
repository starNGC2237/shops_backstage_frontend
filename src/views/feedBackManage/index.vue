<template>
  <el-table
    :data="tableData"
  />
</template>

<script>
import { allFeedBack } from '@/api/feedBackManage'
export default {
  name: 'FeedbackManage',
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      allFeedBack(res => {
        this.tableData = res.data
      }).then().catch().finally()
    }
  }
}
</script>

<style scoped lang="scss">

</style>
