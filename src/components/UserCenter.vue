<template>
	<div class="container">
		<div class="header">
			<div class="menu">
				<div class="left">
          <router-link to="/home">
            <el-tooltip content="首页" placement="bottom">
              <img src="/static/logo_njy.png" class="img" />
            </el-tooltip>
          </router-link>
				</div>
			</div>
		</div>
		<div class="body">
			<!-- <div>{{userInfo}}</div> -->
			<div class="left" style="width: 30%;">
				<div class="kong" style="width: 100%;height: 20px;background-color: #FFFFFF;"></div>
				<div class="user" style="">
					<div class="avatar">
						<img :src="userInfo.headUrl" />
					</div>
					<div class="name" style="text-align: center;">
						<span style="font-size: 17px;">{{userInfo.userName}}</span>
					</div>
				</div>
				<div class="list">
					<li class="list-title">
						<router-link to="/myInfo" class="list_text">个人资料</router-link>
					</li>
					<li class="list-title">
						<router-link to="/myQuestion" class="list_text">
							我的提问
						</router-link>
					</li>
					<li class="list-title">
						<router-link to="/myAnswer" class="list_text">我的回答</router-link>
					</li>
					<li class="list-title">
						<router-link to="/myExchange" class="list_text">我的交流</router-link>
					</li>
					<li class="list-title">
						<router-link to="/myCollect" class="list_text">我的收藏</router-link>
					</li>
					<li class="list-title">
						<router-link to="/myFollow" class="list_text">我的关注</router-link>
					</li>
					<li class="list-title">
						<router-link to="/myGQ" class="list_text">修改密码</router-link>
					</li>
					<div class="zx" @click="zhuxiao()">
						<span>注销账号</span>
					</div>
					<div class="kong" style="width: 100%;height: 50px;background-color: #FFFFFF;"></div>
				</div>
			</div>
			<div class="six">
				<router-view></router-view>
			</div>
		</div>
		<div class="footer">
			<div class="top">
				<div class="footer_left">
					<img src="/static/logo_njy_white.png" class="top_img" />
				</div>
				<div class="footer_right">
					<div class="footer_phone">
						<img src="/static/img_code_android.png" class="footer_img" />
						<div class="phone">
							<p>扫一扫</p>
							<p>安卓下载</p>
						</div>
					</div>
					<div class="footer_phone">
						<img src="/static/img_code_ios.png" class="footer_img" />
						<div class="phone">
							<p>扫一扫</p>
							<p>苹果下载</p>
						</div>
					</div>
				</div>
			</div>
			<div class="end">
				<p class="end_text">Copyright©2017 江苏农村经济杂志社 版权所有 苏ICP备06039616号-3</p>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		Message
	} from 'element-ui';
	export default {
		name: 'userCenter',
		data() {
			return {
				loginUser: JSON.parse(localStorage.getItem('login_key')),
				userInfo: {}
			};
		},
		mounted: function() {
			this.getUserMsg();
		},
		methods: {
			getUserMsg: function() {
				var _this = this;
				console.log('getUserInfo:userId(' + _this.loginUser.userId + ')')
				_this.$http({
					methods: 'GET',
					url: this.apiServer + 'api/user/getUserMsgById',
					header: {
						'content-type': 'application/json',

					},
					params: {
						userId: _this.loginUser.userId
					}
				}).then(function(res) {
					if (res.data.code == 0) {
						_this.userInfo = res.data.data;
					} else {
						alert('数据加载失败！');
					}
				})
			},
			//注销账号
			zhuxiao: function() {
				var _this = this;
				console.log('注销账号:userId(' + _this.loginUser.userId + ')');
				_this.$confirm('是否确定要注销该账号?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					_this.$http({
						methods: 'GET',
						url: this.apiServer + 'api/user/destroyUser',
						header: {
							'content-type': 'application/json',
						},
						params: {
							id: _this.loginUser.userId
						}
					}).then(function(res) {
						if (res.data.code == 0) {
							Message({
								message: '注销成功!！',
								type: 'success',
							});
							_this.logout()
						} else {
							Message({
								message: '注销失败!！',
								type: 'error',
							});
						}
					});
				}).catch(() => {
					_this.$message({
						type: 'info',
						message: '已取消注销'
					});
				});
			},
			logout: function() {
				var _this = this;
				console.log('log out')
				localStorage.removeItem('login_key');
				_this.loginUser=null;
				// this.$router.go(0);
				_this.$router.push('/index');
			},
		}
	};
