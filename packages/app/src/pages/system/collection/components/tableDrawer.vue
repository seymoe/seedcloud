<template>
  <sd-drawer
    :title="title">
    <h1>ahah</h1>
  </sd-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const title = ref('新增数据表')
    return {
      title
    }
  },
})
</script>
