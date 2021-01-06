<template>
	<el-dialog title="新增字段" :visible="dialogVisible">
	  <el-form :model="form">
	    <el-form-item label="字段名称">
	      <el-input v-model="form.fieldName" autocomplete="off"></el-input>
	    </el-form-item>
			<el-form-item label="字段类型">
			  <el-select v-model="form.fieldType">
					<el-option
						v-for="item in typeList"
						:key="item.key"
						:label="item.label"
						:value="item.value"></el-option>
				</el-select>
			</el-form-item>
	    <el-form-item label="字段描述">
	      <el-input type="textarea" v-model="form.remark"></el-input>
	    </el-form-item>
	  </el-form>
	  <div slot="footer" class="dialog-footer">
	    <el-button @click="dialogVisible = false">取 消</el-button>
	    <el-button type="primary" @click="submit">确 定</el-button>
	  </div>
	</el-dialog>
</template>

<script>
export default {
	data() {
		return {
			dialogVisible: true,
			typeList: [
				{
					key: "String",
					value: "String"
				},
				{
					key: "Number",
					value: "Number"
				},
				{
					key: "Boolean",
					value: "Boolean"
				},
				{
					key: "Timestamp",
					value: "Timestamp"
				},
				{
					key: "Object",
					value: "Object"
				},
				{
					key: "Array",
					value: "Array"
				}
			],
			form: {
				_key: '',
				fieldName: '',
				fieldType: 'String',
				remark: ''
			}
		}
	},
	methods: {
		async submit() {
			if (this.form._key) {
				// 编辑
				this.$emit('add-field', this.form)
			} else {
				// 新增
				this.$emit('edit-field', {
					...this.form,
					_key: Math.random().toString(36).substring(2)
				})
			}
		}
	}
}
</script>

<style>
</style>
