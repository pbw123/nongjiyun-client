<template>
	<div class="all">
		<div style="height: 30px;width: 100%;"></div>
		<div class="content">
			<div class="title">
				<span>发布提问</span>
			</div>
			<div class="neirong" style="display: flex;">
				<span>交流内容：</span>
				<div style="width: 80%;">
					<el-input type="textarea" :rows="6" v-model="content"
                    :maxLength="maxLength"  placeholder="请输入内容:" />
				</div>
			</div>
			<div class="tupian">
				<el-upload class="upload-demo" action="https://jack.panbingwen.cn:7777/api/img/insetImg" :on-preview="handlePictureCardPreview"
				 :on-remove="handleRemove" :before-remove="beforeRemove" :on-success="handleSuccess" multiple :limit="9" :on-exceed="handleExceed"
				 :file-list="fileList" list-type="picture-card">
					<i class="el-icon-plus"></i>
					<div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
				</el-upload>
				<el-dialog :visible.sync="dialogVisible">
				    <img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
			</div>
			<div class="address">
				<img :src="icon" style="height: 20px;width: 17px;" />
				<span style="margin-left: 5px;">{{LocationCity}}</span>
			</div>
			<div class="btn">
				<button class="put-btn" @click="putExchange()">发布</button>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		Message
	} from 'element-ui';
	export default {
		name: 'putExchange',
		data() {
			return {
        maxLength: 40,
        icon: 'https://save-pan.oss-cn-shanghai.aliyuncs.com/img/4eefe204-1f17-4bed-ae48-de4639853b1b.jpg',
				loginUser: JSON.parse(localStorage.getItem('login_key')),
				content: '',
				imageUrl: '',
				//文件上传的参数
				dialogImageUrl: '',
				dialogVisible: false,
				//图片列表（用于在上传组件中回显图片）
				fileList: [],
				imgs: [],
				LocationCity: "正在定位...", //给渲染层定义一个初始值
			}
		},
		mounted() {
			// this.city() //触发获取城市方法
		},
		methods: {
			putExchange: function() {
				let _this = this;
        if (_this.content.trim().length == 0||_this.content.trim()==='') {
          Message({
            message:'请输入内容',
            type:'warning',
          });
          return;
        }
        if (_this.content.trim().length < 5) {
          Message({
            message:'至少5个字符',
            type:'warning',
          });
          return;
        }

				_this.$http({
					method: 'POST',
					url: this.apiServer+'api/exchange/add?content=' + _this.content + '&userId=' + _this.loginUser.userId +
						'&imgs=' + _this.imgs+'&address=' + _this.LocationCity,
					header: {
						'content-type': 'application/json'
					}
				}).then(function(res) {
					if (res.data.code == 0) {
						Message({
							message: '发布成功!！',
							type: 'success',
						});
						_this.$router.push('/exchange');
					} else {
						Message({
							message: '发布失败!！',
							type: 'error',
						});
					}
				})
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
				this.imgs.push(this.imageUrl);
				console.log("图片返回地址:"+this.imageUrl)
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
				this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			},
		/*	city() { //定义获取城市方法
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
	.title span {
		font-size: 30px;
		font-family: "楷体";
		color: rgb(0, 158, 1);
		font-weight: 600;
	}

	.put-btn {
		height: 40px;
		background-color: rgb(0, 158, 1);
		color: #FFFFFF;
		border: 0px;
		border-radius: 5px;
		margin-top: 30px;
		letter-spacing: 5px;
		width: 80px;
		font-size: 17px;
		cursor: pointer;
	}

	.title {
		border-bottom: 2px solid rgb(92, 92, 91);
		height: 60px;
		line-height: 60px;
		margin-bottom: 30PX;
	}
	.all{
		background-color: #FFFFFF;
		margin-top: 10px;
		margin-bottom: 20px;
	}
	.content{
		width: 80%;
		margin: 0 auto;
	}
	.tupian{
		margin-left: 70px;
		margin-top: 10px;
	}
	.address{
		margin-top: 10px;
		height: 20px;
		line-height: 20px;
		display: flex;
	}
	.btn{
		height: 100px;
		margin-top: 50px;
		border-bottom: 2px solid rgb(92,92,91);
	}
</style>
