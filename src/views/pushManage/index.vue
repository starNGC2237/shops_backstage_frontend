<template>
  <div class="pushManage">
    <h1>推送管理</h1>
    <el-button style="width: fit-content;margin-bottom: 1rem;" type="primacy">新建公告</el-button>
    <el-table
      border
      :data="tableData"
    >
      <el-table-column
        label="是否正在使用"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag>{{ !!scope.row.isUsing?'正在使用':'未使用' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="内容"
        prop="provinceName"
      />
      <el-table-column
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="text" :disabled="!scope.row.isUsing">{{ !!scope.row.isUsing?'使用':'已使用' }}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Push'
}
</script>

<style scoped lang="scss">
.pushManage{
  padding: 1rem;
}
</style>
