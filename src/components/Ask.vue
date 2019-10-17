<template>
	<div class="container">
		<div class="left">
			<h3 style="text-align: center;" class="left_head">推荐专家</h3>
			<div class="left1" v-for="(expert, index) in experts" :key="index">
				<img :src="expert.headImg" class="img" @click="gotoExpertDetail(expert.id)" />
				<span @click="gotoExpertDetail(expert.id)" class="left_text">{{ expert.expertName }}</span>
			</div>
			<div class="more">
				<div style="width: 100%;height: 10px;"></div>
				<a tag="a" target="_blank" href="../expertList"><span>查看更多</span></a>
			</div>
		</div>
		<div class="right">
			<div class="title">
				<div><a href="javascript:;" @click="(msg = 0), (keyword = '粮经'), getAskings()" :class="{ cur: msg === 0 }" class="nav-item">粮经</a></div>
				<div><a href="javascript:;" @click="(msg = 1), (keyword = '园艺'), getAskings()" :class="{ cur: msg === 1 }" class="nav-item">园艺</a></div>
				<div><a href="javascript:;" @click="(msg = 2), (keyword = '畜禽'), getAskings()" :class="{ cur: msg === 2 }" class="nav-item">畜禽</a></div>
				<div><a href="javascript:;" @click="(msg = 3), (keyword = '水产'), getAskings()" :class="{ cur: msg === 3 }" class="nav-item">水产</a></div>
				<div><a href="javascript:;" @click="(msg = 4), (keyword = '农机'), getAskings()" :class="{ cur: msg === 4 }" class="nav-item">农机</a></div>
				<div><a href="javascript:;" @click="(msg = 5), (keyword = '其他'), getAskings()" :class="{ cur: msg === 5 }" class="nav-item">其他</a></div>
			</div>
			<div class="content">
				<ul class="top-ask">
					<div v-show="msg === 0">
						<li class="ask-li" v-for="(asking, index) in askings" :key="index">
							<div style="float: left;padding-right: 20px;margin-top: 5px;" @click="gotoDetail(asking.id, loginUser.userId)">
								<img style="border-radius: 50%;width: 30px;height: 30px;cursor: pointer;" :src="asking.user.headUrl" />
							</div>
							<div class="a-name" @click="gotoDetail(asking.id, loginUser.userId)">
								<span style="color: #808080;cursor: pointer;">{{ asking.user.userName }}</span>
								<span class="a-identity" style="color: #808080;cursor: pointer;">{{ asking.user.identity }}</span>
							</div>
							<div class="a-address" v-if="asking.user.userAddress != null" @click="gotoDetail(asking.id, loginUser.userId)">{{ asking.user.userAddress }}</div>
							<div class="a-address" v-if="asking.user.userAddress == null">&nbsp;&nbsp;</div>
							<a>
								<div class="a-question" @click="gotoDetail(asking.id, loginUser.userId)">{{ asking.content }}</div>
							</a>
							<div class="address_c" @click="gotoDetail(asking.id, loginUser.userId)">
								<div class="a-location" style="padding-top: 10px;"><img src="../assets/icon_address.png" style="width: 12px;height: 17px;" /></div>
								<div class="location" style="padding-top: 10px;">&nbsp;&nbsp;{{ asking.address }}</div>
								<!-- <div class="location" style="padding-top: 10px;">&nbsp;&nbsp;江苏省盐城市射阳县018乡道靠近三涧五组</div> -->
							</div>
							<div class="a-answer">{{ handleTime(asking.createTime) }} &nbsp;&nbsp;&nbsp;已回答:{{ asking.replyAmount }}</div>
							<div style="width: 100%;height: 20px;"></div>
						</li>
						<div class="block">
							<el-pagination
								background
								layout="prev, pager, next,jumper"
								:total="totalRecord"
								:page-size="pageSize"
								:current-page="currPage"
								@current-change="handleCurrentChange"
							></el-pagination>
						</div>
					</div>
					<div v-show="msg === 1">
						<li class="ask-li" v-for="(asking, index) in askings" :key="index">
							<div style="float: left;padding-right: 20px;margin-top: 5px;" @click="gotoDetail(asking.id, loginUser.userId)">
								<img style="border-radius: 50%;width: 30px;height: 30px;cursor: pointer;" :src="asking.user.headUrl" />
							</div>
							<div class="a-name" @click="gotoDetail(asking.id, loginUser.userId)">
								<span style="color: #808080;cursor: pointer;">{{ asking.user.userName }}</span>
								<span class="a-identity" style="color: #808080;cursor: pointer;">{{ asking.user.identity }}</span>
							</div>
							<div class="a-address" v-if="asking.user.userAddress != null" @click="gotoDetail(asking.id, loginUser.userId)">{{ asking.user.userAddress }}</div>
							<div class="a-address" v-if="asking.user.userAddress == null">&nbsp;&nbsp;</div>
							<a>
								<div class="a-question" @click="gotoDetail(asking.id, loginUser.userId)">{{ asking.content }}</div>
							</a>
							<div class="address_c" @click="gotoDetail(asking.id, loginUser.userId)">
								<div class="a-location" style="padding-top: 10px;"><img src="../assets/icon_address.png" style="width: 12px;height: 17px;" /></div>
								<div class="location" style="padding-top: 10px;">&nbsp;&nbsp;{{ asking.address }}</div>
								<!-- <div class="location" style="padding-top: 10px;">&nbsp;&nbsp;江苏省盐城市射阳县018乡道靠近三涧五组</div> -->
							</div>
							<div class="a-answer">{{ handleTime(asking.createTime) }} &nbsp;&nbsp;&nbsp;已回答:{{ asking.replyAmount }}</div>
							<div style="width: 100%;height: 20px;"></div>
						</li>
						<div class="block">
							<el-pagination
								background
								layout="prev, pager, next,jumper"
								:total="totalRecord"
								:page-size="pageSize"
								:current-page="currPage"
								@current-change="handleCurrentChange"
							></el-pagination>
						</div>
					</div>
					<div v-show="msg === 2">
						<li class="ask-li" v-for="(asking, index) in askings" :key="index">
							<div style="float: left;padding-right: 20px;margin-top: 5px;" @click="gotoDetail(asking.id, loginUser.userId)">
								<img style="border-radius: 50%;width: 30px;height: 30px;cursor: pointer;" :src="asking.user.headUrl" />
							</div>
							<div class="a-name" @click="gotoDetail(asking.id, loginUser.userId)">
								<span style="color: #808080;cursor: pointer;">{{ asking.user.userName }}</span>
								<span class="a-identity" style="color: #808080;cursor: pointer;">{{ asking.user.identity }}</span>
							</div>
							<div class="a-address" v-if="asking.user.userAddress != null" @click="gotoDetail(asking.id, loginUser.userId)">{{ asking.user.userAddress }}</div>
							<div class="a-address" v-if="asking.user.userAddress == null">&nbsp;&nbsp;</div>
							<a>
								<div class="a-question" @click="gotoDetail(asking.id, loginUser.userId)">{{ asking.content }}</div>
							</a>
							<div class="address_c" @click="gotoDetail(asking.id, loginUser.userId)">
								<div class="a-location" style="padding-top: 10px;"><img src="../assets/icon_address.png" style="width: 12px;height: 17px;" /></div>
								<div class="location" style="padding-top: 10px;">&nbsp;&nbsp;{{ asking.address }}</div>
								<!-- <div class="location" style="padding-top: 10px;">&nbsp;&nbsp;江苏省盐城市射阳县018乡道靠近三涧五组</div> -->
							</div>
							<div class="a-answer">{{ handleTime(asking.createTime) }} &nbsp;&nbsp;&nbsp;已回答:{{ asking.replyAmount }}</div>
							<div style="width: 100%;height: 20px;"></div>
						</li>
						<div class="block">
							<el-pagination
								background
								layout="prev, pager, next,jumper"
								:total="totalRecord"
								:page-size="pageSize"
								:current-page="currPage"
								@current-change="handleCurrentChange"
							></el-pagination>
						</div>
					</div>
					<div v-show="msg === 3">
						<li class="ask-li" v-for="(asking, index) in askings" :key="index">
							<div style="float: left;padding-right: 20px;margin-top: 5px;" @click="gotoDetail(asking.id, loginUser.userId)">
								<img style="border-radius: 50%;width: 30px;height: 30px;cursor: pointer;" :src="asking.user.headUrl" />
							</div>
							<div class="a-name" @click="gotoDetail(asking.id, loginUser.userId)">
								<span style="color: #808080;cursor: pointer;">{{ asking.user.userName }}</span>
								<span class="a-identity" style="color: #808080;cursor: pointer;">{{ asking.user.identity }}</span>
							</div>
							<div class="a-address" v-if="asking.user.userAddress != null" @click="gotoDetail(asking.id, loginUser.userId)">{{ asking.user.userAddress }}</div>
							<div class="a-address" v-if="asking.user.userAddress == null">&nbsp;&nbsp;</div>
							<a>
								<div class="a-question" @click="gotoDetail(asking.id, loginUser.userId)">{{ asking.content }}</div>
							</a>
							<div class="address_c" @click="gotoDetail(asking.id, loginUser.userId)">
								<div class="a-location" style="padding-top: 10px;"><img src="../assets/icon_address.png" style="width: 12px;height: 17px;" /></div>
								<div class="location" style="padding-top: 10px;">&nbsp;&nbsp;{{ asking.address }}</div>
								<!-- <div class="location" style="padding-top: 10px;">&nbsp;&nbsp;江苏省盐城市射阳县018乡道靠近三涧五组</div> -->
							</div>
							<div class="a-answer">{{ handleTime(asking.createTime) }} &nbsp;&nbsp;&nbsp;已回答:{{ asking.replyAmount }}</div>
							<div style="width: 100%;height: 20px;"></div>
						</li>
						<div class="block">
							<el-pagination
								background
								layout="prev, pager, next,jumper"
								:total="totalRecord"
								:page-size="pageSize"
								:current-page="currPage"
								@current-change="handleCurrentChange"
							></el-pagination>
						</div>
					</div>
					<div v-show="msg === 4">
						<li class="ask-li" v-for="(asking, index) in askings" :key="index">
							<div style="float: left;padding-right: 20px;margin-top: 5px;" @click="gotoDetail(asking.id, loginUser.userId)">
								<img style="border-radius: 50%;width: 30px;height: 30px;cursor: pointer;" :src="asking.user.headUrl" />
							</div>
							<div class="a-name" @click="gotoDetail(asking.id, loginUser.userId)">
								<span style="color: #808080;cursor: pointer;">{{ asking.user.userName }}</span>
								<span class="a-identity" style="color: #808080;cursor: pointer;">{{ asking.user.identity }}</span>
							</div>
							<div class="a-address" v-if="asking.user.userAddress != null" @click="gotoDetail(asking.id, loginUser.userId)">{{ asking.user.userAddress }}</div>
							<div class="a-address" v-if="asking.user.userAddress == null">&nbsp;&nbsp;</div>
							<a>
								<div class="a-question" @click="gotoDetail(asking.id, loginUser.userId)">{{ asking.content }}</div>
							</a>
							<div class="address_c" @click="gotoDetail(asking.id, loginUser.userId)">
								<div class="a-location" style="padding-top: 10px;"><img src="../assets/icon_address.png" style="width: 12px;height: 17px;" /></div>
								<div class="location" style="padding-top: 10px;">&nbsp;&nbsp;{{ asking.address }}</div>
								<!-- <div class="location" style="padding-top: 10px;">&nbsp;&nbsp;江苏省盐城市射阳县018乡道靠近三涧五组</div> -->
							</div>
							<div class="a-answer">{{ handleTime(asking.createTime) }} &nbsp;&nbsp;&nbsp;已回答:{{ asking.replyAmount }}</div>
							<div style="width: 100%;height: 20px;"></div>
						</li>
						<div class="block">
							<el-pagination
								background
								layout="prev, pager, next,jumper"
								:total="totalRecord"
								:page-size="pageSize"
								:current-page="currPage"
								@current-change="handleCurrentChange"
							></el-pagination>
						</div>
					</div>
					<div v-show="msg === 5">
						<li class="ask-li" v-for="(asking, index) in askings" :key="index">
							<div style="float: left;padding-right: 20px;margin-top: 5px;" @click="gotoDetail(asking.id, loginUser.userId)">
								<img style="border-radius: 50%;width: 30px;height: 30px;cursor: pointer;" :src="asking.user.headUrl" />
							</div>
							<div class="a-name" @click="gotoDetail(asking.id, loginUser.userId)">
								<span style="color: #808080;cursor: pointer;">{{ asking.user.userName }}</span>
								<span class="a-identity" style="color: #808080;cursor: pointer;">{{ asking.user.identity }}</span>
							</div>
							<div class="a-address" v-if="asking.user.userAddress != null" @click="gotoDetail(asking.id, loginUser.userId)">{{ asking.user.userAddress }}</div>
							<div class="a-address" v-if="asking.user.userAddress == null">&nbsp;&nbsp;</div>
							<a>
								<div class="a-question" @click="gotoDetail(asking.id, loginUser.userId)">{{ asking.content }}</div>
							</a>
							<div class="address_c" @click="gotoDetail(asking.id, loginUser.userId)">
								<div class="a-location" style="padding-top: 10px;"><img src="../assets/icon_address.png" style="width: 12px;height: 17px;" /></div>
								<div class="location" style="padding-top: 10px;">&nbsp;&nbsp;{{ asking.address }}</div>
								<!-- <div class="location" style="padding-top: 10px;">&nbsp;&nbsp;江苏省盐城市射阳县018乡道靠近三涧五组</div> -->
							</div>
							<div class="a-answer">{{ handleTime(asking.createTime) }} &nbsp;&nbsp;&nbsp;已回答:{{ asking.replyAmount }}</div>
							<div style="width: 100%;height: 20px;"></div>
						</li>
						<div class="block">
							<el-pagination
								background
								layout="prev, pager, next,jumper"
								:total="totalRecord"
								:page-size="pageSize"
								:current-page="currPage"
								@current-change="handleCurrentChange"
							></el-pagination>
						</div>
					</div>
				</ul>
			</div>
			<!-- <div class="content">
				<router-view></router-view>
			</div> -->
		</div>
		<button class="new-btn" @click="gotoPutQuestion()">快速提问</button>
	</div>
