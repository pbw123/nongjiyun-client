<template>
	<div class="main">
		<div class="expert-all">
			<div class="expert-banner">
				<div class="top">
					<div>
						<img class="avatar" :src="expertInfo.headImg" />
						<div class="e-name">
							<div>
								<span class="expert-name">{{ expertInfo.expertName }}</span>
							</div>
							<div>
								<span class="cw">{{ expertInfo.grade }}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="expert-info">
				<div class="e-info">
					<p>
						[职 称]
						<span class="expert-profession">{{ expertInfo.jobTitle }}</span>
					</p>
					<p>
						[单 位]
						<span class="expert-unit">{{ expertInfo.unitName }}</span>
					</p>
					<p>
						[邮 箱]
						<span class="expert-email">{{ expertInfo.email }}</span>
					</p>
					<p>
						[专业方向]
						<span class="expert-major">{{ expertInfo.profession }}</span>
					</p>
					<p>
						[提问数量]
						<span @click="gotoQuestionList(expertInfo.id)">
							<a class="expert-questionCount">{{ expertInfo.number }}</a>
							<a href="" class="expert-more"><img src="/static/icon_look.png" /></a>
						</span>
					</p>
					<p>
						[个人简介]
						<span class="expert-introduce">{{ expertInfo.resume }}</span>
					</p>
				</div>
			</div>
		</div>
		<button class="new-btn" @click="gotoAskExpert(expertInfo.id)">咨询专家</button>
	</div>
</template>

<script>
export default {
	name: 'Expert',
	data() {
		return {
			id: 0,
			expertInfo: {},
			loginUser: {}
		};
	},
	mounted: function() {
		this.getId();
		this.getExpertDetil();
		this.getUserInfo();
	},
	methods: {
		getId: function() {
			var _this = this;
			_this.id = _this.$route.query.id;
		},
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
		getExpertDetil: function() {
			var _this = this;
			console.log('expert:' + _this.id);
			_this
				.$http({
					method: 'GET',
					url: this.apiServer + 'api/expert/getExpertDetail',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					params: {
						id: _this.id
					}
				})
				.then(function(res) {
					if (res.data.code == 0) {
						_this.expertInfo = res.data.data.expert;
					} else {
						alert('加载数据失败');
					}
				});
		},
		gotoAskExpert: function(id) {
			var _this = this;
			if (_this.loginUser.login == false) {
				_this
					.$confirm('抱歉您还未登录，不能向专家提问，请先登录。点击确定登录。', '提醒', {
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
				this.$router.push({ path: '/askExpert', query: { id: id } });
			}
		},
		gotoQuestionList: function(id) {
			this.$router.push({ path: '/expert_Questions', query: { id: id } });
		}
	}
};
</script>

<style scoped>
.main {
	width: 1024px;
	margin: 0 auto;
	margin-bottom: 20px;
}

.expert-all {
	background-color: white;
	width: 100%;
	height: auto;
	position: relative;
	margin-top: 10px;
}

.expert-banner {
	height: 255px;
	background-repeat: no-repeat;
	background-size: 100% 100%;
	background-image: url(/static/expertDetail.jpg);
	z-index: 999;
	background-position: center;
	position: relative;
	border-bottom: 5px solid #fafafa;
}

.top {
	width: 240px;
	padding-top: 60px;
	padding-bottom: 60px;
	height: 250px;
	margin: 0 auto;
	text-align: center;
	position: relative;
}

.avatar {
	width: 90px;
	height: 90px;
	border-radius: 45px;
	border: 3px solid #cdcdcd;
	vertical-align: middle;
}

.e-name {
	width: 240px;
	padding-top: 15px;
}

.expert-name {
	display: inline-block;
	color: white;
	font-size: 22px;
}

.cw {
	width: 125px;
	text-align: left;
	color: white;
	font-size: 12px;
	padding: 2px 5px;
	background-color: red;
	border-radius: 5px;
}

.expert-info {
	width: 100%;
	height: auto;
	background-color: #fff;
	margin: 0 auto;
}
.expert-questionCount {
	cursor: pointer;
	text-decoration: none;
	/* line-height:11px; */
	color: #333;
}
.expert-questionCount:hover {
	color: rgb(35, 82, 124);
}

.e-info {
	width: 100%;
	margin: 0 auto;
}
.e-info img {
	margin-left: 10px;
	border: 0;
	vertical-align: middle;
	width: 18px;
	/* height:11px; */
}

.e-info p {
	font-size: 18px;
	/* margin-top:15px; */
	color: #333;
	padding-left: 2%;
	padding-right: 2%;
	border-bottom: 2px solid #fafafa;
}

.e-info p span {
	display: inline-block;
	width: 80%;
	margin-left: 55px;
	color: #666;
	vertical-align: top;
	line-height: 2em;
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
