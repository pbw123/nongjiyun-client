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
						<span style="float: right;color: #818996;">{{ handleTime(asking.createTime) }}</span>
					</div>
					<div>
						<span class="span">{{ asking.content }}</span>
						<ul class="imgs" style="display: flex;">
							<div style="margin-right: 20px;" v-for="(item, index1) in asking.imgs" :key="index1">
								<img :src="item.imgUrl" style="height: 100px;width: 100px;" />
							</div>
						</ul>
					</div>
					<div style="margin-left: 60px;margin-top: 40px;">
						<button class="btn-foll" v-if="loginuser.userId != questionUser.id && asking.status == 1" @click="collect()">☆收藏</button>
						<button class="btn-foll2" v-if="loginuser.userId != questionUser.id && asking.status == 0" @click="collect()">★已收藏</button>
					</div>
				</div>
			</div>
		</div>
		<div class="title">
			<p style="font-size:18px ;">回复列表</p>
			<p></p>
			<div style="clear: both;"></div>
		</div>
		<div class="myanswer">
			<span>回答：</span>
			<div class="answer-input" style="width: 300px;">
        <el-input type="text" v-model="myanswer" placeholder="我来回答!!" maxLength="40"/></div>
			<button class="answer-btn" @click="answer">提交</button>
		</div>
		<div class="container1">
			<div class="answer" v-for="(item, index2) in asking.replies" :key="index2">
				<div class="a_c">
					<div class="left"><img :src="item.headUrl" /></div>
					<div class="right">
						<div class="answer-name">
							<div style="display: flex;">
								<p style="margin-right: 3px;">{{ item.userName }}</p>
								<p>{{ item.identity }}</p>
							</div>
							<p style="float:right;color:#818996;">{{ handleTime(item.replyTime) }}</p>
						</div>
						<div style="display: flex;">
							<p style="width: 92%;color: #818996;">{{ item.content }}</p>
							<div style="width: 8%;" v-if="item.userId == loginuser.userId"><button class="delete-btn" @click="deletePL(item.id)">删除</button></div>
							<div style="width: 8%;" v-if="item.userId != loginuser.userId && item.isLike == 1">
								<div class="a_img" @click="replyLike(item.id, loginuser.userId)">
									<img src="/static/zanone.png" style="height: 20px;width: 20px;" />
									<span>{{ item.like }}</span>
								</div>
							</div>
							<div style="width: 8%;" v-if="item.userId != loginuser.userId && item.isLike == 0">
								<div class="a_img" @click="replyLike(item.id, loginuser.userId)">
									<img src="/static/zanthree.png" style="height: 20px;width: 20px;" />
									<span style="color: rgb(0,158,1);">{{ item.like }}</span>
								</div>
							</div>
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
	name: 'askDetail',
	data() {
		return {
			aId: 0,
			// status:1,
			asking: {},
			questionUser: {},
			myanswer: '',
			loginuser: JSON.parse(localStorage.getItem('login_key'))
		};
	},
	// 		onLoad: function(option) {
	// 			//option为object类型，会序列化上个页面传递的参数
	// 			this.aId= option.id;
	// 		},
	mounted: function() {
		this.getId();
		this.getAskDetil();
	},
	methods: {
		deletePL: function(id) {
			var _this = this;
			_this
				.$confirm('确定删除您的评论？', '评论删除', {
					confirmButtonText: '删除',
					cancelButtonText: '取消'
				})
				.then(() => {
					console.log('deletePL(' + id + ')');
					_this
						.$http({
							method: 'GET',
							url: this.apiServer + 'api/exchange/delReplyById',
							header: {
								'content-type': 'application/json;charset=UTF-8'
							},
							params: {
								id: id
							}
						})
						.then(function(res) {
							if (res.data.code == 0) {
								_this.getAskDetil();
								_this.$message({
									type: 'info',
									message: '删除成功！！'
								});
							} else {
								Message({
									message: '删除失败！',
									type: 'error'
								});
							}
						});
				})
				.catch(action => {
					_this.$message({
						type: 'info',
						message: action === 'cancel' ? '已取消删除' : '已取消操作'
					});
				});
		},
		getId: function() {
			var _this = this;
			_this.aId = _this.$route.query.id;
		},
		getAskDetil: function() {
			var _this = this;
			console.log('getaskDetil');
			console.log('questionId:' + _this.aId);
			_this
				.$http({
					method: 'GET',
					url: this.apiServer + 'api/user/getQuestionDetailById',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					params: {
						id: _this.aId,
						userId: _this.loginuser.userId
					}
				})
				.then(function(res) {
					if (res.data.code == 0) {
						_this.asking = res.data.data;
						_this.questionUser = res.data.data.user;
						console.log('followstatus:' + _this.asking.isAtten);
						console.log('collecstatus:' + _this.asking.status);
						// _this.replies=res.data.data.replies;
					} else {
						alert('加载数据失败');
					}
				});
		},
		answer: function() {
			var _this = this;
			console.log('内容:' + _this.myanswer + ';用户Id:' + _this.loginuser.userId + ';提问Id:' + _this.aId);
			console.log('questionUser:id(' + _this.questionUser.id + ')');
			if (_this.myanswer.split('').join('') != 0 && _this.myanswer.length != 0 && _this.myanswer != null) {
        if (_this.myanswer.trim().length < 5) {
          Message({
            message:'至少5个字符',
            type:'warning',
          });
          return;
        }
				_this
					.$http({
						method: 'POST',
						url: this.apiServer + 'api/question/reply?content=' + this.myanswer + '&questionId=' + this.aId + '&userId=' + this.loginuser.userId,
						header: {
							'content-type': 'application/json;charset=UTF-8 '
						}
						//  					data:{
						//  						userId:this.loginuser.userId,
						// 							questionId:this.aId,
						//  						content:this.myanswer
						// 					},
					})
					.then(function(res) {
						if (res.data.code === 0) {
							Message({
								message: '评论成功！',
								type: 'success'
							});

							_this.getAskDetil();
							_this.myanswer = '';
						} else if (res.data.code === 13) {
              Message({
                message: res.data.msg,
                type: 'warning'
              });
            }
						else {
							Message({
								message: '评论失败！',
								type: 'error'
							});
						}
					});
			} else {
				Message({
					message: '评论内容不能为空！！',
					type: 'warning'
				});
			}
		},
		follow: function() {
			var _this = this;
			_this
				.$http({
					method: 'POST',
					url: this.apiServer + 'api/question/attentionQuestion',
					header: {
						'content-type': 'application/json;charset=UTF-8 '
					},
					params: {
						questionId: _this.aId,
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
		collect: function() {
			var _this = this;
			_this
				.$http({
					method: 'POST',
					url: this.apiServer + 'api/question/collectQuestion',
					header: {
						'content-type': 'application/json;charset=UTF-8 '
					},
					params: {
						questionId: _this.aId,
						userId: _this.loginuser.userId
					}
				})
				.then(function(res) {
					if (res.data.code == 0) {
						_this.getAskDetil();
						if (res.data.data.status == 0) {
							Message({
								message: '收藏成功！',
								type: 'success'
							});
							// _this.status=res.data.data.status;
						} else {
							Message({
								message: '已取消收藏！',
								type: 'success'
							});
							// _this.status=res.data.data.status;
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
.a_c {
	padding-bottom: 5px;
	padding-top: 5px;
	margin-left: 2%;
	display: flex;
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
	padding-left: 2%;
}

.container1 {
	width: 100%;
	/* display: inline-block; */
}

.answer {
	width: 100%;
	/* padding-left: 2%;
		padding-right: 2%; */
	border-bottom: 2px solid #fafafa;
	/* height: 95px; */
}

.myanswer {
	width: 100%;
	height: 60px;
	border-bottom: 2px solid #fafafa;
	line-height: 60px;
	display: flex;
}
.myanswer span {
	margin-left: 2%;
	font-size: 17px;
}

.left {
	/* line-height: 95px; */
	/* padding-top: 2%; */
	width: 8%;
	margin-top: 15px;
	/* float: left; */
}

.right {
	width: 90%;
	/* float: left; */
	/* padding-top: 0.1%; */
}

.answer-name {
	/* width: 96%; */
	display: flex;
	justify-content: space-between;
}
.a_img {
	height: 25px;
	line-height: 25px;
	cursor: pointer;
}
.a_img span {
	line-height: 25px;
	color: rgb(109, 109, 109);
	font-size: 16px;
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
	/* width: 5%; */
	height: 25px;
	cursor: pointer;
	background-color: rgb(236, 97, 73);
	color: #ffffff;
	border-radius: 5px;
	border: 0px;
}
</style>
