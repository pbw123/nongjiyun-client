<template>
	<div class="signup">
		<div class="signup1" v-show="!vshow">
			<!-- <div class="pic">
				<span>发送验证码</span>
			</div> -->
			<div class="input-form" style="width: 100%;">
				<div class="input1" style="display: flex;">
					<div class="input-e" style="">
						<el-input type="text" v-model="phonenumber" placeholder="请输入手机号" />
					</div>
					<button v-show="bshow" class="btn-yzm" @click="getVerifyCode()">获取验证码</button>
					<button v-show="!bshow" class="btn-yzm2">{{count}}&nbsp;秒</button>
				</div>
				<div class="input2">
					<el-input type="text" v-model="code" placeholder="请输入验证码" />
				</div>
				<div v-if="!alertshow" style="width: 70%;height: 16px;"></div>
				<div v-if="alertshow" style="width: 70%;color: red;font-size: 12px;">*&nbsp;{{tishi}}&nbsp;*</div>
				<div class="next" style="margin-top: 40px;">
					<button class="btn-next" @click="next()">下一步</button>
				</div>
			</div>
		</div>
		<div class="signup2" v-show="vshow">
			<div class="logo-title">
				<img src="../assets/njy.png"/>
				<div style="height: 60px;line-height: 80px;">
					<span class="title-text">注册信息</span>
				</div>
			</div>
			<!-- <div class="input-info">
				<span class="t">头&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;像:</span>
				<div class="avatar">
					<input type="file" @change="getFile($user)"/>
				</div>
				<div>
					<button>选择头像</button>
				</div>
			</div> -->
			<div class="input-info" style="margin-top: 10px;">
				<span class="t">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名:</span>
				<div class="e">
					<el-input type="text" v-model="user.userName" placeholder="姓名" />
				</div>
			</div>
			<div class="input-info" style="margin-top: 10px;">
				<span class="t">手&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;机:</span>
				<div class="phone-box">
					<span style="color: rgb(96,98,102);margin-left: 10px;">{{phonenumber}}</span>
				</div>
			</div>
			<div class="input-info" style="margin-top: 10px;">
				<span class="t">密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:</span>
				<div class="e">
					<el-input type="password" v-model="user.password" placeholder="密码" show-password />
				</div>
			</div>
			<div class="input-info" style="margin-top: 10px;">
				<span class="t">确认密码:</span>
				<div class="e">
					<el-input type="password" v-model="user.password2" placeholder="再次输入密码" show-password />
				</div>
			</div>
			<div class="input-info" style="margin-top: 10px;display: flex;">
				<span class="t">选择类型:</span>
				<div class="e">
					<el-select v-model="user.identity" placeholder="选择类型">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</div>
			<div class="input-diqu" style="margin-top: 10px;">
				<span class="t">选择地区:</span>
				<el-select size="small" style="width: 100px" v-model="user.selectProv" placeholder="省辖" v-on:change="getProv($event)">
					<el-option v-for="item in provs" :label="item.label" :value="item.value" :key="item.value">
					</el-option>
				</el-select>
				<el-select size="small" style="width: 100px" v-if="user.selectProv!=''" v-model="user.selectCity" placeholder="市辖"
				 v-on:change="getCity($event)">
					<el-option v-for="item in citys" :label="item.label" :value="item.value" :key="item.value">
					</el-option>
				</el-select>
			</div>
			<div class="btn" style="margin-top: 40px;">
				<button class="btn-zhuce" @click="add(user)">注册</button>
			</div>
		</div>
	</div>
</template>

