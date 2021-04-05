<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<style>
html, body{
  padding: 0;
  margin: 0;
  height: 100%;
}
#app{
  height: 100%;
}
.flex-row{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.section-radius{
  padding: 15px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 0 10px 1px rgba(0,0,0,0.03);
}
.action-bar{
  padding: 15px 0;
}
</style>