import { createStore } from 'vuex'

interface IUser {
  username?: string
  nickname?: string
  phone?: string
}

interface ISystem {
  menus: any[],
  currentMenu: any
}

const UserStore = {
  state: (): IUser => {
    return {
      username: '',
      nickname: '',
      phone: ''
    }
  },
  mutations: {
    SET_USER(state: IUser, payload: IUser) {
      state = {
        ...state,
        ...payload
      }
    }
  }
}

const systemStore = {
  state: (): ISystem => {
    return {
      menus: [
        {
          id: 1,
          type: 1,
          title: '系统配置',
          icon: 'el-icon-location',
          href: '/system',
          children: [
            {
              id: 2,
              type: 2,
              title: '系统配置',
              icon: '',
              href: '/system/config'
            },
            {
              id: 3,
              type: 2,
              title: '数据表配置',
              icon: '',
              href: '/system/collection'
            },
            {
              id: 4,
              type: 2,
              title: '菜单配置',
              icon: '',
              href: '/system/menu'
            },
            {
              id: 5,
              type: 2,
              title: '权限配置',
              icon: '',
              href: '/system/auth'
            }
          ]
        }
      ],
      currentMenu: null
    }
  },
  mutations: {
    SET_CMENU(state: ISystem, payload: any) {
      state.currentMenu = payload
    }
  }
}

export default createStore({
  modules: {
    user: UserStore,
    system: systemStore
  }
})