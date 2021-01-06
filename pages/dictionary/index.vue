<template>
	<layout>
		<el-row type="flex" justify="space-between" align="middle">
			<el-col :span="4">
				<p>数据字典</p>
			</el-col>
			<el-col :span="8">
				<el-button type="primary" @click="handleEditProject">编辑项目</el-button>
				<el-button type="primary" @click="handleAddProject">新增项目</el-button>
				<el-button type="primary" @click="addCollection">新增集合</el-button>
			</el-col>
		</el-row>
		<!-- 当前选中的项目 -->
		<el-card class="project-card">
		  <div slot="header" class="clearfix">
		    <span>{{project.name}}</span>
		    <el-button style="float: right; padding: 3px 0" type="text">删除</el-button>
		  </div>
		  <div class="project-content">
				<div class="collection" v-for="(co, index) in project.collections" :key="index">
					<el-row type="flex" justify="space-between">
						<el-col :span="2">
							{{co.name}} {{co.remark}}
						</el-col>
						<el-col :span="2">
							<el-button type="primary" icon="el-icon-plus">新增字段</el-button>
						</el-col>
					</el-row>
					<el-table
					    :data="co.collections"
					    border
					    style="width: 100%">
					    <el-table-column
					      fixed
					      prop="fieldName"
					      label="字段名"
					      width="150">
					    </el-table-column>
					    <el-table-column
					      prop="fieldType"
					      label="字段类型"
					      width="120">
					    </el-table-column>
					    <el-table-column
					      prop="remark"
					      label="字段说明"
					      width="120">
					    </el-table-column>
					    <el-table-column
					      fixed="right"
					      label="操作"
					      width="100">
					      <template slot-scope="scope">
					        <el-button type="text">编辑</el-button>
					        <el-button type="text">删除</el-button>
					      </template>
					    </el-table-column>
					  </el-table>
				</div>
			</div>
		</el-card>
		
		<!-- <block slot="titleRight">
			<view class="clear">
				<view class="fl" :class="{'mb10 w100p' : !isPc}">
					<selects titleWidth="0" :noPadding="true" :list="projectList" :value="project.name" valueKey="name" titleKey="name"
					 @change="changeproject"></selects>
				</view>
				<view class="fl">
					<auth url="admin/base-dataDictionary/save">
						<view class="btn line flex" @tap="showAlert('project',project)" v-if="project.name">
							<text class="bIcon-editSquare mr5"></text>
							编辑项目
						</view>
						<view class="btn flex" @tap="showAlert('project')">
							<text class="bIcon-addCircle mr5"></text>
							新增项目
						</view>
						<view class="btn flex" @tap="showAlert('collection')" v-if="project.name">
							<text class="bIcon-addCircle mr5"></text>
							新增集合
						</view>
					</auth>
				</view>
			</view>
		</block>
		<alerts width="500px" height="350px" :title="`${data._id?'编辑项目信息':'新增项目'}`" ref="project">
			<form @submit="saveproject">
				<view>
					<inputs name="name|项目名称" title="项目名称" :value="data.name"></inputs>
					<inputs name="remark" title="项目说明" :value="data.remark" placeholder="选填"></inputs>
				</view>
				<labels class="mt40">
					<inputs type="hidden" name="_id" :value="data._id" v-if="data._id"></inputs>
					<button class="btn greenBg w80" form-type="submit">{{ !data._id ? '保存' : '修改'}}</button>
					<button class="btn grayBg line w80" @tap="$refs.project.hide">取消</button>
				</labels>
			</form>
		</alerts>
		<alerts width="500px" height="350px" :title="`${index > -1?'编辑集合信息':'新增集合'}`" ref="collection">
			<form @submit="saveCollection">
				<view class="">
					<inputs name="name|集合名称" title="集合名称" :value="data.name"></inputs>
					<inputs name="remark|集合说明" title="集合说明" :value="data.remark"></inputs>
				</view>
				<labels class="mt40">
					<button class="btn greenBg w100" form-type="submit">{{ index > -1 ? '修改' : '保存'}}</button>
					<button class="btn grayBg line w100" v-if="index > -1" @tap="removeCollection(index)">删除集合</button>
				</labels>
			</form>
		</alerts>
		<alerts width="810px" height="450px" :title="`${data._id?'编辑字段信息':'新增字段'}`" ref="fields">
			<form @submit="saveFields">

				<view>

					<inputs name="name|字段名称" title="字段名称" :value="data.name"></inputs>
					<radios name="type|字段类型" title="字段类型" :value="data.type" valueKey="title" :list="typeList"></radios>
					<inputs name="remark|字段说明" title="字段说明" :value="data.remark"></inputs>

				</view>

				<labels class="mt40">
					<inputs type="hidden" name="_id" :value="data._id" v-if="data._id"></inputs>
					<button class="btn greenBg w80" form-type="submit">{{ !data._id ? '保存' : '修改'}}</button>
					<button class="btn grayBg line w80" @tap="$refs.fields.hide">取消</button>
				</labels>

			</form>
		</alerts> -->
		<component
			:is="children"
			:property="property"
			@close="handleClose"
			@save-project="handleSaveProject"
			@add-collection="handleAddCollection"
			@edit-collection="handleEditCollection"
			@add-field="handleAddField"
			@edit-field="handleEditField"></component>
	</layout>
