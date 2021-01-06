<template>
	<el-dialog title="新增项目" :visible="dialogVisible">
	  <el-form :model="form">
	    <el-form-item label="项目名称">
	      <el-input v-model="form.name" autocomplete="off"></el-input>
	    </el-form-item>
	    <el-form-item label="项目描述">
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
	props: {
		property: {
			type: Object,
			default: () => ({})
		}
	},
	data() {
		return {
			dialogVisible: true,
			form: {
				name: '',
				remark: '',
				collections: []
			}
		}
	},
	methods: {
		submit() {
			this.$emit('save-project', this.form)
		}
	},
	mounted() {
		if (this.property._id) {
			this.form = this.property
		}
	}
}
</script>

<style>
</style>
