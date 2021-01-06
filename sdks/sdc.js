	// 返回的状态计划
const RESCONST = {
	// 需要登录
	NEED_LOGIN: 'NEED_LOGIN',
	// 没有权限
	NO_PERMISSION: 'NO_PERMISSION',
	// 成功：业务层
	SUCCESS: 'OK',
	// 失败：业务层
	FAILED: 'FAILED',
	// 系统错误
	ERROR: 'ERROR'
}

function getNameActionByUrl(url) {
	// 约定URL格式为 '[云函数名]/[控制器名]/[方法名]'
	let index = url.indexOf('/')
	return {
		name: index === -1 ? url : url.substr(0, index),
		action: index === -1 ? '' : url.substr(index + 1)
	}
}

// HTTP请求
class SeedAxios {
	constructor() {}
	request(options) {
		const { url, data } = options
		// 通过 url 解析出 fnName 和 action
		const { name, action } = getNameActionByUrl(url)
		
		return uniCloud.callFunction({
			name,
			data: {
				action,
				params: data
			}
		}).then(res => {
			console.log('函数调用结果：', res)
			let data = res.result
			// 接口调用成功
			if (data.status === RESCONST.SUCCESS) {
				return data
			} else {
			}
			return res
		}).catch(err => {
			console.log('函数调用失败：', err)
		})
	}
}

export default {
	SeedAxios
}



