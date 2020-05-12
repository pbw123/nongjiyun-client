<template>
	<div class="all">
		<!-- <div>{{userInfo}}</div> -->
		<div class="user-info" v-show="!show">
			<div class="jichu">
				<span style="font-size: 25px;">基础信息</span>
			</div>
			<div class="avatar">
				<span>头&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;像：</span>
				<img :src="userInfo.headUrl" style="height: 60px;width: 60px;margin-top: 5px;" />
			</div>
			<div class="user-name">
				<span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</span>
				<span>{{userInfo.userName}}</span>
			</div>
			<div class="user-name">
				<div style="width: 50%;">
					<span>手机号码：</span>
					<span>{{userInfo.phoneNumber}}</span>
				</div>
				<div>
					<span>身&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;份：</span>
					<span>{{userInfo.identity}}</span>
				</div>
			</div>
			<div class="xiangqing">
				<span style="font-size: 25px;">详情资料</span>
			</div>
			<div class="user-name">
				<div style="width: 50%;">
					<span>学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;历：</span>
					<span>{{userInfo.educational}}</span>
				</div>
				<div>
					<span>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</span>
					<span>{{userInfo.sex}}</span>
				</div>
			</div>
			<div class="user-name">
				<div style="width: 50%;">
					<span>单位名称：</span>
					<span>{{userInfo.unitName}}</span>
				</div>
				<div>
					<span>行业类型：</span>
					<span>{{userInfo.vocation}}</span>
				</div>
			</div>
			<div class="user-name">
				<span>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址：</span>
				<span>{{userInfo.userAddress}}</span>
			</div>
			<div class="user-name">
				<span>邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱：</span>
				<span>{{userInfo.email}}</span>
			</div>
			<div style="border-top: 1px solid rgb(92,92,91);margin-top: 20px;">
				<button class="info-btn" @click="modify()">修改资料</button>
			</div>
		</div>
		<div class="modify" v-show="show">
			<div class="avatar">
				<span>头&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;像：</span>
				<img :src="userInfo.headUrl" style="height: 60px;width: 60px;margin-top: 5px;"/>
				<!-- <button class="avatar-btn">上传头像</button> -->
				<el-upload class="upload-demo" :action="upload"
				 :on-success="handleSuccess" :on-exceed="handleExceed"
				 :file-list="fileList" :show-file-list="false"
                 :before-upload="beforeAvatarUpload">
					<button class="avatar-btn">上传头像</button>
				</el-upload>
				<!-- <el-dialog :visible.sync="dialogVisible">
					<img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog> -->
			</div>
			<div class="user-name">
				<span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</span>
				<div class="input" style="margin-top: 10px;">
					<el-input type="text" v-model="userInfo.userName" />
				</div>
			</div>
			<div class="user-name">
				<div style="width: 50%;">
					<span>手机号码：</span>
					<span>{{userInfo.phoneNumber}}</span>
				</div>
			</div>
			<div class="user-name">
				<div style="display: flex;">
					<span >身&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;份：</span>
					<div style="width: 60%;margin-top: 10px;">
						<el-select v-model="userInfo.identity">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</div>
				</div>
			<div class="user-name">
				<div style="width: 50%;">
					<span>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</span>
					<el-radio v-model="userInfo.sex" label="男">男</el-radio>
					<el-radio v-model="userInfo.sex" label="女">女</el-radio>
				</div>
			</div>
			<div class="user-name">
				<div style="display: flex;">
					<span>学&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;历：</span>
					<div style="width: 60%;margin-top: 10px;">
						<el-input type="text" v-model="userInfo.educational" />
					</div>
				</div>
			</div>
			<div class="user-name">
				<div style="width: 50%;display: flex;">
					<span>单位名称：</span>
					<div style="width: 70%;margin-top: 10px;">
						<el-input type="text" v-model="userInfo.unitName" />
					</div>
				</div>
			</div>
			<div class="user-name">
				<span>行业类型：</span>
				<div style="width: 70%;margin-top: 10px;">
				<el-select v-model="userInfo.vocation">
					<el-option v-for="item in sorts" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				</div>
			</div>
			<div class="user-name">
				<span>地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址：</span>
				<div style="width: 70%;margin-top: 10px;">
					<el-input type="text" v-model="userInfo.userAddress" />
				</div>
			</div>
			<div class="user-name">
				<span>邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱：</span>
				<div style="width: 85%;margin-top: 10px;">
					<el-input type="text" v-model="userInfo.email" />
				</div>
			</div>
			<div style="border-top: 1px solid rgb(92,92,91);margin-top: 20px;">
				<button class="fanhui-btn" @click="fanhui()">返回</button>
				<button class="baocun-btn" @click="update(user)">保存修改</button>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		Message
	} from 'element-ui';
	export default {
		name: 'myInfo',
		data() {
			return {
			  // upload:'http://localhost:7777/api/img/insetImg',
        upload:'https://jack.panbingwen.cn:7777/api/img/insetImg',
        imageUrl: '',
				//文件上传的参数
				dialogImageUrl: '',
				dialogVisible: false,
				//图片列表（用于在上传组件中回显图片）
				fileList: [],
				imgs: [],
				loginUser: JSON.parse(localStorage.getItem('login_key')),
				userInfo: {},
				show: false,
// 				user: {
// 					headUrl: '',
// 					userName: '',
// 					identity: '',
// 					educational: '',
// 					sex: '男',
// 					userAddress: '',
// 					unitName: '',
// 					email: '',
// 					selectProv: '',
// 					selectCity: ''
// 				},
				sorts: [{
					value: '粮经',
					label: '粮经'
				}, {
					value: '园艺',
					label: '园艺'
				}, {
					value: '畜牧',
					label: '畜牧'
				}, {
					value: '水产',
					label: '水产'
				}, {
					value: '农机',
					label: '农机'
				}, {
					value: '其他',
					label: '其他'
				}],
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
			}
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
					url: this.apiServer+'api/user/getUserMsgById',
					header: {
						'content-type': 'application/json'
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
			update: function(user) {
				var _this = this;
				console.log('update:userId(' + _this.loginUser.userId + ')');
				_this.$http({
					method: 'POST',
					url: this.apiServer+'api/user/updateMyMsg',
					params: {
						id: _this.loginUser.userId,
						identity: _this.userInfo.identity,
						sex: _this.userInfo.sex,
						email: _this.userInfo.email,
						educational: _this.userInfo.educational,
						userName: _this.userInfo.userName,
						unitName: _this.userInfo.unitName,
						userAddress: _this.userInfo.userAddress,
						icon:_this.userInfo.headUrl,
						vocation:_this.userInfo.vocation
					},
					header: {
						'content-type': 'application/json'
					}
				}).then(function(res) {
					if (res.data.code == 0) {
						Message({
							message: '修改成功!！',
							type: 'success',
						});
						_this.show = false;
						setTimeout(function() {
							location.reload();
						}, 1000)
					} else {
						Message({
							message: '修改失败!！',
							type: 'error',
							showClose: true
						})
					}
				})
			},
			modify: function() {
				var _this = this;
				_this.show = true;
			},
			fanhui: function() {
				var _this = this;
				_this.show = false;
				_this.getUserMsg();
			},
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
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			//文件上传成功的钩子函数
			handleSuccess(res, file) {
				this.$message({
					type: 'info',
					message: '图片上传成功',
					duration: 6000
				});
				this.imageUrl = res.data;
				this.userInfo.headUrl=this.imageUrl;
				// this.user.headUrl=this.userInfo.headUrl;
				// this.imgs.push(this.imageUrl);
			},
			onExceed(files, fileList) {
				this.$message({
					type: 'info',
					message: '最多只能上传一个图片',
					duration: 6000
				});
			},
			//文件上传前的前的钩子函数
			//参数是上传的文件，若返回false，或返回Primary且被reject，则停止上传
			beforeUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isGIF = file.type === 'image/gif';
				const isPNG = file.type === 'image/png';
				const isBMP = file.type === 'image/bmp';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG && !isGIF && !isPNG && !isBMP) {
					this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传图片大小不能超过 2MB!');
				}
				return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			// 			handlePreview(file) {
			// 				console.log(file);
			// 			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			},
		}
	}
