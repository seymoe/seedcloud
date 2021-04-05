<template>
  <el-drawer
    :title="title"
    :before-close="handleClose"
    v-model="dialog"
    direction="rtl"
    custom-class="sd-drawer"
    ref="drawer"
    >
    <div class="sd-drawer__content">
      <slot />
      <div class="sd-drawer__footer">
        <el-button @click="cancelDrawer">取 消</el-button>
        <el-button type="primary" @click="submitDrawer" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
      </div>
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
    async cancelDrawer() {
      if (typeof this.cancel !== 'function') {
        this.loading = false
        this.dialog = false
        return
      }
      const result = await this.cancel(this)
      if (result !== false) {
        this.loading = false
        this.dialog = false
      }
    },
    async submitDrawer() {
      if (typeof this.submit !== 'function') {
        this.loading = false
        this.dialog = false
        return
      }
      const result = await this.submit(this)
      if (result !== false) {
        this.loading = false
        this.dialog = false
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
