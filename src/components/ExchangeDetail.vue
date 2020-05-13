<template>
	<div class="container">
		<div class="detail-content">
			<div class="left"><img :src="exchangeUser.headUrl" /></div>
			<div class="right">
				<div class="name">
					<div style="display: flex;">
						<p style="margin-right: 3px;">{{ exchangeUser.userName }}</p>
						<p>{{ exchangeUser.identity }}</p>
					</div>
					<p style="float:right;color:#818996;">{{ handleTime(exchange.createTime) }}</p>
				</div>
				<p style="width: 96%;color: #818996;">{{ exchange.content }}</p>
				<div style="display: flex;">
					<div style="margin-right: 20px;" v-for="(item, index1) in exchange.imgs" :key="index1">
						<img :src="item.imgUrl" style="max-width: 100px;" />
						<el-dialog :visible.sync="dialogVisible"><img width="100%" :src="item.imgUrl" alt="" /></el-dialog>
					</div>
				</div>
				<div style="margin-top: 40px;display: flex;">
					<div style="height: 25px;line-height: 25px;margin-right: 10px;cursor: pointer;" v-if="exchange.isLike == 1" @click="isLike(exchange.id, loginuser.userId)">
						<img :src="nozan" style="height: 20px;width: 20px;" />
						<span style="line-height: 25px;color: rgb(109,109,109);font-size: 16px;">{{ exchange.like }}</span>
					</div>
					<div style="height: 25px;line-height: 25px;margin-right: 10px;cursor: pointer;" v-if="exchange.isLike == 0" @click="isLike(exchange.id, loginuser.userId)">
						<img :src="zan" style="height: 20px;width: 20px;" />
						<span style="line-height: 25px;color: rgb(0,158,1);font-size: 16px;">{{ exchange.like }}</span>
					</div>
					<button class="btn-foll" v-if="loginuser.userId != exchangeUser.id && exchange.status == 1" @click="collect()">☆收藏</button>
					<button class="btn-foll2" v-if="loginuser.userId != exchangeUser.id && exchange.status == 0" @click="collect()">★已收藏</button>
				</div>
			</div>
		</div>
		<div class="title">
			<p style="font-size:18px ;">回复列表</p>
			<p></p>
			<div style="clear: both;"></div>
		</div>
		<div class="myanswer" style="width: 100%;border-bottom: 2px solid #fafafa;display: flex;">
			<span style="margin-left: 2%;font-size: 17px;margin-top: 5px;">回答：</span>
			<div class="answer-input" style="width: 300px;margin-top: 5px;margin-bottom: 5px;"><el-input type="text" :rows="1" v-model="myanswer" placeholder="我来回答!!" /></div>
			<button class="answer-btn" @click="answer()">提交</button>
		</div>
		<div class="container1">
			<div class="answer" v-for="(item, index2) in exchange.replies" :key="index2">
				<div style="padding-bottom: 5px;padding-top: 5px;margin-left: 2%;display: flex;">
					<div class="left1"><img :src="item.headUrl" /></div>
					<div class="right1">
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
								<div style="height: 25px;line-height: 25px;cursor: pointer;" @click="replyLike(item.id, loginuser.userId)">
									<img src="/static/zanone.png" style="height: 20px;width: 20px;" />
									<span style="line-height: 25px;color: rgb(109,109,109);font-size: 16px;">{{ item.like }}</span>
								</div>
							</div>
							<div style="width: 8%;" v-if="item.userId != loginuser.userId && item.isLike == 0">
								<div style="height: 25px;line-height: 25px;cursor: pointer;" @click="replyLike(item.id, loginuser.userId)">
									<img src="/static/zanthree.png" style="height: 20px;width: 20px;" />
									<span style="line-height: 25px;color: rgb(0,158,1);font-size: 16px;">{{ item.like }}</span>
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
	name: 'exchangeDetail',
	data() {
		return {
      nozan: 'https://save-pan.oss-cn-shanghai.aliyuncs.com/img/e8120d56-da5b-45e8-a9da-f9e1b6facba5.jpg',
      zan: 'https://save-pan.oss-cn-shanghai.aliyuncs.com/img/42278018-6c1f-4440-b737-c4b74a116788.jpg',
			eId: 0,
			exchange: {},
			exchangeUser: {},
			myanswer: '',
			loginuser: JSON.parse(localStorage.getItem('login_key')),
			dialogImageUrl: '',
			dialogVisible: false
		};
	},
	mounted: function() {
		this.geteId();
		this.getExchangDetil();
	},
	methods: {
		deletePL: function(id) {
			var _this = this;
			_this
				.$confirm('确定删除您的评论？', '评论删除', {
					distinguishCancelAndClose: true,
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
								_this.getExchangDetil();
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
		geteId: function() {
			var _this = this;
			_this.eId = _this.$route.query.id;
		},
		getExchangDetil: function() {
			var _this = this;
			console.log('getExchangeDetil');
			console.log('exchangeId:' + _this.eId);
			_this
				.$http({
					method: 'GET',
					url: this.apiServer + 'api/exchange/getExchangeDetailById',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					params: {
						id: _this.eId,
						userId: _this.loginuser.userId
					}
				})
				.then(function(res) {
					if (res.data.code == 0) {
						_this.exchange = res.data.data;
						_this.exchangeUser = res.data.data.user;
						console.log('status:' + _this.exchange.status);
						// _this.replies=res.data.data.replies;
					} else {
						alert('加载数据失败');
					}
				});
		},
		answer: function() {
			var _this = this;
			console.log('myanswer:' + _this.myanswer);
			console.log('userId:' + _this.loginuser.userId);
			if (_this.myanswer.split('').join('') != 0 && _this.myanswer.length != 0 && _this.myanswer != null) {
				_this
					.$http({
						method: 'POST',
						url: this.apiServer + 'api/exchange/reply?content=' + _this.myanswer + '&exchangeId=' + _this.eId + '&userId=' + _this.loginuser.userId,
						header: {
							'content-type': 'application/json;charset=UTF-8'
						}
					})
					.then(function(res) {
						if (res.data.code === 0) {
							Message({
								message: '评论成功！',
								type: 'success'
							});
							_this.getExchangDetil();
							_this.myanswer = '';
						} else {
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
		collect: function() {
			var _this = this;
			_this
				.$http({
					method: 'POST',
					url: this.apiServer + 'api/exchange/collectExchange',
					header: {
						'content-type': 'application/json;charset=UTF-8 '
					},
					params: {
						exchangeId: _this.eId,
						userId: _this.loginuser.userId
					}
				})
				.then(function(res) {
					if (res.data.code == 0) {
						_this.getExchangDetil();
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
		isLike: function(eId, userId) {
			var _this = this;
			_this
				.$http({
					method: 'GET',
					url: this.apiServer + 'api/exchange/checkLike',
					params: {
						exchangeId: eId,
						userId: userId
					},
					header: {
						'content-type': 'application/json'
					}
				})
				.then(function(res) {
					if (res.data.code == 0) {
						_this.getExchangDetil();
						if (res.data.data.status == 0) {
							Message({
								message: '已点赞！',
								type: 'success'
							});
						}
						if (res.data.data.status == 1) {
							Message({
								message: '已取消点赞!！',
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
						_this.getExchangDetil();
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
		},
		handlePictureCardPreview(file) {
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		}
	}
};
</script>

<style scoped>
.container {
	width: 100%;
	background-color: white;
	margin-top: 1%;
	display: inline-block;
}

.detail-content {
	display: flex;
	width: 100%;
	margin-bottom: 10px;
	padding-left: 2%;
	padding-right: 2%;
	border-bottom: 5px solid #fafafa;
}

.left {
	padding-top: 2%;
	width: 8%;
	float: left;
}

.right {
	width: 92%;
	float: left;
	padding-top: 0.6%;
	margin-bottom: 25px;
}

.left img {
	height: 60px;
	width: 60px;
	border-radius: 50%;
	border: none;
	vertical-align: middle;
}

.name {
	width: 96%;
	display: flex;
	justify-content: space-between;
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
	border-bottom: 2px solid #fafafa;
}
.left1 {
	width: 8%;
	margin-top: 15px;
}

.right1 {
	width: 90%;
}

.answer-name {
	/* width: 96%; */
	display: flex;
	justify-content: space-between;
}

.left1 img {
	height: 60px;
	width: 60px;
	border-radius: 50%;
	border: none;
	vertical-align: middle;
}

.answer-btn {
	cursor: pointer;
	width: 60px;
	height: 30px;
	border-radius: 5px;
	background-color: rgb(0, 158, 1);
	color: #ffffff;
	margin-top: 10px;
	margin-left: 10px;
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

.btn-foll {
	height: 25px;
	/* margin-left: 20px; */
	background-color: #ffffff;
	color: rgb(0, 158, 1);
	border-radius: 5px;
	border: 1px solid rgb(0, 158, 1);
	cursor: pointer;
	font-weight: 700;
}

.btn-foll2 {
	height: 25px;
	/* margin-left: 20px; */
	background-color: rgb(0, 158, 1);
	color: #ffffff;
	border-radius: 5px;
	border: 1px solid rgb(0, 158, 1);
	cursor: pointer;
	font-weight: 700;
}
</style>
