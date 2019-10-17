<template>
	<div style="background-color: #FFFFFF;">
		<div class="container">
			<!-- <div>{{loginuser}}</div> -->
			<div class="kuai" v-for="(exchange, index) in exchanges" :key="index">
				<div class="shang">
					<img :src="exchange.user.headUrl" class="shang_img" />
					<router-link to="" class="shang_text" style="display: flex;">
						<p style="margin-right:13px;">{{ exchange.user.userName }}</p>
						<p style="padding-top:1px;">{{ handleTime(exchange.createTime) }}</p>
					</router-link>
				</div>
				<div class="xia">
					<div class="left">
						<div class="left2">
							<span class="xia_text" @click="gotoDetail(exchange.id)">{{ handleContent(exchange.content) }}</span>
						</div>
						<div class="left1">
							<span class="xia_text1" v-if="loginuser.login == false" @click="isLike(exchange.id, loginuser.userId)">点赞：{{ exchange.like }} &nbsp;&nbsp;</span>
							<span class="xia_text2" v-if="exchange.isLike == 0" @click="isLike(exchange.id, loginuser.userId)">已赞：{{ exchange.like }} &nbsp;&nbsp;</span>
							<span class="xia_text1" v-if="exchange.isLike == 1" @click="isLike(exchange.id, loginuser.userId)">点赞：{{ exchange.like }} &nbsp;&nbsp;</span>
							<span class="xia_text1">收藏：{{ exchange.collectNumber }} &nbsp;&nbsp;</span>
							<span class="xia_text1">评论：{{ exchange.replyAmount }}</span>
						</div>
					</div>
					<div class="right" v-for="(img, index) in exchange.imgs" :key="index" v-if="index < 1"><img :src="img.imgUrl" class="xia_img" /></div>
				</div>
			</div>
		</div>
		<div class="block" style="text-align: center;margin-top: 20px;padding-bottom: 20px;">
			<el-pagination
				background
				layout="prev, pager, next,jumper"
				:total="totalRecord"
				:page-size="pageSize"
				:current-page="currPage"
				@current-change="handleCurrentChange"
			></el-pagination>
		</div>
		<button class="new-btn" @click="gotoPutExchange()">发布交流</button>
	</div>
</template>

<script>
import { Message } from 'element-ui';
export default {
	name: 'exchange',
	data() {
		return {
			loginuser: {},
			exchanges: [],
			totalRecord: 0,
			currPage: 1,
			pageSize: 10
		};
	},
	mounted: function() {
		this.getUserInfo();
		this.getExchange();
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
			loading.close();
		}, 1000);
	},
	methods: {
		handleContent: function(content) {
			content = content.replace(/(\n)/g, '');
			content = content.replace(/(\t)/g, '');
			content = content.replace(/(\r)/g, '');
			content = content.replace(/<\[^>]*>/g, '');
			content = content.replace(/\s*/g, '');
			if (content.length > 63) {
				return content.substring(0, 63) + '...[详情]';
			} else {
				return content.substring(0, 63);
			}
		},

		getUserInfo: function() {
			var _this = this;
			const user = localStorage.getItem('login_key');
			var loginKey = JSON.parse(user);
			if (loginKey) {
				_this.loginuser = {
					userId: loginKey.userId
				};
			} else {
				_this.loginuser = {
					login: false
				};
			}
		},
		getExchange: function() {
			var _this = this;
			_this
				.$http({
					methods: 'GET',
					url: this.apiServer + 'api/exchange/getExchangeList',
					header: {
						'content-type': 'application/json'
					},
					params: {
						currPage: _this.currPage,
						pageSize: _this.pageSize,
						userId: _this.loginuser.userId
					}
				})
				.then(function(res) {
					if (res.data.code == 0) {
						_this.totalRecord = res.data.total;
						_this.exchanges = res.data.data;
					} else {
						alert('数据加载失败！');
					}
				});
		},
		isLike: function(eId, userId) {
			var _this = this;
			if (_this.loginuser.login == false) {
				_this
					.$confirm('抱歉您还未登录，不能点赞，请先登录。点击确定登录。', '提醒', {
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
							message: action === 'cancel' ? '已放弃登录' : '停留在当前页面'
						});
					});
			} else {
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
							_this.getExchange();
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
			}
		},
		gotoDetail: function(id) {
			var _this = this;
			if (_this.loginuser.login == false) {
				_this
					.$confirm('抱歉您还未登录，不能查看详情，请先登录。点击确定登录。', '提醒', {
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
							message: action === 'cancel' ? '已放弃登录' : '停留在当前页面'
						});
					});
			} else {
				_this.$router.push({
					path: '/exchangeDetail',
					query: {
						id: id
					}
				});
			}
		},
		gotoPutExchange: function() {
			var _this = this;
			if (_this.loginuser.login == false) {
				_this
					.$confirm('抱歉您还未登录，不能发布交流，请先登录。点击确定登录。', '提醒', {
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
							message: action === 'cancel' ? '已放弃登录' : '停留在当前页面'
						});
					});
			} else {
				_this.$router.push('/putExchange');
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
			_this.getExchange();
		},
		handleCurrentChange(val) {
			console.log(`第${val}页 `);
			var _this = this;
			_this.currPage = val;
			_this.getExchange();
		}
	}
};
</script>

<style scoped>
.container {
	/* margin-left: 163px; */
	/* margin-right: 163px; */
	background-color: #ffffff;
	margin-top: 10px;
}
.kuai {
	border-bottom: 2px solid #fafafa;
	padding-top: 20px;
	padding-bottom: 20px;
}

.shang {
	display: flex;
	width: 75%;
	padding-left: 4%;
	float: left;
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
	display: flex;
	width: 100%;
	justify-content: space-between;
}

.left {
	width: 75%;
	padding-left: 10.5%;
	/* float: left; */
}

.left1 {
	/* display: flex; */
	margin-top: 8%;
}

.right {
	/* float: right; */
	width: 30%;
	overflow: hidden;
	height: 100px;
}

.left2 {
	width: 72%;
	/* float: left; */
	line-height: 20px;
}

.xia_text {
	line-height: 20px;
	color: #808080;
	text-decoration: none;
	color: #808080;
	cursor: pointer;
}

.xia_text1 {
	float: left;
	text-decoration: none;
	color: #808080;
	cursor: pointer;
}
.xia_text2 {
	float: left;
	text-decoration: none;
	color: rgb(0, 158, 1);
	cursor: pointer;
}

.xia_img {
	max-width: 150px;
}
.new-btn {
	position: fixed;
	bottom: 70px;
	right: 40px;
	width: 80px;
	height: 80px;
	border-radius: 50%;
	/* background-color: #de533a; */
	background: linear-gradient(40deg, rgb(0, 158, 1), rgb(0, 158, 1));
	box-shadow: 2px 5px 10px #d1d1d1;
	font-size: 16px;
	color: #ffffff;
	cursor: pointer;
	border: none;
	outline: none;
}
</style>
