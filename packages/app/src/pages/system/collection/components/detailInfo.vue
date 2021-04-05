<template>
  <div class="detail-info">
    <el-form ref="form" label-position="top" :model="form" label-width="80px">
      <el-form-item label="数据表名称">
        <el-input v-model="form.showName"></el-input>
      </el-form-item>
      <el-form-item label="数据库表名">
        <el-input v-model="form.tableName"></el-input>
      </el-form-item>
      <el-form-item label="数据表简介">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
    </el-form>
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
    const form = reactive(props.info || {
      tableName: '',
      showName: '',
      description: ''
    })
    return {
      form
    }
  },
})
</script>
