<template>
	<div class="all">
		<div style="height: 30px;width: 100%;"></div>
		<div class="content">
			<div class="title">
				<span>快速提问</span>
			</div>
			<div class="fenlei">
				<span>选择分类：</span>
				<div class="e">
					<el-select v-model="question.fenlei" placeholder="选择分类">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</div>
			<div class="neirong" style="display: flex;">
				<span>问题内容：</span>
				<div style="width: 80%;">
				    <el-input type="textarea" :rows="4" v-model="question.content" placeholder="请详细描述您遇到的问题.例如:植物类型？生长期？发病部位等信息,以方便专家解答." />
				</div>
			</div>
			<div class="tupian">
				<el-upload class="upload-demo" :action="upload" :on-preview="handlePictureCardPreview"
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
				<img src="../assets/icon_address.png" style="height: 20px;width: 17px;"/>
				<span style="margin-left: 5px;">{{LocationCity}}</span>
			</div>
			<div class="btn">
				<button class="put-btn" @click="putQuestion()">提交</button>
			</div>
		</div>
	</div>
</template>

<script>
	import { Message } from 'element-ui';
	export default {
	  name: 'putQuestion',
		data(){
			return{
        upload:'http://localhost:7777/api/img/insetImg',
        loginUser:JSON.parse(localStorage.getItem('login_key')),
				question:{
					content:'',
					fenlei:'',
				},
				imageUrl: '',
				//文件上传的参数
				dialogImageUrl: '',
				dialogVisible: false,
				//图片列表（用于在上传组件中回显图片）
				fileList: [],
				imgs: [],
				LocationCity: "正在定位...", //给渲染层定义一个初始值
				options: [{
					value: '粮经',
					label: '粮经'
				}, {
					value: '园艺',
					label: '园艺'
				}, {
					value: '畜禽',
					label: '畜禽'
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
			}
		},
		mounted:function(){
			this.city();
		},
		methods:{
			putQuestion:function(){
				var _this=this;
				_this.$http({
					method:'POST',
					url:this.apiServer+'api/question/add?content=' + _this.question.content + '&userId=' + _this.loginUser.userId +
						'&imgs=' + _this.imgs+'&sort='+_this.question.fenlei+'&address='+_this.LocationCity,
					header: {
						'content-type': 'application/json'
					}
				}).then(function(res){
					if(res.data.code==0){
						Message({
							message:'发布成功!！',
							type:'success',
						});
						_this.$router.push('/ask');
					}else{
						Message({
							message:'发布失败!！',
							type:'error',
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
			handlePreview(file) {
				console.log(file);
			},
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			},
			handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
			city() { //定义获取城市方法
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
			},
		}
	}
</script>

<style scoped>
	.all{
		background-color: #FFFFFF;
		margin-top: 10px;
		margin-bottom: 20px;
	}
	.content{
		width: 80%;
		margin: 0 auto;
	}
	.title{
		border-bottom: 2px solid rgb(92,92,91);
		height: 60px;
		line-height: 60px;
	}
	.title span{
		font-size: 30px;
		font-family: "楷体";
		color: rgb(0,158,1);
		font-weight: 600;
	}
	.fenlei{
		display: flex;
		height: 70px;
		line-height: 70px;
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
	.put-btn{
		height: 40px;
		background-color: rgb(0,158,1);
		color: #FFFFFF;
		border: 0px;
		border-radius: 5px;
		margin-top: 30px;
		letter-spacing: 5px;
		width: 80px;
		font-size: 17px;
		cursor: pointer;
	}
</style>
