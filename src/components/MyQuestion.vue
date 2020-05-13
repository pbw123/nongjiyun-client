<template>
	<div>
		<div class="top">
			<div class="top-text" @click="msg = 0" :class="{ cur: msg === 0 }"><a href="javascript:;" class="nav-item" :class="{ cur1: msg === 0 }">快速提问</a></div>
			<div class="top-text" @click="msg = 1" :class="{ cur: msg === 1 }"><a href="javascript:;" class="nav-item" :class="{ cur1: msg === 1 }">专家提问</a></div>
		</div>
		<div v-show="msg===0">
			<div class="list" v-show="!show_m">
				<div class="content" v-for="(item,index) in myasking" :key="index">
					<div class="q_c">
						<div class="question-content">
							<div class="sort">
								<span style="color: #FFFFFF;">{{item.sort}}</span>
							</div>
							<div class="q-content">
								<span style="cursor: pointer" @click="gotoDetail(item.id,loginUser.userId)">{{handleContent(item.content)}}</span>
							</div>
						</div>
						<div class="bottom" style="">
							<span style="margin-right: 20px;">{{item.time}}</span>
							<el-button type="text" @click="deleteQuestion(item.id)">
								<span style="color: red;cursor: pointer;">删除</span>
							</el-button>
							<span style="margin-left: 50px;">回复数：{{item.replyAmount}}</span>
						</div>
					</div>
				</div>
				<div class="block" v-if="totalRecord>pageSize">
					<el-pagination
					background layout="prev, pager, next,jumper" :total="totalRecord"
					:page-size="pageSize" :current-page="currPage"
					@current-change="handleCurrentChange"
					>
					</el-pagination>
				</div>
			</div>
			<div class="none" v-show="show_m">
				<div class="none-text">
					<div class="img">
						<img src="/static/铁锹.png" style="height: 70px;width: 70px;" />
					</div>
					<span class="zwnr">暂无内容</span>
				</div>
			</div>
		</div>
		<div v-show="msg===1">
			<div class="list" v-show="!show_e">
				<div class="content" v-for="(item,index) in expertAsking" :key="index">
					<div class="e_c">
						<div class="question-content" style="">
							<div class="sort">
								<span style="color: #FFFFFF;" @click="gotoExpertAskDetail(item.id)">{{item.sort}}</span>
							</div>
							<div class="q-content">
								<span style="cursor: pointer" @click="gotoExpertAskDetail(item.id)">{{handleContent(item.content)}}</span>
							</div>
						</div>
						<div class="bottom" style="">
							<span style="margin-right: 20px;" @click="gotoExpertAskDetail(item.id)">{{item.time}}</span>
							<el-button type="text" @click="deleteExpertAsking(item.id)">
								<span style="color: red;cursor: pointer;">删除</span>
							</el-button>
							<!-- <span style="color: rgb(109,109,109);margin-left: 50px;">回复数：{{item.replyAmount}}</span> -->
						</div>
					</div>
				</div>
				<div class="block" v-if="totalRecord_e>pageSize">
					<el-pagination
					background layout="prev, pager, next,jumper" :total="totalRecord_e"
					:page-size="pageSize" :current-page="currPage_e"
					@current-change="handleCurrentChange_e"
					>
					</el-pagination>
				</div>
			</div>
			<div class="none" v-show="show_e">
				<div class="none-text">
					<div class="img">
						<img src="/static/铁锹.png" style="height: 70px;width: 70px;" />
					</div>
					<span class="zwnr">暂无内容</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		Message
	} from 'element-ui';
	export default {
		name: 'myQuestion',
		data() {
			return {
				msg:0,
				loginUser: JSON.parse(localStorage.getItem('login_key')),
				myasking: [],
				expertAsking:[],
				show_m: false,
				show_e:false,
				totalRecord: 0,
				currPage: 1,
				pageSize: 6,
				totalRecord_e: 0,
				currPage_e: 1,
			}
		},
		mounted: function() {
			this.getMyAsking();
			this.getExpertAsking();
		},
		methods: {
			getMyAsking: function() {
				var _this = this;
				console.log('getMyAsking');
				_this.$http({
					method: 'GET',
					url: this.apiServer+'api/user/getQuestionList',
					params: {
						userId: _this.loginUser.userId,
						currPage: _this.currPage,
						pageSize: _this.pageSize
					},
					header: {
						'content-type': 'application/json'
					}
				}).then(function(res) {
					if (res.data.code == 0) {
						_this.myasking = res.data.data;
						_this.totalRecord=res.data.total;
                        if (_this.totalRecord == 0) {
							_this.show_m= true;
						}
						if(_this.myasking.length==0){
							_this.currPage=_this.currPage-1;
							_this.getMyAsking();
						}
					} else {
						Message({
							message: '快速提问数据加载失败!！',
							type: 'error',
						});
					}
				})
			},
			getExpertAsking: function() {
				var _this = this;
				console.log('getExpertAsking');
				_this.$http({
					method: 'GET',
					url: this.apiServer+'api/user/getMyExpertQuestionList',
					params: {
						id: _this.loginUser.userId,
						currPage: _this.currPage_e,
						pageSize: _this.pageSize
					},
					header: {
						'content-type': 'application/json'
					}
				}).then(function(res) {
					if (res.data.code == 0) {
						_this.expertAsking = res.data.data;
						_this.totalRecord_e=res.data.total;
			            if (_this.totalRecord_e == 0) {
							_this.show_e = true;
						}
						if(_this.expertAsking.length==0){
							_this.currPage_e=_this.currPage_e-1;
							_this.getExpertAsking();
						}
					} else {
						Message({
							message: '专家提问数据加载失败!！',
							type: 'error',
						});
					}
				})
			},
			gotoDetail: function(id,userId) {
				this.$router.push({
					path: '/askDetail',
					query: {
						id: id,
						userId:userId
					}
				});
			},
			gotoExpertAskDetail:function(id){
				this.$router.push({
					path: '/expert_QuestionDetail',
					query: {
						id: id
					}
				});
			},
			deleteQuestion: function(qId) {
				var _this = this;
				_this.$confirm('是否要删除该提问?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					console.log('deleteQuestion:qId(' + qId + ')');
					_this.$http({
						method: 'GET',
						url: this.apiServer+'api/question/deleteMyQuestion',
						params: {
							id: qId
						},
						header: {
							'content-type': 'application/json'
						}
					}).then(function(res) {
						if (res.data.code == 0) {
							Message({
								message: '删除成功!！',
								type: 'success',
							});
							_this.getMyAsking();
						} else {
							Message({
								message: '删除失败!！',
								type: 'error',
							});
						}
					});
				}).catch(() => {
					_this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			deleteExpertAsking: function(e_qId) {
				var _this = this;
				_this.$confirm('是否要删除该提问?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					console.log('deleteExpertAsking:e_qId(' + e_qId + ')');
					_this.$http({
						method: 'GET',
						url: this.apiServer+'api/user/delExpertQuestion',
						params: {
							id: e_qId
						},
						header: {
							'content-type': 'application/json'
						}
					}).then(function(res) {
						if (res.data.code == 0) {
							Message({
								message: '删除成功!！',
								type: 'success',
							});
							_this.getExpertAsking();
						} else {
							Message({
								message: '删除失败!！',
								type: 'error',
							});
						}
					});
				}).catch(() => {
					_this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			sel() {
				console.log(this.value);
				console.log(this.value2);
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				var _this = this;
				_this.pageSize = val;
				_this.getMyAsking();
			},
			handleCurrentChange(val) {
				console.log(`第${val}页 `);
				var _this = this;
				_this.currPage = val;
				_this.getMyAsking();
			},
			handleCurrentChange_e(val) {
				console.log(`第${val}页 `);
				var _this = this;
				_this.currPage_e = val;
				_this.getExpertAsking();
			},
			handleContent:function(content){
				content = content.replace(/(\n)/g, "");
				content = content.replace(/(\t)/g, "");
				content = content.replace(/(\r)/g, "");
				content = content.replace(/<\[^>]*>/g, "");
				content = content.replace(/\s*/g, "");
				if(content.length>65){
					return content.substring(0,65)+'...[详情]';
				}else{
					return content.substring(0,65)
				}
			},
		}
	}
</script>

<style scoped>
	.top {
		display: flex;
		height: 50px;
		border-bottom: 1px solid rgb(114, 114, 114);
		line-height: 50px;
	}

	.list_text {
		text-decoration: none;
		color: rgb(109, 109, 109);
		padding: 1em 4em;
	}

	.top-text {
		width: 50%;
		text-align: center;
	}

	.nav-item {
		text-decoration: none;
		color: rgb(109, 109, 109);
		font-size: 16px;
	}

	.cur {
		text-decoration: none;
		color: rgb(0, 158, 1);
		font-size: 16px;
		border-bottom: 3px solid rgb(0, 158, 1);
	}

	.cur1 {
		color: rgb(0, 158, 1);
	}
	.question-content{
		display: flex;
		margin-bottom: 25px;
	}

	.question-content span {
		font-size: 17px;
	}

	.bottom span {
		color: rgb(109,109,109);
	}

	.content {
		width: 100%;
		border-top: 2px solid rgb(244, 244, 244);
		border-bottom: 2px solid rgb(244, 244, 244);
		margin-bottom: 5px;
		background-color: #FFFFFF;
	}

	.list {
		width: 95%;
		margin: 0 auto;
		/* height: 700px; */
		margin-top: 20px;
		margin-bottom: 20px;
	}

	.sort {
		background-color: rgb(233, 102, 53);
		height: 25px;
		width: 10%;
		line-height: 25px;
		text-align: center;
		border-radius: 4px;
		margin-right: 5px;
	}
	.q_c{
		width: 97%;
		margin: 0 auto;
		padding-top: 10px;
	}

	.q-content {
		width: 90%;
	}
	.e_c{
		width: 97%;
		margin: 0 auto;
		padding-top: 10px;
	}
	.block{
		text-align: center;
		margin-top: 20px;
		padding-bottom: 20px;
	}
	.none-text{
		width: 50%;
		margin: 0 auto;
		margin-top: 150px;
		text-align: center;
	}
	.zwnr{
		font-size: 20px;
		color: rgb(109,109,109);
		letter-spacing: 5px;
	}
</style>
