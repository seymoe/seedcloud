const RESCONST = {
	// 需要登录
	NEED_LOGIN: {
    status: 'NEED_LOGIN',
    msg: '请先登录！'
  },
	// 没有权限
	NO_PERMISSION: {
    status: 'NO_PERMISSION',
    msg: '无权限！'
  },
	// 成功：业务层
	SUCCESS: {
    status: 'OK',
    msg: '请求成功！'
  },
	// 失败：业务层
	FAILED: {
    status: 'FAILED',
    msg: '请求失败！'
  },
	// 系统错误
	ERROR: {
    status: 'ERROR',
    msg: '系统错误!'
  }
}

class Response {
  needLogin(message) {
    return {
      ...RESCONST.NEED_LOGIN,
      msg: message || RESCONST.NEED_LOGIN.msg
    }
  }
  noPermission(message) {
    return {
      ...RESCONST.NO_PERMISSION,
      msg: message || RESCONST.NO_PERMISSION.msg
    }
  }
  success(message) {
    return {
      ...RESCONST.SUCCESS,
      msg: message || RESCONST.SUCCESS.msg
    }
  }
  failed(message) {
    return {
      ...RESCONST.FAILED,
      msg: message || RESCONST.FAILED.msg
    }
  }
  error(message) {
    return {
      ...RESCONST.ERROR,
      msg: message || RESCONST.ERROR.msg
    }
  }
}

module.exports = Response