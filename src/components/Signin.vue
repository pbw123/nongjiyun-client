<template>
	<div class="signin">
		<div class="form">
			<div class="avatar">
				<img src="/static/njy.png"/>
			</div>
			<div class="input-box">
				<div class="input-phone">
					<input type="text" v-model="userDTO.phoneNumber" placeholder="请输入手机号"/>
				</div>
				<div class="input-password" style="margin-top: 10px;">
					<input type="password" v-model="userDTO.password" placeholder="请输入密码"/>
				</div>
			</div>
			<div v-if="!alertshow" style="width: 70%;margin: 0 auto;height: 16px;"></div>
			<div v-if="alertshow" style="width: 70%;margin: 0 auto;color: red;font-size: 12px;">*&nbsp;{{tishi}}&nbsp;*</div>
			<button type='primary' @click="signIn(userDTO)">登录</button>
			<div class="bottom">
				<div class="left" style="flex: 1 1 50%;">
					<a href="">忘记密码？</a>
				</div>
				<div class="right">
          <router-link to="/Signup">
            没有账号？现在注册
          </router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { Message } from 'element-ui';
	export default {
		name: 'Signin',
		data() {
			return {
				userDTO:{
					phoneNumber:'',
					password:''
				},
				alertshow:false,
				tishi:'123'
			};
		},
		methods:{
			signIn: function(userDTO) {
				let _this=this;
				console.log(userDTO.phoneNumber);
				_this.$http({
					method:'POST',
					url:this.apiServer+'api/user/signIn',
          // url:'https://jack.panbingwen.cn:7777/api/user/signIn',

          	data:{
              'phoneNumber':userDTO.phoneNumber,
              'password':userDTO.password
            },
					header:{
						'content-type': 'application/json'
					}
				})
          .then(function(res){
					if(res.data.code==0){
						console.log(res.data.data);
						var user={
							userId:res.data.data.id,
							userName:res.data.data.userName,
							phoneNumber:res.data.data.phoneNumber,
							password:res.data.data.password,
							headUrl:res.data.data.headUrl,
							login:true
						};
						var s = JSON.stringify(user);
						localStorage.setItem('login_key', s);
						Message({
							message:'登录成功，欢迎使用农技耘。',
							type:'success'
						});
						_this.$router.push('/home');
						 
					}else{
						_this.alertshow=true
						_this.tishi=res.data.msg
					}
				})
			},
		}
	}
</script>

<style scoped>
	a{
		/* text-decoration: none; */
		color: #FFFFFF;
		font-size: 12px;
	}
	input{
		/* background-color:transparent; */
		border: 0px;
		height: 40px;
		width: 100%;
		font-size: 15px;
		border-radius: 2px;
	}
	button{
		width: 60%;
		height: 40px;
		margin-left: 20%;
		background-color: rgb(0,158,1);
		border-radius: 5px;
		border: 0px;
		color: #FFFFFF;
		font-size: 17px;
		margin-top: 20px;
	}
	.avatar{
		margin-top: 20px;
		text-align: center;
		margin-bottom: 10px;
	}
	.avatar img{
		height: 70px;
		width: 70px;
		border-radius: 50%;
	}
	.bottom{
		display: flex;
		width: 60%;
		margin: 0 auto;
		margin-top: 5px;
	}
	.input-box{
		width: 70%;
		margin-top: 20px;
		margin: 0 auto;
		margin-bottom: 5px;
	}
	.input-box div{
		/* border-bottom: 2px solid rgb(0,158,1); */
	}
	.input-box img{
		height: 20px;
		width: 20px;
		margin-top: 10px;
	}
	.header {
		width: 100%;
		height: 138px;
		background-color: #FFFFFF;
		display: flex;
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
	.form{
		width: 100%;
		/* height: 400px; */
		/* border: 2px solid rgb(0,158,1); */
		margin: 0 auto;margin-top: 15px;
		border-radius: 5px;


	}
	.signin{
		position: absolute;
		bottom: 150px;
		right: 480px;
		width: 400px;
		height: 350px;
		background:rgba(0, 0, 0, 0.5) none repeat scroll 0 0 !important;/*实现FF背景透明，文字不透明*/
		filter:Alpha(opacity=50);
		background:#000000;/*实现IE背景透明 */
		border: 1px solid #6F6F6F;
		border-radius: 10px;
	}
</style>
