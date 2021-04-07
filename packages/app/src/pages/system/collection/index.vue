<template>
  <div class="page">
    <template v-if="ccomp === 'list'">
      <div class="action-bar flex-row">
        <div class="btns">
          <el-button type="primary" icon="el-icon-plus" round @click="handleAddTable">新增</el-button>
          <el-button type="danger" icon="el-icon-delete" round>删除</el-button>
        </div>
      </div>
      <div class="section-radius">
        <el-table
          :data="tableData"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="showName"
            label="数据表名称">
          </el-table-column>
          <el-table-column
            prop="tableName"
            label="数据库表名">
          </el-table-column>
          <el-table-column
            prop="description"
            label="数据表描述">
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
      <component
        :is="component"
        @close="handleClose"
      />
    </template>
    <template v-else>
      <el-page-header @back="goBack" title="" content="详情">
      </el-page-header>
      <component :is="component" :table="currentRow" />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, shallowRef } from 'vue'
import TableDrawer from './components/tableDrawer.vue'
import Detail from './components/detail.vue'

export default defineComponent({
  setup() {
    let ccomp = ref('list')
    let component = shallowRef('')
    let currentRow = reactive({})

    let tableData = [{
      tableName: 'sd_sysusers',
      showName: '用户',
      description: '超级管理员、系统开发人员、后台管理人员'
    },
    {
      tableName: 'sd_goods',
      showName: '商品',
      description: '供售卖的物品'
    },
    {
      tableName: 'sd_orders',
      showName: '订单',
      description: ''
    }]

    let multipleSelection = reactive([])
    let handleSelectionChange = (val) => {
      multipleSelection = val
    }

    let goBack = () => {
      ccomp.value = 'list'
      component.value = ''
    }

    return {
      ccomp,
      goBack,
      component,
      currentRow,
      tableData,
      multipleSelection,
      handleSelectionChange
    }
  },
  components: {
    TableDrawer,
    Detail
  },
  methods: {
    handleAddTable() {
      this.component = TableDrawer
    },
    showDetail(row) {
      this.ccomp = 'detail'
      this.component = Detail
      this.currentRow = row
    },
    handleClose() {
      this.component = ''
    }
  }
})
</script>
