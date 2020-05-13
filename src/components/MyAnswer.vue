<template>
	<div>
		<div class="list" v-show="!show">
			<div class="content" v-for="(item,index) in myAnswer" :key="index" @click="gotoDetail(item.question.id)">
				<div class="a-content">
					<div class="question-content">
						<span>{{handleContent(item.question.content)}}</span>
					</div>
					<div class="bottom">
						<div style="margin-top: 10px;">
							<div class="shang" style="display: flex;">
								<div class="avatar" style="margin-right: 10px;">
									<img :src="item.user.headUrl" />
								</div>
								<div class="name" style="margin-top: 3px;">
									<span>{{item.user.userName}}</span></br>
									<span style="color: rgb(109,109,109);">{{item.time}}</span>
								</div>
							</div>
							<div class="xia">
								<span>{{item.content}}</span>
							</div>
						</div>
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
				<span >暂无内容</span>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		Message
	} from 'element-ui';
	export default {
		name: 'myAnswer',
		data() {
			return {
				loginUser: JSON.parse(localStorage.getItem('login_key')),
				myAnswer: [],
				show: false,
				totalRecord: 0,
				currPage: 1,
				pageSize: 6,
			}
		},
		mounted: function() {
			this.getMyAnswer();
		},
		methods: {
			getMyAnswer: function() {
				var _this = this;
				console.log('getMyAnswer');
				_this.$http({
					method: 'GET',
					url: this.apiServer+'api/user/getMyReplyById',
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
						_this.myAnswer = res.data.data;
						_this.totalRecord=res.data.total;
						if (_this.myAnswer.length == 0) {
							_this.show = true;
						}
					} else {
						Message({
							message: '数据加载失败!！',
							type: 'error',
						});
					}
				})
			},
			gotoDetail: function(id) {
				this.$router.push({
					path: '/askDetail',
					query: {
						id: id
					}
				});
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
			sel() {
				console.log(this.value);
				console.log(this.value2);
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				var _this = this;
				_this.pageSize = val;
				_this.getMyAnswer();
			},
			handleCurrentChange(val) {
				console.log(`第${val}页 `);
				var _this = this;
				_this.currPage = val;
				_this.getMyAnswer();
			},
		}
	}
</script>

<style scoped>
	.question-content span {
		font-size: 17px;
	}

	.bottom span {}

	.content {
		width: 100%;
		/* border-top: 3px solid rgb(114, 114, 114); */
		/* border-bottom: 3px solid rgb(114, 114, 114); */
		margin-bottom: 5px;
		width: 100%;cursor: pointer;
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
		width: 45px;
		line-height: 25px;
		text-align: center;
		border-radius: 4px;
		margin-right: 5px;
	}
	.a-content{
		width: 95%;
		padding-top: 10px;
		padding-bottom: 10px;
		margin: 0 auto;
	}
	.question-content{
		margin-bottom: 10px;
		width:100%;
	}
	.none-text{
		width: 50%;
		margin: 0 auto;
		margin-top: 150px;
		text-align: center;
	}
	.bottom{
		border-top: 1px solid rgb(114,114,114);
	}
	.xia{
		margin-left: 50px;
		margin-right: 20px;
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
	.bottom img{
		height: 40px;
		width: 40px;
		border-radius: 50%;
	}
</style>
