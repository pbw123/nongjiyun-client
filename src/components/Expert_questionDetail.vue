<template>
	<div style="background-color: #FFFFFF;">
		<!-- <div>{{questionUser.headUrl}}</div> -->
		<div class="question">
			<div class="ask-content">
				<div class="head"><img :src="questionUser.headUrl" /></div>
				<div class="content">
					<div class="name">
						<span>{{ questionUser.userName }}</span>
						<span>{{ questionUser.identity }}</span>
						<button class="btn-foll" v-if="loginuser.userId != questionUser.id && asking.isAtten == 1" @click="follow()">+&nbsp;关注</button>
						<button class="btn-foll2" v-if="loginuser.userId != questionUser.id && asking.isAtten == 0" @click="follow()">已关注</button>
						<span style="float: right;color: #818996;">{{ asking.time }}</span>
					</div>
					<div>
						<span class="span">{{ asking.content }}</span>
						<ul class="imgs" style="display: flex;">
							<div style="margin-right: 20px;" v-for="(item, index1) in asking.imgs" :key="index1">
								<img :src="item.imgUrl" style="height: 100px;width: 100px;" />
							</div>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div class="title"><p style="font-size:18px;margin-left: 2%;">回复列表</p></div>
		<div class="container1">
			<div class="answer" v-for="(item, index2) in replies" :key="index2">
				<div style="padding-bottom: 5px;padding-top: 5px;margin-left: 2%;display: flex;">
					<div class="left"><img :src="item.expert.headImg" /></div>
					<div class="right">
						<div class="answer-name">
							<div style="display: flex;">
								<p style="margin-right: 3px;">{{ item.expert.expertName }}专家</p>
								<!-- <p>{{item.identity}}</p> -->
							</div>
							<p style="float:right;color:#818996;">{{ item.time }}</p>
						</div>
						<div style="display: flex;">
							<p style="width: 92%;color: #818996;">{{ item.content }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { Message } from 'element-ui';
import { MessageBox } from 'element-ui';
export default {
	name: 'Expert_questionDetail',
	data() {
		return {
			id: 0,
			// status:1,
			asking: {},
			questionUser: {},
			replies: [],
			myanswer: '',
			loginuser: JSON.parse(localStorage.getItem('login_key'))
		};
	},
	mounted: function() {
		this.getId();
		this.getAskDetil();
	},
	methods: {
		getId: function() {
			var _this = this;
			_this.id = _this.$route.query.id;
		},
		getAskDetil: function() {
			var _this = this;
			console.log('questionId:' + _this.id);
			_this
				.$http({
					method: 'GET',
					url: this.apiServer + 'api/expert/getExpertQuestionDetail',
					header: {
						'content-type': 'application/json;charset=UTF-8 '
					},
					params: {
						id: _this.id,
						userId: _this.loginuser.userId
					}
				})
				.then(function(res) {
					if (res.data.code == 0) {
						_this.asking = res.data.data;
						_this.questionUser = res.data.data.user;
						_this.replies = res.data.data.expertReplys;
						// _this.replies=res.data.data.replies;
					} else {
						alert('加载数据失败');
					}
				});
		},
		follow: function() {
			var _this = this;
			_this
				.$http({
					method: 'GET',
					url: this.apiServer + 'api/expert/addExpertAtten',
					header: {
						'content-type': 'application/json;charset=UTF-8 '
					},
					params: {
						questionId: _this.id,
						userId: _this.loginuser.userId
					}
				})
				.then(function(res) {
					if (res.data.code == 0) {
						_this.getAskDetil();
						if (res.data.data.isAtten == 0) {
							Message({
								message: '关注成功！',
								type: 'success'
							});
						} else {
							Message({
								message: '已取消关注！',
								type: 'success'
							});
						}
					} else {
						Message({
							message: '失败！',
							type: 'error'
						});
					}
				});
		},
		replyLike: function(rId, userId) {
			var _this = this;
			_this
				.$http({
					method: 'GET',
					url: this.apiServer + 'api/exchange/checkReplyLike',
					params: {
						replyId: rId,
						userId: userId
					},
					header: {
						'content-type': 'application/json'
					}
				})
				.then(function(res) {
					if (res.data.code == 0) {
						_this.getAskDetil();
						if (res.data.data.status == 0) {
							Message({
								message: '已点赞！',
								type: 'success'
							});
						}
						if (res.data.data.status == 1) {
							Message({
								message: '已取消赞!！',
								type: 'success'
							});
						}
					} else {
						Message({
							message: '出错!！',
							type: 'error'
						});
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
		}
	}
};
</script>

<style scoped>
.ask-content {
	width: 100%;
	display: inline-block;
	margin-bottom: 10px;
	padding-left: 2%;
	padding-right: 2%;
	padding-top: 2%;
	/* border-bottom: 5px solid #fafafa; */
}

.question {
	margin-top: 10px;
	border-bottom: 5px solid rgb(250, 250, 250);
}

.head {
	width: 8%;
	float: left;
}

.head img {
	height: 60px;
	width: 60px;
	border-radius: 50%;
	border: none;
	vertical-align: middle;
}

.left img {
	height: 60px;
	width: 60px;
	border-radius: 50%;
	border: none;
	vertical-align: middle;
}

.name {
	margin-bottom: 2%;
}

.span {
	width: 100%;
	color: #818996;
}
.content {
	width: 96%;
}

.content ul {
	width: 100%;
	margin-top: 15px;
	margin-left: 45px;
}

.t1 {
	width: 100%;
	height: 50px;
	border-bottom: 2px solid #fafafa;
	color: #000;
	/* padding-bottom: 1.2%; */
	padding-left: 2%;
}

h4 {
	font-family: inherit;
	font-weight: 500;
	line-height: 50px;
	color: inherit;
	font-size: 18px;
}

.title {
	width: 100%;
	border-bottom: 2px solid #fafafa;
	background-color: #ffffff;
	/* padding-left: 2%; */
}

.container1 {
	width: 100%;
	/* display: inline-block; */
}

.answer {
	width: 100%;
	border-bottom: 2px solid #fafafa;
}
.myanswer {
	width: 100%;
	height: 60px;
	border-bottom: 2px solid #fafafa;
	line-height: 60px;
	display: flex;
}

.left {
	width: 8%;
	margin-top: 15px;
}

.right {
	width: 90%;
}

.answer-name {
	display: flex;
	justify-content: space-between;
}

.btn-foll {
	height: 25px;
	margin-left: 20px;
	background-color: #ffffff;
	color: rgb(0, 158, 1);
	border-radius: 5px;
	border: 1px solid rgb(0, 158, 1);
	cursor: pointer;
	font-weight: 700;
}

.btn-foll2 {
	height: 25px;
	margin-left: 20px;
	background-color: rgb(0, 158, 1);
	color: #ffffff;
	border-radius: 5px;
	border: 1px solid rgb(0, 158, 1);
	cursor: pointer;
	font-weight: 700;
}

.answer-btn {
	cursor: pointer;
	width: 60px;
	height: 40px;
	border-radius: 5px;
	background-color: rgb(0, 158, 1);
	color: #ffffff;
	margin-top: 10px;
	margin-left: 20px;
	border: none;
}

.delete-btn {
	height: 25px;
	cursor: pointer;
	background-color: rgb(236, 97, 73);
	color: #ffffff;
	border-radius: 5px;
	border: 0px;
}
</style>
