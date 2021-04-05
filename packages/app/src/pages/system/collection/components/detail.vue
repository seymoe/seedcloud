<template>
  <div class="page-detail section-radius">
    <el-tabs type="card" v-model="activeName" @tab-click="handleTabClick">
      <el-tab-pane label="信息" name="info">
        <detail-info :info="table"></detail-info>
      </el-tab-pane>
      <el-tab-pane label="字段" name="field">
        <detail-field :info="table"></detail-field>
      </el-tab-pane>
      <el-tab-pane label="视图" name="view"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import DetailInfo from './detailInfo.vue'
import DetailField from './detailField.vue'

export default defineComponent({
  props: {
    table: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    let activeName = ref('info')
    let handleTabClick = (tab, event) => {
      console.log(tab, event)
    }
    return {
      activeName,
      handleTabClick,
      table: props.table
    }
  },
  components: {
    DetailInfo,
    DetailField
  }
})
</script>

<style lang="scss" scoped>
.page-detail{
  margin-top: 15px;
  padding-top: 15px;
}
</style>