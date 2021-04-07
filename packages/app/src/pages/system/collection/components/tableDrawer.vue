<template>
  <sd-drawer
    :title="title"
    :cancel="handleClose">
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
  </sd-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
  setup() {
    const title = ref('新增数据表')
    const form = reactive({
      tableName: '',
      showName: '',
      description: ''
    })
    return {
      title,
      form
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    }
  }
})
</script>
