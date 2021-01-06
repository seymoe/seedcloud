'use strict';

const SeedCloud = require('seedcloud')

exports.main = async (event, context) => {
	const fnName = 'api'
	const controllerDir = `${ __dirname }/controller`
	const app = new SeedCloud({
		fnName,
		event,
		context,
		uniID: ''
	})
	//返回数据给客户端
	return await app.listen(controllerDir)
}
