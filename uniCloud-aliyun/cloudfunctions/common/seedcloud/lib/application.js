const Emitter = require('events')
const fs = require('fs')
const Response = require('./response')
const database = require('./utils/database')
const type = require('./utils/type')

function getPathByAction(absolutePath, action) {
  const lastSplit = action ? action.lastIndexOf('/') : -1
  //路径是否指向单函数
  const isDefault = fs.existsSync(`${absolutePath}/${action}.js`)
  const methodName = isDefault ? '' : action.substr(lastSplit + 1)
  const path = isDefault ? action : action.substr(0, action.lastIndexOf('/'))
  return { path, methodName, isDefault }
}

class Application extends Emitter {
  constructor(options) {
    super()
    const { fnName, event, context, uniID } = options
    this.event = event
    this.ctx = context
    this.params = event.params
    this.action = event.action
    this.fnName = fnName
    this.uniID = uniID
    this.token = this.event.uniIdToken
    this.fullPath = `${fnName}/${this.action}`
    this.ROUTES = {}
    this.absolutePath = ''
		this.invokeFn = null

    this.ctx.res = new Response()
    this.debug = true
		this.utils = {
			...database,
			...type
		}
  }

  // 通过控制器路径和操作名获取函数
  getFunction(absPath, action) {
    //禁止使用相对路径访问其他目录
    if (!action || action.indexOf('./') > -1) return
    let { methodName, path, isDefault } = getPathByAction(absPath, action)
    let controller = null
		let { ctx } = this
    try {
      controller = require(`${absPath}/${path}`)
    } catch (e) {
      if (e.code == "MODULE_NOT_FOUND") {
        console.error(`action is undefined : ${action}`)
        return ctx.res.error(this.debug ? `action is undefined : ${action}` : '')
      }
      return ctx.res.error()
    }
    const fn = isDefault ? controller : controller[methodName]
    if (typeof fn != 'function') {
      return ctx.res.error(this.debug ? `action is undefined : ${action}` : '')
    }
    return fn
  }

  // 启动函数监听请求
  async listen(absPath) {
    this.absolutePath = absPath
    this.invokeFn = this.getFunction(this.absolutePath, this.action)
    return await this.invokeFn()
  }
}

module.exports = Application
