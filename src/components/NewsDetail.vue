<template>
	<div class="main">
		<div class="content-list">
			<div class="news-content">
				<div class="n-con">
					<h3 class="new-title">{{news.title}}</h3>
					<div class="resource">
						<span>{{news.source}}</span>
					</div>
					<div class="date-read">
						<p class="tm"><span>{{news.time}}</span><span>&nbsp;&nbsp;收藏:</span><span>{{news.collectNumber}}</span><span>&nbsp;&nbsp;阅读数:</span><span>{{news.readNumber}}</span></p>
					</div>
					<div>
						<el-button type="success" round v-if="news.status==1" @click="collect()">收藏</el-button>
						<el-button type="success" round v-if="news.status==0" @click="collect()">已收藏</el-button>
					</div>
					<p class="text">
						<p style="line-height: 1.75em;"></p>
						<span v-html="news.content"></span>
					</p>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import {
		Message
	} from 'element-ui';
	import {
		MessageBox
	} from 'element-ui';
	export default {
		name: 'newsDetail',
		data() {
			return {
				nId: 0,
				news: {},
				loginuser: {},
			};
		},
		mounted: function() {
			this.getId();
			this.getUserInfo();
			this.getNewsDetail();
		},
		methods: {
			getNewsDetail: function() {
				var _this = this;
				console.log('getNewsDetail');
				console.log('newsId:' + _this.nId);
				console.log('用户Id' + _this.loginuser.userId)
				_this.$http({
					method: 'GET',
					url: this.apiServer + 'api/news/getNewsDetail',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					params: {
						newsId: _this.nId,
						userId: _this.loginuser.userId
					}
				}).then(function(res) {
					if (res.data.code == 0) {
						_this.news = res.data.data;
						console.log(_this.news);
					} else {
						alert('加载数据失败');
					}
				})
			},
			getUserInfo: function() {
				var _this = this;
				const user = localStorage.getItem('login_key');
				var loginKey = JSON.parse(user);
				if (loginKey) {
					_this.loginuser = {
						userId: loginKey.userId,
					}
				} else {
					_this.loginuser = {
						login: false
					}
				}
			},
			getId: function() {
				var _this = this;
				_this.nId = _this.$route.query.id;
			},

			collect: function() {
				var _this = this;
				if (_this.loginuser.login == false) {
					_this.$confirm('抱歉您还未登录，不能收藏，请先登录。点击确定登录。', '提醒', {
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
									'已放弃登录' : '停留在当前页面'
							})
						});
				} else {
					_this.$http({
						method: 'GET',
						url: this.apiServer + 'api/news/collectNews',
						header: {
							'content-type': 'application/json;charset=UTF-8 '
						},
						params: {
							newsId: _this.nId,
							userId: _this.loginuser.userId,
						}
					}).then(function(res) {
						if (res.data.code == 0) {
							_this.getNewsDetail();
							if (res.data.data.status == 0) {
								Message({
									message: '收藏成功！',
									type: 'success'
								});

							} else {
								Message({
									message: '已取消收藏！',
									type: 'success'
								});

							}
						} else {
							Message({
								message: '失败！',
								type: 'error'
							});
						}
					})
				}
			},
		}
	}
</script>

<style scoped>
	.content-list {
		width: 100%;
		background-color: white;
		margin-top: 1%;
		padding-bottom: 10px;
	}

	.news-content {
		width: 80%;
		margin-left: 10%;
		padding-top: 10px;
	}

	h3 {
		font-family: inherit;
		font-weight: 500;
		line-height: 1.1;
		color: inherit;
		font-size: 24px;
	}

	.new-title {
		text-align: center;
		padding-top: 20px;
		padding-bottom: 30px;
	}

	.resource {
		/* height: 30px; */
		margin-top: 5px;
	}

	.date-read {
		display: flex;
		/* height: 30px; */
		color: #808080;
	}
	.text{
		line-height: 2.75em; 
		text-align: justify;
	}
</style>