</script>

<style scoped>
	.six {
		-moz-box-shadow: 0 0 10px #06c;
		-webkit-box-shadow: 0 0 10px #06c;
		box-shadow: 0 0 10px #06c;
	}

	.header {
		width: 100%;
		height: 138px;
		background-color: #FFFFFF;
		display: flex;
	}
	.body{
		width: 70%;
		margin: 0 auto;
		background-color: #FFFFFF;
		margin-top: 10px;
		margin-bottom: 20px;
		display: flex;
	}
	.avatar{
		text-align: center;
		margin-bottom: 10px;
	}
	.avatar img{
		height: 100px;
		width: 100px;
		border-radius: 50%;
	}
	.list{
		margin-top: 10px;
		width: 100%;
	}
	/* .list-title{
		border-top: 2px solid rgb(244,244,244);
	} */
	.zx{
		height: 50px;
		text-align: center;
		line-height: 50px;
	}
	.zx span{
		font-size: 17px;
		color: rgb(109,109,109);
		cursor: pointer;
	}
	.six{
		width: 70%;
		background-color: rgb(244,246,248);
	}

	.menu {
		display: flex;
		padding-top: 1%;
		width: 1024px;
		margin-left: 11.5%;
	}

	.img {
		height: 140px;
		vertical-align: middle;
		margin-right: 80px;
		margin-top: -4%;
	}

	.footer {
		width: 100%;
		height: 183px;
		background-color: rgb(45, 50, 55);
	}

	.top {
		display: flex;
	}

	.footer_left {
		border-right: 1px solid #C7C7C7;
		margin-top: 20px;
		width: 45%;
	}

	.footer_right {
		display: flex;
	}

	.footer_phone {
		display: flex;
		margin-top: 45px;
		width: 245px;
		height: 76px;
		float: left;
	}

	.top_img {
		height: 140px;
		vertical-align: middle;
		margin-top: -2%;
		margin-left: 120px;
	}

	.footer_img {
		width: 75px;
		height: 75px;
		margin-left: 31%;
		margin-top: 1%;
		float: left;
		vertical-align: middle;
	}

	.phone {
		color: white;
		vertical-align: middle;
		margin-left: 5px;
	}

	.end {
		width: 100%;
		text-align: center;
		color: white;
		font-size: 12px;
	}

	.end_text {
		text-align: center;
	}

	.list {
		height: 500px;
		width: 300px;
		/* margin-left: 130px; */
		/* display: flex; */
	}

	.list_text {
		height: 50px;
		width: 100%;
		vertical-align: middle;
		line-height: 50px;
		text-decoration: none;
		padding: 0.7em 4.5em;
		font-size: 20px;
		letter-spacing: 5px;
		color: rgb(51, 51, 51);
	}

	.list_text:hover {
		/* border-right: 2px solid rgb(0, 158, 1); */
		color: rgb(0, 158, 1);
		font-weight: 600;
	}

	.router-link-active:hover {
		font-weight: 600;
		color: #FFFFFF;
	}

	.router-link-active {
		background-color: rgb(0, 158, 1);
		color: #FFFFFF;
	}
	.list-title {
		height: 50px;
		width: 281px;
		border-bottom: 2px solid rgb(244,244,244);
		text-align: center;
	}

	.li1 {
		list-style: none;
		float: left;
		padding: 0;
		margin-top: 5px;
		height: 100px;
		width: 80px;
		background-color: #FFFFFF;
	}
</style>
