'use strict';

const db = uniCloud.database()
const dbCmd = db.command
const $ = db.command.aggregate
const DataDictionary = db.collection("seed_dictionary")

function resetName(list, name, vm) {
	if (list.length == 0) {
		return name
	}
	if (vm.utils.isNull(name)) {
		return list[0].name
	}
	let index = list.findIndex(item => item.name == name)
	return index == -1 ? list[0].name : name
}

module.exports = {

	async save(e) {
		let { utils, ctx } = this
		let data = this.params
		let ex = utils.findFirst(await DataDictionary.where({
			name: data.name
		}).limit(1).get())
		if (utils.isRepeat(ex, data._id)) {
			return utils.failed('项目名称已存在')
		}
		data.updatedAt = Date.now()
		if (!data._id) {
			data.createdAt = Date.now()
			let doc = await DataDictionary.add(data)
			return ctx.res.success(doc)
		}
		let doc = await utils.updateById(DataDictionary, data)
		return ctx.res.success(doc)
	},

	async remove(e) {
		let id = this.params.id
		await DataDictionary.doc(id).remove()
		return this.ctx.res.success()
	},

	async info(res) {
		let {
			name
		} = this.params
		let list = this.utils.find(await DataDictionary.field({
			name: true
		}).orderBy("createdAt", "desc").get())
		name = resetName(list, name, this)
		let data = this.utils.isNull(name) ? {} : this.utils.findFirst(await DataDictionary.where({
			name
		}).limit(1).get())
		return this.ctx.res.success({
			project: data,
			list
		})
	}
}
