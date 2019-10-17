<template>
	<div style="background-color: #FFFFFF;">
		<div class="container">
			<!-- <div>{{loginuser}}</div> -->
			<div class="kuai" v-for="(item,index) in questions" :key="index" >
				<div class="shang" @click="gotoDetail(item.id)">
					<img :src="item.user.headUrl" class="shang_img">
					<router-link to="" class="shang_text" style="display: flex;">
						<p style="margin-right:13px;">{{item.user.userName}}</p>
						<p style="padding-top:1px;">{{item.time}}</p>
					</router-link>
				</div>
				<div class="xia" @click="gotoDetail(item.id)">
					<div class="content">
						<span>{{handleContent(item.content)}}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="block" style="text-align: center;margin-top: 20px;padding-bottom: 20px;">
			<el-pagination 
			background layout="prev, pager, next,jumper" :total="totalRecord"
			:page-size="pageSize" :current-page="currPage"
			@current-change="handleCurrentChange"
			>
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import { Message } from 'element-ui';
	export default {
		name: 'Expert_question',
		data() {

			return {
				id:0,
				loginuser:{},
				questions: [],
				totalRecord: 0,
				currPage: 1,
				pageSize: 15
			}
		},
		mounted: function() {
			this.getId();
			this.getUserInfo();
			this.getQuestionList();
		},
		created: function() {
			const loading = this.$loading({
				lock: true,
				text: '加载中',
				spinner: 'el-icon-loading',
				background: 'rgb(250,250,250)',
				target: '.content',
				customClass: 'mask'
			});
			setTimeout(() => {
				loading.close()
			}, 1000);
		},
		methods: {
			getId: function() {
				var _this = this;
				_this.id = _this.$route.query.id;
			},
			handleContent:function(content){
				content = content.replace(/(\n)/g, "");
				content = content.replace(/(\t)/g, "");
				content = content.replace(/(\r)/g, "");
				content = content.replace(/<\[^>]*>/g, "");
				content = content.replace(/\s*/g, "");
				if(content.length>100){
					return content.substring(0,100)+'...[详情]';
				}else{
					return content.substring(0,100)	
				}
		    },

			getUserInfo:function(){
				var _this=this;
				const user=localStorage.getItem('login_key');
				var loginKey=JSON.parse(user);
				if(loginKey){
					_this.loginuser={
						userId:loginKey.userId,
					}
				}else{
					_this.loginuser={
						login:false
					}
				}
			},
			getQuestionList: function() {
				var _this = this;
				_this.$http({
					methods: 'GET',
					url: this.apiServer+'api/expert/getExpertQuestionList',
					header: {
						'content-type': 'application/json'
					},
					params:{
						currPage: _this.currPage,
						pageSize: _this.pageSize,
						id:_this.id
					}
				}).then(function(res) {
					if (res.data.code == 0) {
						_this.totalRecord = res.data.total;
						_this.questions = res.data.data;
					} else {
						alert('数据加载失败！');
					}
				})
			},
			gotoDetail: function(id) {
				var _this=this;
				if(_this.loginuser.login == false){
					_this.$confirm('抱歉您还未登录，不能查看详情，请先登录。点击确定登录。', '提醒', {
							distinguishCancelAndClose: true,
							confirmButtonText: '确定',
							cancelButtonText: '取消'
						})
						.then(() => {
							_this.$router.push('/sign');
						})
						.catch(action => {
							_this.$message({
								type: 'info',
								message: action === 'cancel' ?
									'已放弃登录' :
									'停留在当前页面'
							})
						});
				}else{
					_this.$router.push({
						path: '/expert_QuestionDetail',
						query: {
							id: id
						}
					});
				}
			},
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
			sel() {
				console.log(this.value);
				console.log(this.value2);
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				var _this = this;
				_this.pageSize = val;
				_this.getQuestionList();
			},
			handleCurrentChange(val) {
				console.log(`第${val}页 `);
				var _this = this;
				_this.currPage = val;
				_this.getQuestionList();
			},
		}
	}
</script>

<style scoped>
	.container {
		/* margin-left: 163px; */
		/* margin-right: 163px; */
		background-color: #FFFFFF;
		margin-top: 10px;
	}
	.kuai {
		border-bottom: 2px solid #fafafa;
		padding-top: 20px;
		padding-bottom: 20px;
		padding-left: 4%;
		padding-right: 4%;
		cursor: pointer;
	}

	.shang {
		display: flex;
		width: 100%;
		/* padding-bottom: 1%; */
	}

	.shang_img {
		border-radius: 50%;
		width: 50px;
		height: 50px;
		vertical-align: middle;
		cursor: pointer;
	}

	.shang_text {
		margin-left: 15px;
		text-decoration: none;
		color: rgb(51, 51, 51);
	}

	.xia {
		width: 100%;
		margin-top: 10px;
	}
	.content{
		margin-left: 65px;
		color: rgb(109,109,109);
	}

	.new-btn{
		position: fixed;
		bottom: 70px;
		right: 40px;
		width: 80px;
		height: 80px;
		border-radius: 50%;
		/* background-color: #de533a; */
		background: linear-gradient(40deg, rgb(0,158,1), rgb(0,158,1));
		box-shadow: 2px 5px 10px #D1D1D1;
		font-size: 16px;
		color: #FFFFFF;
		cursor: pointer;
		border: none;
		outline: none;
	}
</style>
