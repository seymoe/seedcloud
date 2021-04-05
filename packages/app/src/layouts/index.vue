<template>
  <el-container class="layout-index">
    <el-aside width="230px">
      <div class="sidebar section-radius">
        <div class="logo" @click="router.push('/')">SeedCloud</div>
        <el-menu
          default-active="/system"
          class="menu-vertical"
          :collapse="isCollapse"
          @open="handleOpen"
          @close="handleClose"
          @select="handleSelect"
        >
          <template v-for="menu in menus">
            <el-submenu v-if="menu.children" :key="menu.id" :index="menu.href">
              <template #title>
                <i :class="menu.icon"></i>
                <span>{{ menu.title }}</span>
              </template>
              <el-menu-item
                v-for="submenu in menu.children"
                :key="submenu.id"
                :index="submenu.href"
              >{{ submenu.title }}</el-menu-item>
            </el-submenu>
            <el-menu-item
              v-else
              :key="menu.id"
              :index="menu.href"
            >
              <i :class="menu.icon"></i>
              <template #title>{{ menu.title }}</template>
            </el-menu-item>
          </template>
        </el-menu>
      </div>
    </el-aside>
    <el-container class="layout-index-right">
      <el-header style="height: 50px">
        <el-row type="flex" justify="center">
          <el-col :span="8">
            <h1 class="title">{{ currentMenu ? currentMenu.title : 'SeedCloud' }}</h1>
          </el-col>
          <el-col :span="8">
          </el-col>
          <el-col :span="8">
            <span>Seymoe</span>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref, toRef } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    // 菜单
    const store = useStore()
    const router = useRouter()

    let isCollapse = ref(false)
    let handleOpen = () => {
      isCollapse = ref(true)
    }
    let handleClose = () => {
      isCollapse = ref(false)
    }
    let menus = computed(() => store.state.system.menus)
    let currentMenu = computed(() => store.state.system.currentMenu)
    let handleSelect = (index: string, indexPath: string[]) => {
      if (index) {
        try {
          let cMenu = null
          for (let i:number = 0; i < menus.value.length; i++) {
            let m = menus.value[i]
            if (cMenu) break
            if ( m.href === index) {
              cMenu = m
              break
            }
            if (m.children && m.children.length) {
              for (let j:number = 0; j < m.children.length; j++) {
                let s = m.children[j]
                if (cMenu) break
                if (s.href === index) {
                  cMenu = s
                  break
                }
              }
            }
          }
          store.commit('SET_CMENU', cMenu)
          router.push(index)
        } catch (err) {
          console.log(err)
        }
      }
    }

    return {
      menus,
      currentMenu,
      router,
      isCollapse,
      handleOpen,
      handleClose,
      handleSelect
    }
  }
})
</script>


<style lang="scss" scoped>
.layout-index{
  height: 100%;
  box-sizing: border-box;
  background-color: #f9fafe;
}
.el-aside{
  box-sizing: border-box;
  padding: 15px;
  height: 100%;
}
.sidebar{
  box-sizing: border-box;
  height: 100%;
}
.logo{
  margin-bottom: 15px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}
.menu-vertical{
  border-right: none;
}
// 右侧
.layout-index-right{
  padding: 15px;
  padding-left: 0px;
  .el-header{
    padding: 0 15px;
  }
  .el-main{
    padding: 0 15px;
  }
  .title{
    margin: 0;
    line-height: 50px;
  }
  .el-col{
    height: 50px;
  }
}
</style>