<template>
	<div class="container">
		<div class="list">
			<div class="left">
				<h3>资讯分类</h3>
				<div class="left-details">
					<div><a href="javascript:;" @click="msg = 1,getNews()" :class="{ cur: msg === 1 }" class="nav-item">首页头条</a></div>
					<div><a href="javascript:;" @click="msg = 2,getNews()" :class="{ cur: msg === 2}" class="nav-item">应时农务</a></div>
					<div><a href="javascript:;" @click="msg = 3,getNews()" :class="{ cur: msg === 3 }" class="nav-item">农业科技</a></div>
					<div><a href="javascript:;" @click="msg = 4,getNews()" :class="{ cur: msg === 4 }" class="nav-item">农业政策</a></div>
					<div><a href="javascript:;" @click="msg = 5,getNews()" :class="{ cur: msg === 5 }" class="nav-item">市场聚焦</a></div>
					<div><a href="javascript:;" @click="msg = 6,getNews()" :class="{ cur: msg === 6 }" class="nav-item">价格行情</a></div>
					<div><a href="javascript:;" @click="msg = 7,getNews()" :class="{ cur: msg === 7 }" class="nav-item">科教动态</a></div>
					<div><a href="javascript:;" @click="msg = 8,getNews()" :class="{ cur: msg === 8 }" class="nav-item">首页动态</a></div>
					<div><a href="javascript:;" @click="msg = 9,getNews()" :class="{ cur: msg === 9 }" class="nav-item">农业气象</a></div>
					<div><a href="javascript:;" @click="msg = 10,getNews()" :class="{ cur: msg === 10 }" class="nav-item">主推数据库</a></div>
					<div><a href="javascript:;" @click="msg = 11,getNews()" :class="{ cur: msg === 11 }" class="nav-item">禽畜品种库</a></div>
					<div><a href="javascript:;" @click="msg = 12,getNews()" :class="{ cur: msg === 12 }" class="nav-item">品牌农业动态</a></div>
					<div><a href="javascript:;" @click="msg = 13,getNews()" :class="{ cur: msg === 13 }" class="nav-item">专业合作</a></div>
					<div><a href="javascript:;" @click="msg = 14,getNews()" :class="{ cur: msg === 14 }" class="nav-item">乡村旅游</a></div>
					<div><a href="javascript:;" @click="msg = 15,getNews()" :class="{ cur: msg === 15 }" class="nav-item">生活服务</a></div>
					<div><a href="javascript:;" @click="msg = 16,getNews()" :class="{ cur: msg === 16 }" class="nav-item">农家致富手机报</a></div>
					<div><a href="javascript:;" @click="msg = 17,getNews()" :class="{ cur: msg === 17 }" class="nav-item">江苏现代农业科技大会</a></div>
				</div>
			</div>
			<div class="right">
				<!-- <div>{{article1s}}</div> -->
				<div class="kuai" v-show="msg === 1" v-for="(article,index) in article1s" :key="index">
					<div class= "shang">
						<span class="shang_text" @click="gotoDetail(article.id)">{{article.title}}</span>
					</div>
					<div class="xia">
						<div v-if="article.icon!=null" class="xia_img">
						<img :src='article.icon' class="kuai_img" />
						</div>
						<div class="xia_content">
							<div style="height: 80px;">
								<span class="xia_text" @click="gotoDetail(article.id)" v-html="handleContent(article.content)"></span>
							</div>
							<div>
								<span class="xia_text" @click="gotoDetail(article.id)">{{handleTime(article.createTime)}}&nbsp;&nbsp;阅读量:{{article.readNumber}}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="kuai" v-show="msg === 2" v-for="(article,index) in article1s" :key="index+'2'">
					<div class= "shang">
						<span class="shang_text" @click="gotoDetail(article.id)">{{article.title}}</span>
					</div>
					<div class="xia">
						<img :src='article.icon' class="kuai_img" />
						<div class="xia_content">
							<div style="height: 80px;">
								<span class="xia_text" @click="gotoDetail(article.id)" v-html="handleContent(article.content)"></span>
			
							</div>
							<div>
								<span class="xia_text" @click="gotoDetail(article.id)">{{handleTime(article.createTime)}}&nbsp;&nbsp;阅读量:{{article.readNumber}}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="kuai" v-show="msg === 3" v-for="(article,index) in article1s" :key="index+'3'">
					<div class= "shang">
						<span class="shang_text" @click="gotoDetail(article.id)">{{article.title}}</span>
					</div>
					<div class="xia">
						<img :src='article.icon' class="kuai_img" />
						<div class="xia_content">
							<div style="height: 80px;">
								<span class="xia_text" @click="gotoDetail(article.id)" v-html="handleContent(article.content)"></span>
				
							</div>
							<div>
								<span class="xia_text" @click="gotoDetail(article.id)">{{handleTime(article.createTime)}}&nbsp;&nbsp;阅读量:{{article.readNumber}}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="kuai" v-show="msg === 4" v-for="(article,index) in article1s" :key="index+'4'">
					<div class= "shang">
						<span class="shang_text" @click="gotoDetail(article.id)">{{article.title}}</span>
					</div>
					<div class="xia">
						<img :src='article.icon' class="kuai_img" />
						<div class="xia_content">
							<div style="height: 80px;">
								<span class="xia_text" @click="gotoDetail(article.id)" v-html="handleContent(article.content)"></span>
				
							</div>
							<div>
								<span class="xia_text" @click="gotoDetail(article.id)">{{handleTime(article.createTime)}}&nbsp;&nbsp;阅读量:{{article.readNumber}}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="kuai" v-show="msg === 5" v-for="(article,index) in article1s" :key="index+'5'">
					<div class= "shang">
						<span class="shang_text" @click="gotoDetail(article.id)">{{article.title}}</span>
					</div>
					<div class="xia">
						<img :src='article.icon' class="kuai_img" />
						<div class="xia_content">
							<div style="height: 80px;">
								<span class="xia_text" @click="gotoDetail(article.id)" v-html="handleContent(article.content)"></span>
				
							</div>
							<div>
								<span class="xia_text" @click="gotoDetail(article.id)">{{handleTime(article.createTime)}}&nbsp;&nbsp;阅读量:{{article.readNumber}}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="kuai" v-show="msg === 6" v-for="(article,index) in article1s" :key="index+'6'">
					<div class= "shang">
						<span class="shang_text" @click="gotoDetail(article.id)">{{article.title}}</span>
					</div>
					<div class="xia">
						<img :src='article.icon' class="kuai_img" />
						<div class="xia_content">
							<div style="height: 80px;">
								<span class="xia_text" @click="gotoDetail(article.id)" v-html="handleContent(article.content)"></span>
				
							</div>
							<div>
								<span class="xia_text" @click="gotoDetail(article.id)">{{handleTime(article.createTime)}}&nbsp;&nbsp;阅读量:{{article.readNumber}}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="kuai" v-show="msg === 7" v-for="(article,index) in article1s" :key="index+'7'">
					<div class= "shang">
						<span class="shang_text" @click="gotoDetail(article.id)">{{article.title}}</span>
					</div>
					<div class="xia">
						<img :src='article.icon' class="kuai_img" />
						<div class="xia_content">
							<div style="height: 80px;">
								<span class="xia_text" @click="gotoDetail(article.id)" v-html="handleContent(article.content)"></span>
				
							</div>
							<div>
								<span class="xia_text" @click="gotoDetail(article.id)">{{handleTime(article.createTime)}}&nbsp;&nbsp;阅读量:{{article.readNumber}}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="kuai" v-show="msg === 8" v-for="(article,index) in article1s" :key="index+'8'">
					<div class= "shang">
						<span class="shang_text" @click="gotoDetail(article.id)">{{article.title}}</span>
					</div>
					<div class="xia">
						<img :src='article.icon' class="kuai_img" />
						<div class="xia_content">
							<div style="height: 80px;">
								<span class="xia_text" @click="gotoDetail(article.id)" v-html="handleContent(article.content)"></span>
				
							</div>
							<div>
								<span class="xia_text" @click="gotoDetail(article.id)">{{handleTime(article.createTime)}}&nbsp;&nbsp;阅读量:{{article.readNumber}}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="kuai" v-show="msg === 9" v-for="(article,index) in article1s" :key="index+'9'">
					<div class= "shang">
						<span class="shang_text" @click="gotoDetail(article.id)">{{article.title}}</span>
					</div>
					<div class="xia">
						<img :src='article.icon' class="kuai_img" />
						<div class="xia_content">
							<div style="height: 80px;">
								<span class="xia_text" @click="gotoDetail(article.id)" v-html="handleContent(article.content)"></span>
				
							</div>
							<div>
								<span class="xia_text" @click="gotoDetail(article.id)">{{handleTime(article.createTime)}}&nbsp;&nbsp;阅读量:{{article.readNumber}}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="kuai" v-show="msg === 10" v-for="(article,index) in article1s" :key="index+'10'">
					<div class= "shang">
						<span class="shang_text" @click="gotoDetail(article.id)">{{article.title}}</span>
					</div>
					<div class="xia">
						<img :src='article.icon' class="kuai_img" />
						<div class="xia_content">
							<div style="height: 80px;">
								<span class="xia_text" @click="gotoDetail(article.id)" v-html="handleContent(article.content)"></span>
				
							</div>
							<div>
								<span class="xia_text" @click="gotoDetail(article.id)">{{handleTime(article.createTime)}}&nbsp;&nbsp;阅读量:{{article.readNumber}}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="kuai" v-show="msg === 11" v-for="(article,index) in article1s" :key="index+'11'">
					<div class= "shang">
						<span class="shang_text" @click="gotoDetail(article.id)">{{article.title}}</span>
					</div>
					<div class="xia">
						<img :src='article.icon' class="kuai_img" />
						<div class="xia_content">
							<div style="height: 80px;">
								<span class="xia_text" @click="gotoDetail(article.id)" v-html="handleContent(article.content)"></span>
				
							</div>
							<div>
								<span class="xia_text" @click="gotoDetail(article.id)">{{handleTime(article.createTime)}}&nbsp;&nbsp;阅读量:{{article.readNumber}}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="kuai" v-show="msg === 12" v-for="(article,index) in article1s" :key="index+'12'">
					<div class= "shang">
						<span class="shang_text" @click="gotoDetail(article.id)">{{article.title}}</span>
					</div>
					<div class="xia">
						<img :src='article.icon' class="kuai_img" />
						<div class="xia_content">
							<div style="height: 80px;">
								<span class="xia_text" @click="gotoDetail(article.id)" v-html="handleContent(article.content)"></span>
				
							</div>
							<div>
								<span class="xia_text" @click="gotoDetail(article.id)">{{handleTime(article.createTime)}}&nbsp;&nbsp;阅读量:{{article.readNumber}}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="kuai" v-show="msg === 13" v-for="(article,index) in article1s" :key="index+'13'">
					<div class= "shang">
						<span class="shang_text" @click="gotoDetail(article.id)">{{article.title}}</span>
					</div>
					<div class="xia">
						<img :src='article.icon' class="kuai_img" />
						<div class="xia_content">
							<div style="height: 80px;">
								<span class="xia_text" @click="gotoDetail(article.id)" v-html="handleContent(article.content)"></span>
				
							</div>
							<div>
								<span class="xia_text" @click="gotoDetail(article.id)">{{handleTime(article.createTime)}}&nbsp;&nbsp;阅读量:{{article.readNumber}}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="kuai" v-show="msg === 14" v-for="(article,index) in article1s" :key="index+'14'">
					<div class= "shang">
						<span class="shang_text" @click="gotoDetail(article.id)">{{article.title}}</span>
					</div>
					<div class="xia">
						<img :src='article.icon' class="kuai_img" />
						<div class="xia_content">
							<div style="height: 80px;">
								<span class="xia_text" @click="gotoDetail(article.id)" v-html="handleContent(article.content)"></span>
				
							</div>
							<div>
								<span class="xia_text" @click="gotoDetail(article.id)">{{handleTime(article.createTime)}}&nbsp;&nbsp;阅读量:{{article.readNumber}}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="kuai" v-show="msg === 15" v-for="(article,index) in article1s" :key="index+'15'">
					<div class= "shang">
						<span class="shang_text" @click="gotoDetail(article.id)">{{article.title}}</span>
					</div>
					<div class="xia">
						<img :src='article.icon' class="kuai_img" />
						<div class="xia_content">
							<div style="height: 80px;">
								<span class="xia_text" @click="gotoDetail(article.id)" v-html="handleContent(article.content)"></span>
				
							</div>
							<div>
								<span class="xia_text" @click="gotoDetail(article.id)">{{handleTime(article.createTime)}}&nbsp;&nbsp;阅读量:{{article.readNumber}}</span>
							</div>
						</div>
					</div>
				</div>
				<div class="kuai" v-show="msg === 16" v-for="(article,index) in article1s" :key="index+'16'">
					<div class= "shang">
						<span class="shang_text" @click="gotoDetail(article.id)">{{article.title}}</span>
					</div>
					<div class="xia">
						<img :src='article.icon' class="kuai_img" />
						<div class="xia_content">
							<div style="height: 80px;">
								<span class="xia_text" @click="gotoDetail(article.id)" v-html="handleContent(article.content)"></span>
				
							</div>
							<div>
								<span class="xia_text" @click="gotoDetail(article.id)">{{handleTime(article.createTime)}}&nbsp;&nbsp;阅读量:{{article.readNumber}}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	
	export default {
		name: 'News',
		data() {
			return {
				msg:1,
				article1s: [],
// 				article2s: [{
// 						title: '【对话厅局长】杨时云：聚焦硬任务，推动乡村振兴走在前列！',
// 						content: '习近平总书记在今年全国两会期间参加地方代表团审议时，就实施乡村振兴战略和脱贫攻坚等发表了一系列重要讲话，为实施乡村振兴战略、做好农业农村各项工作明确了重点，指明了方向。农业农村部门如何适应新形势新要求...[详情]',
// 						img: 'http://object.jsnjy.net.cn/OSS/20190508/0f0219ac2039433b995e88bdac1b95d8.jpg',
// 						time: '2019-05-03 01:14:32  阅读量：123',
// 						url:'../NewsDetail'
// 					},
// 					{
// 						title: '【关注】2019年江苏省农业农村厅行业（条线）工作要点陆续发布！',
// 						content: '2019年江苏省农业农村厅行业（条线）工作要点陆续发布！点击标题链接查看《2019年畜牧兽医工作要点》《2019年全省种植业工作要点》《2019年全省植保植检工作要点》《2019年全省农业农村法规工作...[详情]',
// 						img: 'http://object.jsnjy.net.cn/OSS/20190430/7bb2e2d17ad143908eea92c84f616e2b.jpg',
// 						time: '2019-02-23 06:02:47  阅读量：1443',
// 					},
// 					
// 				]
			};
		},
		created:function(){
			const loading=this.$loading({
				lock:true,
				text:'加载中',
				spinner:'el-icon-loading',
				background:'rgb(250,250,250)',
				target:'.content',
				customClass:'mask'
			});
			setTimeout(() =>{
				loading.close()
			},1000);
		},
// 		onshow:function(){
// 			this.getNews();
// 		},
		mounted: function() {
			this.getNews();
		},
		methods:{
			getNews:function(){
				var _this=this;
				console.log('getNews'+_this.article1s);
				console.log('id:'+_this.msg)
				_this.$http({
					method:'GET',
					url:this.apiServer+'api/news/getNewsListById',
					params:{
						id:_this.msg
					},
					header:{
					'content-type': 'application/x-www-form-urlencoded'
					}
				}).then(function(res){
					if(res.data.code==0){
						_this.article1s=res.data.data;
					}else{
						alert('查询失败，'+res.data.msg)
					}
				})
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
			handleContent:function(content){
				content = content.replace(/(\n)/g, "");
				content = content.replace(/(\t)/g, "");
				content = content.replace(/(\r)/g, "");
				content = content.replace(/<\[^>]*>/g, "");
				content = content.replace(/\s*/g, "");
				if(content.length>65){
					return content.substring(0,65)+'...[详情]';
				}else{
					return content.substring(0,65)
				}
			},
			gotoDetail:function(id){
				this.$router.push({
					path: '/NewsDetail',
					query: {
						id: id
					}
				});
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				var _this = this;
				_this.pageSize = val;
				_this.getNews();
			},
			handleCurrentChange(val) {
				console.log(`第${val}页 `);
				var _this = this;
				_this.currPage = val;
				_this.getNews();
			},
		}
	}
</script>

<style scoped>
	.container {
		margin: 0 auto;
		width: 1024px;
	}

	.list {
		display: flex;
		width: 100%;
		margin-top: 10px;
		height: auto;
	}

	.left {
		width: 28%;
		background-color: #fff;
		/* height: 490px; */
	}

	h3 {
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
		width: 70%;
		margin-left: 20px;
		text-align: left;
		background-color: #fff;
		margin-bottom: 30px;

	}

	.left-details div {
		height: 54px;
		border-top: 2.5px solid rgb(250, 250, 250);
		/* list-style: none; */
		/* margin-left: 30px; */
	}

	.nav-item {
		text-decoration: none;
		color: #333;
		line-height: 54px;
		font-size: 16px;
		margin-left: 30px;
	}

	.cur {
		text-decoration: none;
		color: rgb(0, 158, 48);
		line-height: 54px;
		font-size: 16px;
	}

	b {
		display: block;
		cursor: pointer;
		margin-right: 10%;
		float: right;
		top: 7px;
		font-size: 20px;
		width: 20px;
		height: 20px;
		text-align: center;
		color: #666;
		font-weight: bold;
	}
	.kuai {
		width: 619px;
		border-bottom: 2px solid #fafafa;
		margin-bottom: 10px;
		padding-bottom: 20px;
		margin-left: 4%;
		cursor: pointer;
	}
	
	.shang {}
	
	.shang_text {
		font-size: 18px;
		color: #333;
		text-decoration: none;
	}
	
	.xia {
		display: flex;
	}
	
	.kuai_img {
		display: block;
		width: 150px;
		height: 100px;
		float: left;
		margin-right: 3%;
	}
	
	.xia_content {
		padding-top: 5px;
		width: 75%;
		margin-left: 3%;
	}
	
	.xia_text {
		color: #808080;
		text-decoration: none;
	}
</style>