</template>

<script>
	import ProjectDialog from './components/projectDialog'
	import FieldDialog from './components/fieldDialog'
	import CollectionDialog from './components/collectionDialog'
	
	export default {
		components: {
			ProjectDialog,
			FieldDialog,
			CollectionDialog
		},
		data() {
			return {
				property: {},
				children: '',
				storageName: "base-projectName",
				loading: true,
				action: 'admin/dataDictionary/info',
				projectList: [],
				project: {
					_id: '',
					name: "",
					remark: "",
					collections: []
				},
				data: {},
				index: -1,
				fIndex: -1,
				isPc: uni.getSystemInfoSync().windowWidth > 476
			}
		},
		onShow() {
			this.loadproject();
		},

		methods: {
			handleAddProject() {
				this.property = {}
				this.children = ProjectDialog
			},
			handleEditProject() {
				this.property = this.project
				this.children = ProjectDialog
			},
			addCollection() {
				this.property = {}
				this.children = CollectionDialog
			},
			editCollection() {
				this.property = this.project
				this.children = CollectionDialog
			},
			handleClose(refresh) {
				this.children = ''
				if (refresh) {
					this.loadproject()
				}
			},
			// 保存项目
			async handleSaveProject(formData) {
				try {
					let result = await this.$sdcAxios.request({
						url: 'admin/dataDictionary/save',
						data: {
							...formData
						}
					})
					console.log(result)
					if (formData._id) {
						this.$message.success('编辑成功')
					} else {
						this.$message.success('添加成功')
					}
					this.project = result.data
					this.handleClose(true)
				} catch (e) {
					console.log(e)
				}
			},
			changeproject: function(e) {
				uni.setStorageSync(this.storageName, e.detail.value);
				this.loading = true;
				this.loadproject();
			},

			loadproject: function(e) {
				this.loading = true
				this.$sdcAxios.request({
					url: this.action,
					data: {
						name: this.project.name
					}
				}).then(res => {
					console.log(res)
					this.projectList = res.data.list
					this.project = res.data.project
					this.loading = false
				}).catch(err => {
					this.loading = false
				})
			},
			saveCollection: function(e) {
				var {
					fail,
					data
				} = this.bcc.checkData(e);
				if (fail) return;
				if (!this.bcc.isArray(this.project.collections)) {
					this.project.collections = [];
				}
				if (this.index > -1) {
					Object.assign(this.project.collections[this.index], data);
				} else {
					this.project.collections.push(data);
				}
				this.save();
				this.$refs.collection.hide();
			},

			saveFields: function(e) {
				var {
					fail,
					data
				} = this.bcc.checkData(e);
				if (fail) return;
				if (!this.bcc.isArray(this.project.collections[this.index].fields)) {
					this.project.collections[this.index].fields = [];
				}
				if (this.fIndex > -1) {
					this.project.collections[this.index].fields[this.fIndex] = data;
				} else {
					this.project.collections[this.index].fields.push(data);
				}
				this.save();
				this.$refs.fields.hide();
			},

			save: function(isDelete) {
				uni.showLoading({
					title: !isDelete ? "保存中…" : "删除中…"
				});
				this.bcc.call({
					url: 'admin/base-dataDictionary/save',
					data: this.project,
					success: res => {
						uni.showToast({
							title: !isDelete ? '保存成功' : '删除成功',
							icon: 'success'
						});
						this.bcc.clearCache(this.action);
						this.loadproject();
					}
				});
			},

			showAlert: function(ref, data = {}, index = -1, fIndex = -1) {
				this.data = data;
				this.index = index;
				this.fIndex = fIndex;
				this.$refs[ref].show();
			},

			removeCollection: function(index) {
				uni.showModal({
					title: '提示',
					content: '确认删除该集合及其所有字段吗？',
					confirmColor: '#07c160',
					success: (e) => {
						if (e.confirm) {
							this.project.collections.splice(index, 1);
							this.save(true);
							this.$refs.collection.hide();
						}
					}
				});
			},

			removeField: function(index, fIndex) {
				uni.showModal({
					title: '提示',
					content: '确认删除该字段吗？',
					confirmColor: '#07c160',
					success: (e) => {
						if (e.confirm) {
							this.project.collections[index].fields.splice(fIndex, 1);
							this.save(true);
						}
					}
				});
			},

			removeproject: function(e) {
				uni.showModal({
					title: '提示',
					content: '确认删除该项目以及所有的集合吗？',
					confirmColor: '#07c160',
					success: (e) => {
						if (e.confirm) {
							this.bcc.call({
								url: 'admin/base-dataDictionary/delete',
								data: {
									id: this.project._id
								},
								success: res => {
									uni.showToast({
										title: '删除成功',
										icon: 'success'
									});
									uni.removeStorageSync(this.storageName);
									this.bcc.clearCache(this.action);
									this.loadproject();
								}
							});
						}
					}
				});
			},
		}
	}
</script>
