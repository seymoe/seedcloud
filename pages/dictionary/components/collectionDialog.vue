<template>
	<el-dialog title="新增集合" :visible="dialogVisible">
	  <el-form :model="form">
	    <el-form-item label="集合名称">
	      <el-input v-model="form.name" autocomplete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="集合描述">
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
			form: {
				_key: '',
				name: '',
				remark: ''
			}
		}
	},
	methods: {
		async submit() {
			if (this.form._key) {
				// 编辑
				this.$emit('add-collection', this.form)
			} else {
				// 新增
				this.$emit('edit-collection', {
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