<script>
	import { Message } from 'element-ui';
	export default {
		name: 'Signup',
		data() {
			return {
				vshow: false,
				alertshow: false,
				tishi: '123',
				bshow: true,
				timer: null,
				count: '',
				phonenumber: '',
				code: '',
				file:'',
				user: {
					userName: '',
					phoneNumber: '',
					password: '',
					password2: '',
					identity: '',
					selectProv: '',
					headUrl:'http://save-pan.oss-cn-shanghai.aliyuncs.com/img/9b45813f-b17e-47ca-ac52-81dc2e3d24b8.jpg',
					selectCity: '',
				},
				options: [{
					value: '科教管理人员',
					label: '科教管理人员'
				}, {
					value: '科研院校人员',
					label: '科研院校人员'
				}, {
					value: '农口工作人员',
					label: '农口工作人员'
				}, {
					value: '基层行政管理人员',
					label: '基层行政管理人员'
				}, {
					value: '合作社',
					label: '合作社'
				}, {
					value: '家庭农场',
					label: '家庭农场'
				}, {
					value: '企业',
					label: '企业'
				}, {
					value: '普通农户',
					label: '普通农户'
				}, {
					value: '农民经纪人',
					label: '农民经济人'
				}, {
					value: '其他',
					label: '其他'
				}],

				provs: [{
						label: "南京市",
						value: "南京市"
					},
					{
						label: "无锡市",
						value: "无锡市"
					},
					{
						label: "徐州市",
						value: "徐州市"
					},
					{
						label: "常州市",
						value: "常州市"
					},
					{
						label: "苏州市",
						value: "苏州市"
					},
					{
						label: "南通市",
						value: "南通市"
					},
					{
						label: "连云港市",
						value: "连云港市"
					},
					{
						label: "淮安市",
						value: "淮安市"
					},
					{
						label: "盐城市",
						value: "盐城市"
					},
					{
						label: "扬州市",
						value: "扬州市"
					},
					{
						label: "镇江市",
						value: "镇江市"
					},
					{
						label: "泰州市",
						value: "泰州市"
					},
					{
						label: "宿迁市",
						value: "宿迁市"
					},
					{
						label: "外省",
						value: "外省"
					},
				],
				citys: [],
			};
		},
		methods: {
			/*二级联动选择地区*/
			getProv: function(prov) {
				let tempCity = [];
				this.citys = [];
				this.selectCity = '';
				let allCity = [{
					prov: "南京市",
					label: "玄武区"
				}, {
					prov: "南京市",
					label: "秦淮区"
				}, {
					prov: "南京市",
					label: "鼓楼区"
				}, {
					prov: "南京市",
					label: "建邺区"
				}, {
					prov: "南京市",
					label: "雨花台区"
				}, {
					prov: "南京市",
					label: "栖霞区"
				}, {
					prov: "南京市",
					label: "江宁区"
				}, {
					prov: "南京市",
					label: "浦口区"
				}, {
					prov: "南京市",
					label: "六合区"
				}, {
					prov: "南京市",
					label: "溧水区"
				}, {
					prov: "南京市",
					label: "高淳区"
				}, {
					prov: "无锡市",
					label: "梁溪区"
				}, {
					prov: "无锡市",
					label: "新吴区"
				}, {
					prov: "无锡市",
					label: "滨湖区"
				}, {
					prov: "无锡市",
					label: "溪山区"
				}, {
					prov: "无锡市",
					label: "惠山区"
				}, {
					prov: "无锡市",
					label: "江阴市"
				}, {
					prov: "无锡市",
					label: "宜兴市"
				}, {
					prov: "徐州市",
					label: "云龙区"
				}, {
					prov: "徐州市",
					label: "鼓楼区"
				}, {
					prov: "徐州市",
					label: "泉山区"
				}, {
					prov: "徐州市",
					label: "徐州经济技术开发区"
				}, {
					prov: "徐州市",
					label: "贾汪区"
				}, {
					prov: "徐州市",
					label: "铜山区"
				}, {
					prov: "徐州市",
					label: "邳州区"
				}, {
					prov: "徐州市",
					label: "新沂区"
				}, {
					prov: "徐州市",
					label: "睢宁县"
				}, {
					prov: "徐州市",
					label: "沛县"
				}, {
					prov: "徐州市",
					label: "丰县"
				}, {
					prov: "常州市",
					label: "天宁区"
				}, {
					prov: "常州市",
					label: "钟楼区"
				}, {
					prov: "常州市",
					label: "新北区"
				}, {
					prov: "常州市",
					label: "武进区"
				}, {
					prov: "常州市",
					label: "金坛区"
				}, {
					prov: "常州市",
					label: "溧阳市"
				}, {
					prov: "连云港市",
					label: "连云区"
				}, {
					prov: "连云港市",
					label: "海州区"
				}, {
					prov: "连云港市",
					label: "赣榆区"
				}, {
					prov: "连云港市",
					label: "东海区"
				}, {
					prov: "连云港市",
					label: "灌云区"
				}, {
					prov: "连云港市",
					label: "灌南区"
				}, {
					prov: "连云港市",
					label: "开发区"
				}, {
					prov: "南通市",
					label: "崇川区"
				}, {
					prov: "南通市",
					label: "港闸区"
				}, {
					prov: "南通市",
					label: "通州区"
				}, {
					prov: "南通市",
					label: "如皋市"
				}, {
					prov: "南通市",
					label: "海门市"
				}, {
					prov: "南通市",
					label: "启东市"
				}, {
					prov: "南通市",
					label: "海安市"
				}, {
					prov: "南通市",
					label: "如东县"
				}, ];
				for (var val of allCity) {
					if (prov == val.prov) {
						console.log(val);
						tempCity.push({
							label: val.label,
							value: val.label
						})
					}
				}
				this.citys = tempCity;
			},
			getCity: function(city) {
				console.log(city);
				console.log(this.selectCity)
			},
			selectCountry: function(value) {
				this.cityName = this.countryName.city[0];
			},
			getFile: function (user) {
                this.file = event.target.files[0];
                console.log(this.file);
            },
			next: function() {
				var _this = this;
				this.$http({
					method: 'POST',
					url: this.apiServer+'api/user/matchVerify',
					data: {
						'code': _this.code,
						'phoneNumber': _this.phonenumber
					},
					header: {
						'content-type': 'application/json'
					}
				}).then(function(res) {
					if (res.data.code == 0) {
						_this.vshow = true;
					} else {
						_this.alertshow = true
						_this.tishi = res.data.msg
					}
				})
			},
			getVerifyCode: function() {
				var _this = this;
				console.log(_this.phonenumber)
				this.$http({
					method: 'POST',
					url: this.apiServer+'api/user/sendCode',
					data: {
						'phoneNumber': _this.phonenumber,
					},
					header: {
						'content-type': 'application/json'
					}
				}).then(function(res) {
					if (res.data.code == 0) {
						// alert("验证码已发送,请查看")
						_this.$alert('验证码已发送,请注意查看。', '验证码发送', {
						    confirmButtonText: '确定',
						    callback: action => {
						    }
						});
						_this.alertshow = false
						console.log(res.data.data);
						const TIME_COUNT = 60;
						if (!_this.timer) {
							_this.count = TIME_COUNT;
							_this.bshow = false;
							_this.timer = setInterval(() => {
								if (_this.count > 0 && _this.count <= TIME_COUNT) {
									_this.count--;
								} else {
									_this.bshow = true;
									clearInterval(_this.timer);
									_this.timer = null;
								}
							}, 1000)
						};
					} else {
						_this.alertshow = true
						_this.tishi = res.data.msg
					}
				})
			},
			add: function(user) {
				if(this.user.userName.length===0){
					// alert('姓名和密码不能为空！')
					Message({
						message:'姓名不能为空！',
						type:'warning'
					})
				}else{
					if (this.user.password === this.user.password2) {
						var _this = this;
						_this.user.phoneNumber = _this.phonenumber;
						console.log(_this.user.userName)
						console.log(_this.user.phoneNumber)
						console.log(_this.user.password)
						console.log(_this.user.identity)
						console.log(_this.user.selectProv+_this.user.selectCity)
						_this.$http({
							method: 'POST',
							url: this.apiServer+'api/user/signUp',
							params: {
								identity: _this.user.identity,
								password: _this.user.password,
								phoneNumber: _this.user.phoneNumber,
								userName: _this.user.userName,
								userAddress: _this.user.selectProv+_this.user.selectCity,
								icon:_this.user.headUrl
							},
							header: {
								'content-type': 'application/json'
							}
						}).then(function(res) {
							if (res.data.code == 0) {
								_this.$alert('已注册成功，请先登录。', '注册成功', {
                                    confirmButtonText: '确定',
                                    callback: action => {
                                       _this.$router.push('/sign') 
                                    }
                                });
// 								alert("注册成功，请登录")
// 								_this.$router.push('/sign')
							} else {
								// alert("注册失败!"+res.data.msg)
								Message({
									message:'注册失败!！'+res.data.msg,
									type:'error',
									showClose:true
								})
							}
						})
					} else {
						// alert("两次密码不一致，请重新输入！")
						Message({
							message:'两次密码不一致，请重新输入！',
							type:'warning'
						})
					}
				}
			}
		}
	}