</script>

<style scoped>
	.info-btn {
		margin-top: 20px;
		margin-bottom: 20px;
		background-color: rgb(0, 158, 1);
		color: #FFFFFF;
		border: 0px;
		border-radius: 2px;
		height: 40px;
		font-size: 17px;
		cursor: pointer;
	}

	.user-info {
		margin-top: 20px;
		margin-left: 20px;
		margin-right: 20px;
	}

	.modify {
		margin-top: 40px;
		margin-left: 30px;
		margin-right: 20px;
	}

	.jichu {
		height: 70px;
		line-height: 70px;
		border-bottom: 1px solid rgb(92, 92, 91);
		margin-bottom: 20px;
	}

	.avatar {
		height: 70px;
		display: flex;
	}

	.avatar span {
		line-height: 70px;
		font-size: 16px;
		margin-right: 5px;
	}

	.xiangqing {
		height: 70px;
		line-height: 70px;
		border-bottom: 1px solid rgb(92, 92, 91);

		margin-top: 20px;
		margin-bottom: 20px;
	}

	.user-name {
		/* height: 50px; */
		display: flex;
	}

	.user-name span {
		line-height: 50px;
		font-size: 16px;
		margin-right: 5px;
	}

	.avatar-btn {
		margin-top: 35px;
		margin-left: 10px;
		background-color: rgb(0, 158, 1);
		color: #FFFFFF;
		border: 0px;
		border-radius: 5px;
		height: 30px;
		cursor: pointer;
	}

	.input {
		width: 20%;
		margin-top: 5px;
	}

	.fanhui-btn {
		margin-top: 20px;
		margin-right: 10px;
		background-color: rgb(0, 158, 1);
		color: #FFFFFF;
		border: 0px;
		border-radius: 5px;
		height: 40px;
		font-size: 15px;
		cursor: pointer;
	}

	.baocun-btn {
		margin-top: 20px;
		background-color: rgb(0, 158, 1);
		color: #FFFFFF;
		border: 0px;
		border-radius: 5px;
		height: 40px;
		font-size: 15px;
		cursor: pointer;
	}
</style>
