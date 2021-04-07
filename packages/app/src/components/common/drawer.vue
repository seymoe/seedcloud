<template>
  <el-drawer
    :title="title"
    :size="width"
    :before-close="handleClose"
    v-model="dialog"
    direction="rtl"
    custom-class="sd-drawer"
    ref="drawer"
  >
    <div class="sd-drawer__content">
      <el-scrollbar>
        <slot />
      </el-scrollbar>
    </div>
    <div class="sd-drawer__footer">
      <el-button @click="cancelDrawer">取 消</el-button>
      <el-button type="primary" @click="submitDrawer" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'drawer',
  props: {
    title: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 460
    },
    cancel: {
      type: Function,
      default: null
    },
    submit: {
      type: Function,
      default: null
    },
    beforeSubmit: {
      type: Function,
      default: null
    },
  },
  setup(props) {
    const loading = ref(false)
    const dialog = ref(true)
    return {
      title: props.title,
      cancel: props.cancel,
      submit: props.submit,
      beforeSubmit: props.beforeSubmit,
      loading,
      dialog
    }
  },
  methods: {
    cancelDrawer() {
      if (typeof this.cancel !== 'function') {
        this.loading = false
        return
      }
      this.cancel(this)
    },
    async submitDrawer() {
      if (typeof this.submit !== 'function') {
        this.loading = false
        return
      }
      const result = await this.submit(this)
      if (result !== false) {
        this.loading = false
        this.$refs.drawer.closeDrawer()
      }
    },
    async handleClose(done) {
      if (typeof this.beforeSubmit !== 'function') {
        done()
        return
      }
      let result = await this.beforeSubmit(this)
      if (result) done()
    }
  }
})
</script>

<style lang="scss">
.sd-drawer{
  .el-drawer__header{
    margin-bottom: 15px;
    padding: 15px 15px 0;
  }
  .el-drawer__body{
    height: calc(100% - 60px);
  }
  .sd-drawer__content{
    height: calc(100% - 62px);
    .el-scrollbar{
      height: 100%;
      .el-scrollbar__view{
        padding-left: 15px;
        padding-right: 15px;
        box-sizing: border-box;
      }
    }
  }
  .sd-drawer__footer{
    padding: 15px;
    text-align: right;
  }
}
</style>