</template>

<script>
export default {
	name: 'ask',
	data() {
		return {
			totalRecord: 0,
			currPage: 1,
			pageSize: 10,
			msg: 0,
			keyword: '粮经',
			loginUser: {},
			experts: [],
			askings: [],
			gradeId: 1,
			sortId: 2
		};
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
	mounted: function() {
		this.getAskings();
		this.getUserInfo();
		this.getExperts();
	},
	onShow: function() {},
	methods: {
		getUserInfo: function() {
			var _this = this;
			const user = localStorage.getItem('login_key');
			var loginKey = JSON.parse(user);
			if (loginKey) {
				_this.loginUser = {
					userId: loginKey.userId
				};
			} else {
				_this.loginUser = {
					login: false
				};
			}
		},
		getExperts: function() {
			var _this = this;
			_this
				.$http({
					method: 'GET',
					url: this.apiServer + 'expert/getAllExpert?currPage=1&pageSize=10',
					header: {
						'content-type': 'application/json;charset=UTF-8'
					}
				})
				.then(function(res) {
					if (res.data.code == 0) {
						_this.experts = res.data.data;
					} else {
						alert('加载数据失败');
					}
				});
		},
		getAskings: function() {
			var _this = this;
			console.log('getaskings(' + _this.keyword + ')');
			_this
				.$http({
					method: 'GET',
					url: this.apiServer + 'api/question/getBySort',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					params: {
						currPage: _this.currPage,
						pageSize: _this.pageSize,
						keyword: _this.keyword
					}
				})
				.then(function(res) {
					if (res.data.code == 0) {
						_this.askings = res.data.data;
						_this.totalRecord = res.data.total;
					} else {
						alert('加载数据失败');
					}
				});
		},
		gotoDetail: function(id, userId) {
			var _this = this;
			if (_this.loginUser.login == false) {
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
				this.$router.push({ path: '/askDetail', query: { id: id, userId: userId } });
			}
		},
		gotoExpertDetail: function(id) {
			var _this = this;
			_this.$router.push({ path: '/Expert', query: { id: id } });
		},
		gotoPutQuestion: function() {
			var _this = this;
			if (_this.loginUser.login == false) {
				_this
					.$confirm('抱歉您还未登录，不能提问，请先登录。点击确定登录。', '提醒', {
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
				this.$router.push('/putQuestion');
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
			_this.getAskings();
		},
		handleCurrentChange(val) {
			console.log(`第${val}页 `);
			var _this = this;
			_this.currPage = val;
			_this.getAskings();
		}
	}
};
</script>

<style scoped>
.container {
	display: flex;
	margin-top: 10px;
}

.left {
	width: 28%;
	background-color: #fff;
	height: auto;
}
.left_text {
	color: #1c1714;
	margin-left: 5px;
	cursor: pointer;
}

.left1 {
	display: flex;
	height: 80px;
	border-top: 2px solid rgb(250, 250, 250);
}

.img {
	display: block;
	float: left;
	width: 62px;
	height: 62px;
	margin-top: 9px;
	border-radius: 50%;
	margin-left: 2%;
	cursor: pointer;
}

.left_text {
	text-decoration: none;
	line-height: 80px;
}

.left_head {
	height: 64px;
	width: 63%;
	margin-left: 20%;
	text-align: center;
	color: black;
	line-height: 64px;
	background-image: url(../assets/icon_category_08.png);
	font-size: 1.17em;
	font-weight: bold;
}

.right {
	flex: 1 1 75%;
	margin-left: 30px;
	text-align: left;
	background-color: #fff;
}

.title {
	display: flex;
	width: 98%;
	line-height: 55px;
	margin-left: 1%;
	border-bottom: 2px solid #fafafa;
}

.nav-item {
	text-decoration: none;
	margin-left: 20px;
	font-size: 14px;
	color: #333;
}

.cur {
	text-decoration: none;
	margin-left: 20px;
	font-size: 14px;
	color: rgb(0, 158, 48);
}

.more {
	text-align: center;
	border-top: 2px solid rgb(250, 250, 250);
}

.more a {
	font-size: 14px;
	color: #808080;
	text-decoration: none;
}

.a-answer {
	color: #808080;
	float: right;
	line-height: 17px;
	margin-right: 20px;
	cursor: pointer;
}

.ask-li {
	margin-top: 15px;
	border-bottom: 2px solid rgb(250, 250, 250);
}
.a-question {
	cursor: pointer;
	margin-top: 10px;
	height: 36px;
	margin-left: 20px;
	margin-right: 20px;
}

.a-question:hover {
	color: rgb(35, 82, 124);
}
.a-address {
	color: #808080;
	cursor: pointer;
}
.address_c {
	display: flex;
	line-height: 17px;
	color: #808080;
	cursor: pointer;
}

.location:hover {
	color: rgb(35, 82, 124);
}

.ask-more a {
	color: #808080;
	text-decoration: none;
	font-size: 14px;
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
.block {
	text-align: center;
	margin-top: 20px;
	padding-bottom: 20px;
}
</style>
