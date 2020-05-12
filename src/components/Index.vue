<template>
	<div>
		<div class="header">
			<div class="menu">
				<div class="left">
					<img src="../assets/logo_njy.png" class="img"/>
				</div>
				<div class="right">
					<li class="li1">
						<router-link to="/home" class="right_text">首页</router-link>
					</li>

					<li class="li1">
						<router-link to="/news" class="right_text">资讯</router-link>
					</li>

					<li class="li1">
						<router-link to="/videoList" class="right_text">视频</router-link>
					</li>

					<li class="li1">
						<router-link to="/ask" class="right_text">提问</router-link>
					</li>

					<li class="li1">
						<router-link to="/exchange" class="right_text">交流</router-link>
					</li>

					<li class="li1">
						<router-link to="/zhibo" class="right_text">直播</router-link>
					</li>
				</div>
			</div>
			<div class="login" style="display: flex;" v-if="user!=null">
				<div class="avatar" style="line-height: 170px;" v-if="user.login">
					<img :src="userInfo.headUrl" style="height: 50px;width: 50px;border-radius: 50%;" />
				</div>
				<div v-if="user.login" style="margin-left: 10px;line-height: 5px;margin-top: 35px;">
					<a href="/userCenter">
						<el-tooltip content="个人中心" placement="bottom" effect="light">
							<p style="color: rgb(0,158,1);font-size: 18px;cursor: pointer;">{{userInfo.userName}}</p>
						</el-tooltip>
					</a>
					<span style="color: rgb(109,109,109);cursor: pointer;" @click="logout()">退出</span>
					<p style="margin-top: 30px;color: rgb(109,109,109);line-height: 15px;">
					<img src="../assets/icon_address.png"
					style="height: 13px;width: 10px;margin-right: 3px;">{{LocationCity}}</p>
				</div>
			</div>
			<div class="login" style="display: flex;" v-if="user==null">
				<div class="avatar" style="line-height: 170px;">
					<img src="../assets/default.png" style="height: 50px;width: 50px;border-radius: 50%;" />
				</div>
				<div style="margin-left: 10px;line-height: 5px;margin-top: 45px;">
					<a href="/sign">
						<p style="color: rgb(0,158,1);font-size: 16px;cursor: pointer;">点击登录</p>
					</a>
				</div>
			</div>
		</div>
		<div class="content">
			<router-view />
		</div>
		<div class="footer">
			<div class="top">
				<div class="footer_left">
					<img src="../assets/logo_njy_white.png" class="top_img" />
				</div>
				<div class="footer_right">
					<div class="footer_phone">
						<img src="../assets/img_code_android.png" class="footer_img" />
						<div class="phone">
							<p>扫一扫</p>
							<p>安卓下载</p>
						</div>
					</div>
					<div class="footer_phone">
						<img src="../assets/img_code_ios.png" class="footer_img" />
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
	var loginRes, _self;
	export default {
		name: 'Index',
		data() {
			return {
				storageData: {},
				user: JSON.parse(localStorage.getItem('login_key')),
				LocationCity: "正在定位..." ,//给渲染层定义一个初始值
				weather:'',
				userInfo:{}
			};
		},
		mounted() {
			// this.city(); //触发获取城市方法
			if(this.user!=null){
				this.getUserMsg();
			}

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
			//退出登录，删除本地存储
			logout: function() {
				var _this = this;
				console.log('log out')
				localStorage.removeItem('login_key');
				_this.user=null;
				Message({
					message: '已退出当前账号。',
					type: 'success'
				});
				// this.$router.go(0);
				_this.$router.push('/index');
			},
			//获取登录用户的信息
			getUserMsg: function() {
				var _this = this;
				// console.log('getUserInfo:userId(' + _this.loginUser.userId + ')')
				_this.$http({
					methods: 'GET',
					url:_this.apiServer+'api/user/getUserMsgById',
					header: {
						'content-type': 'application/json'
					},
					params: {
						userId: _this.user.userId
					}
				}).then(function(res) {
					if (res.data.code == 0) {
						_this.userInfo = res.data.data;
					} else {
						alert('用户信息加载失败！');
					}
				})
			},
			//定义获取城市方法
	/*		city() {
				const geolocation = new BMap.Geolocation();
				var _this = this
				geolocation.getCurrentPosition(function getinfo(position) {
					let city = position.address.city; //获取城市信息
					let province = position.address.province; //获取省份信息
					_this.LocationCity =province+city
				}, function(e) {
					_this.LocationCity = "定位失败"
				}, {
					provider: 'baidu'
				});
			},*/
		}
	}
</script>

<style scoped>
	a {
		text-decoration: none;
	}

	.header {
		width: 100%;
		height: 138px;
		background-color: white;
		display: flex;
	}

	.menu {
		display: flex;
		padding-top: 1%;
		width: 1024px;
		margin-left: 11.5%;
	}

	.left {}

	.right {
		height: 124px;
		margin-left: 130px;
		display: flex;
	}

	.img {
		height: 140px;
		vertical-align: middle;
		margin-right: 80px;
		margin-top: -4%;
	}

	.right_text {
		height: 100px;
		vertical-align: middle;
		line-height: 100px;
		text-decoration: none;
		color: #818996;
		padding: 2.6em 1.5em;
		font-size: 16px;
	}

	.right_text:hover {
		border-bottom: 2px solid rgb(0, 158, 1);
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

	.right_style {
		border-bottom: 2px solid #009e01;
		color: #009e01;
		font-weight: bold;
		background-color: #009e01;
		color: white;
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

	.content {
		margin-top: 10px;
		margin: 0 auto;
		width: 77%;
		margin-bottom: 20px;
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

	.top_img {
		height: 140px;
		vertical-align: middle;
		margin-top: -2%;
		margin-left: 120px;
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
</style>
