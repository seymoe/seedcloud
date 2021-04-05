<template>
  <div class="detail-field">
    <div class="action-bar flex-row">
      <div class="btns">
        <el-button type="primary" icon="el-icon-plus" round>新增</el-button>
        <el-button type="danger" icon="el-icon-delete" round>删除</el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="showName"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="name"
        label="字段名称">
      </el-table-column>
      <el-table-column
        prop="type"
        label="字段类型">
      </el-table-column>
      <el-table-column
        prop="action"
        label="操作"
        width="100"
        align="center">
        <template #default="scope">
          <el-button icon="el-icon-edit" round @click="showDetail(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    let tableData = [{
      name: 'name',
      showName: '名称',
      type: 1
    },{
      name: 'age',
      showName: '年龄',
      type: 1
    }]

    let multipleSelection = reactive([])
    let handleSelectionChange = (val) => {
      multipleSelection = val
    }
    return {
      tableData,
      multipleSelection,
      handleSelectionChange
    }
  },
})
</script>