</script>

<style>
	.t {
		color: #FFFFFF;
		/* font-weight: 550; */
	}

	/* .signup1 input {
		height: 40px;
		border-radius: 2px;
		border: 0px;
		font-size: 15px;
	} */
	.input-e {
		width: 70%;
		height: 40px;
		border-radius: 2px;
		border: 0px;
		font-size: 15px;
		margin-right: 5%;
	}

	/* .signup2 input {
		height: 30px;
		border-radius: 2px;
		border: 0px;
		width: 70%;
	} */
	.e {
		/* height: 30px; */
		border-radius: 2px;
		border: 0px;
		width: 70%;
		margin-left: 5px;
	}

	.btn-zhuce {
		height: 40px;
		width: 70%;
		background-color: rgb(0, 158, 1);
		color: #FFFFFF;
		border: 0px;
		border-radius: 5px;
		font-size: 17px;
		font-weight: 500;
		margin-left: 15%;
	}

	.btn-next {
		height: 40px;
		width: 100%;
		background-color: rgb(0, 158, 1);
		color: #FFFFFF;
		border: 0px;
		border-radius: 5px;
		font-size: 17px;
		font-weight: 500;
	}

	.btn-yzm {
		border-radius: 5px;
		height: 40px;
		background-color: rgb(0, 158, 1);
		border: 0px;
		color: #FFFFFF;
	}

	.btn-yzm2 {
		border-radius: 5px;
		height: 40px;
		border: 0px;
		color: rgb(0, 158, 1);
		width: 85px;
		font-size: 15px;
	}

	.signup {
		position: absolute;
		bottom: 100px;
		right: 430px;
		width: 500px;
		height: 500px;
		background: rgba(0, 0, 0, 0.5) none repeat scroll 0 0 !important;
		/*实现FF背景透明，文字不透明*/
		filter: Alpha(opacity=50);
		background: #000000;
		/*实现IE背景透明 */
		border: 1px solid #6F6F6F;
		border-radius: 10px;
	}

	.signup1 {
		width: 70%;
		margin: 0 auto;
		margin-top: 50px;
	}
	.signup2{
		margin-top: 20px;
		margin-left: 15%;
		width: 70%;
	}
	.logo-title{
		margin-bottom: 10px;
		display: flex
	}
	.logo-title img{
		height: 60px;
		width: 60px;
		border-radius: 50%;
	}

	.phone-box {
		width: 70%;
		height: 40px;
		background-color: #FFFFFF;
		border-radius: 2px;
		margin-left: 5px;
		line-height: 40px;
	}
	.input2{
		margin-top: 10px;
		margin-bottom: 10px;
	}

	.input-info {
		display: flex;
		line-height: 40px;
	}
	.title-text{
		margin-left: 10px;
		font-size: 25px;
		color: rgb(0, 158, 1);
		font-weight: 600;
		font-family: "楷体";
	}
</style>
