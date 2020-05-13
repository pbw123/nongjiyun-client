<template>
	<div>
		<div class="top">
			<div class="top-text" @click="msg = 0" :class="{ cur: msg === 0 }"><a href="javascript:;" class="nav-item" :class="{ cur1: msg === 0 }">快速提问</a></div>
			<div class="top-text" @click="msg = 1" :class="{ cur: msg === 1 }"><a href="javascript:;" class="nav-item" :class="{ cur1: msg === 1 }">专家提问</a></div>
		</div>
		<div v-show="msg===0">
			<div class="list" v-show="!show">
				<div class="content" v-for="(item,index) in follows" :key="index">
					<div class="f-content" @click="gotoDetail(item.questionId,loginUser.userId)">
						<div class="question-content">
							<div class="sort">
								<span style="color: #FFFFFF;">{{item.question.sort}}</span>
							</div>
							<div class="q-content">
								<span>{{handleContent(item.question.content)}}</span>
							</div>
						</div>
						<div class="bottom">
							<span style="margin-right: 20px;">{{handleTime(item.question.createTime)}}</span>
							<span style="margin-left: 50px;">回复数：{{item.question.replyAmount}}</span>
						</div>
					</div>
				</div>
				<div class="block">
					<el-pagination
					background layout="prev, pager, next,jumper" :total="totalRecord"
					:page-size="pageSize" :current-page="currPage"
					@current-change="handleCurrentChange"
					>
					</el-pagination>
				</div>
			</div>
			<div class="none" v-show="show">
				<div class="none-text">
					<div class="img">
						<img src="/static/铁锹.png" style="height: 70px;width: 70px;" />
					</div>
					<span>暂无内容</span>
				</div>
			</div>
		</div>
		<div v-show="msg===1">
			<div class="list" v-show="!show_e">
				<div class="content" v-for="(item,index) in follows_e" :key="index">
					<div class="f-content" @click="gotoExpertAskDetail(item.expertQuestion.id)">
						<div class="question-content">
							<div class="sort">
								<span style="color: #FFFFFF;">{{item.expertQuestion.sort}}</span>
							</div>
							<div class="q-content">
								<span>{{handleContent(item.expertQuestion.content)}}</span>
							</div>
						</div>
						<div class="bottom">
							<span style="margin-right: 20px;">{{item.expertQuestion.time}}</span>
							<!-- <span style="color: rgb(109,109,109);margin-left: 50px;">回复数：{{item.question.replyAmount}}</span> -->
						</div>
					</div>
				</div>
				<div class="block">
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
					<span>暂无内容</span>
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
		name: 'myFollow',
		data() {
			return {
				msg:0,
				loginUser: JSON.parse(localStorage.getItem('login_key')),
				follows: [],
				follows_e:[],
				show: false,
				show_e:false,
				totalRecord: 0,
				currPage: 1,
				pageSize: 10,
				totalRecord_e: 0,
				currPage_e: 1,
			}
		},

		mounted: function() {
			this.getUserFollow();
			this.getExpertAskFollow();
		},
		created: function() {
			this.getUserFollow();
			this.getExpertAskFollow();
		},

		methods: {
			handleTime: function(date) {
				var d = new Date(date);
				var year = d.getFullYear();
				var month = d.getMonth() + 1;
				var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate();
				var hour = d.getHours() < 10 ? '0' + d.getHours() : '' + d.getHours();
				var minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : '' + d.getMinutes();
				var seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : '' + d.getSeconds();
				return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
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
			gotoDetail: function(id,userId) {
				this.$router.push({
					path: '/askDetail',
					query: {
						id: id,
						userId:userId
					}
				});
			},
			gotoExpertAskDetail: function(id) {
				this.$router.push({
					path: '/expert_QuestionDetail',
					query: {
						id: id
					}
				});
			},
			//关注的快速提问
			getUserFollow: function() {
				var _this = this;
				console.log('userId(' + _this.loginUser.userId + ')');
				_this.$http({
					methods: 'GET',
					url: this.apiServer+'api/user/getAttentionByUserId',
					header: {
						'content-type': 'application/json'
					},
					params: {
						userId: _this.loginUser.userId,
						currPage: _this.currPage,
						pageSize: _this.pageSize
					}
				}).then(function(res) {
					if (res.data.code == 0) {
						_this.follows = res.data.data;
						_this.totalRecord=res.data.total;
						console.log(_this.follows);
						if (_this.totalRecord == 0) {
							_this.show = true;
						}
						if(_this.follows.length==0){
							_this.currPage=_this.currPage-1;
							_this.getUserFollow();
						}
					} else {
						alert('数据加载失败！');
					}
				})
			},
			//关注的专家提问
			getExpertAskFollow: function() {
				var _this = this;
				_this.$http({
					methods: 'GET',
					url: this.apiServer+'api/user/getExpertAttenById',
					header: {
						'content-type': 'application/json'
					},
					params: {
						userId: _this.loginUser.userId,
						currPage: _this.currPage_e,
						pageSize: _this.pageSize
					}
				}).then(function(res) {
					if (res.data.code == 0) {
						_this.follows_e = res.data.data;
						_this.totalRecord_e=res.data.total;
						console.log(_this.follows_e);
						if (_this.totalRecord_e == 0) {
							_this.show_e = true;
						}
						if(_this.follows_e.length==0){
							_this.currPage_e=_this.currPage_e-1;
							_this.getExpertAskFollow();
						}
					} else {
						Message({
							message: '专家数据加载失败!！',
							type: 'error',
						});
					}
				})
			},
			sel() {
				console.log(this.value);
				console.log(this.value2);
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				var _this = this;
				_this.pageSize = val;
				_this.getUserFollow();
			},
			handleCurrentChange(val) {
				console.log(`第${val}页 `);
				var _this = this;
				_this.currPage = val;
				_this.getUserFollow();
			},
			handleCurrentChange_e(val) {
				console.log(`第${val}页 `);
				var _this = this;
				_this.currPage_e = val;
				_this.getUserExpertAskFollow();
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

	.q-content {
		width: 90%;
	}
	.f-content{
		width: 97%;
		margin: 0 auto;
		padding-top: 10px;
		padding-bottom: 10px;
		cursor: pointer;
	}
	.question-content{
		display: flex;
		margin-bottom: 25px;
	}
	.none-text{
		width: 50%;
		margin: 0 auto;
		margin-top: 150px;
		text-align: center;
	}
	.none span{
		font-size: 20px;
		color: rgb(109,109,109);
		letter-spacing: 5px;
	}
	.block{
		text-align: center;
		margin-top: 20px;
		padding-bottom: 20px;
	}
	/* .shang {
		display: flex;

	}

	.xia {
		display: flex;
	} */
</style>
