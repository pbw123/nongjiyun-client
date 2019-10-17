<template>
	<div class="container">
		<div class="left">
			<h3 class="left_text">视频分类</h3>
			<div><a href="javascript:;" @click="msg = 0,keyword='1',getVideoBySort()" :class="{ cur: msg === 0 }" class="nav-item">推荐</a></div>
			<div><a href="javascript:;" @click="msg = 1,keyword='2',getVideoBySort()" :class="{ cur: msg === 1 }" class="nav-item">种植</a></div>
			<div><a href="javascript:;" @click="msg = 2,keyword='3',getVideoBySort()" :class="{ cur: msg === 2 }" class="nav-item">园艺</a></div>
			<div><a href="javascript:;" @click="msg = 3,keyword='4',getVideoBySort()" :class="{ cur: msg === 3 }" class="nav-item">畜禽</a></div>
			<div><a href="javascript:;" @click="msg = 4,keyword='5',getVideoBySort()" :class="{ cur: msg === 4 }" class="nav-item">水产</a></div>
			<div><a href="javascript:;" @click="msg = 5,keyword='6',getVideoBySort()" :class="{ cur: msg === 5 }" class="nav-item">其他</a></div>
			<div><a href="javascript:;" @click="msg = 6,keyword='7',getVideoBySort()" :class="{ cur: msg === 6 }" class="nav-item">乡村</a></div>
			<div><a href="javascript:;" @click="msg = 7,keyword='8',getVideoBySort()" :class="{ cur: msg ===7 }" class="nav-item">新闻</a></div>
		</div>
		<div class="right">
			<div v-show="msg === 0">
				<ul>
					<li v-for="(video,index) in videos_s" :key="index">
						<div class="v-img">
							<a tag="a" target="_blank" :href="video.videoUrl">
								<img :src="video.img" />
							</a>
						</div>
						<div class="v-title">
							<div>
								<div class="v-title-left">
									<a>{{video.videoTitle}}</a>
								</div>
								<div class="v-title-right">
									<a><span class="span-r">{{video.readNumber}}次播放</span></a>
								</div>
							</div>
							<div style="margin-left: 5px;padding-bottom: 10px;">
								<!-- <span class="collect_video" v-if="loginuser.login==false" @click="collect(video.id)">☆收藏</span> -->
								<span class="collect_video" v-if="video.status==1" @click="collect(video.id)">☆收藏</span>
								<span class="collect_video1" v-if="video.status==0" @click="collect(video.id)">★已收藏</span>
							</div>
						</div>
					</li>
				</ul>
				<li class="block">
					<el-pagination background layout="prev, pager, next,jumper" :total="totalRecord" :page-size="pageSize"
					 :current-page="currPage" @current-change="handleCurrentChange">
					</el-pagination>
				</li>
			</div>
			<div v-show="msg === 1">
				<ul>
					<li v-for="(video,index) in videos_s" :key="index">
						<div class="v-img">
							<a tag="a" target="_blank" :href="video.videoUrl">
								<img :src="video.img" />
							</a>
						</div>
						<div class="v-title">
							<div>
								<div class="v-title-left">
									<a>{{video.videoTitle}}</a>
								</div>
								<div class="v-title-right">
									<a><span class="span-r">{{video.readNumber}}次播放</span></a>
								</div>
							</div>
							<div style="margin-left: 5px;padding-bottom: 10px;">
								<!-- <span class="collect_video" v-if="loginuser.login==false" @click="collect(video.id)">☆收藏</span> -->
								<span class="collect_video" v-if="video.status==1" @click="collect(video.id)">☆收藏</span>
								<span class="collect_video1" v-if="video.status==0" @click="collect(video.id)">★已收藏</span>
							</div>
						</div>
					</li>
				</ul>
				<li class="block">
					<el-pagination background layout="prev, pager, next,jumper" :total="totalRecord" :page-size="pageSize"
					 :current-page="currPage" @current-change="handleCurrentChange">
					</el-pagination>
				</li>
			</div>
			<div v-show="msg === 2">
				<ul>
					<li v-for="(video,index) in videos_s" :key="index">
						<div class="v-img">
							<a tag="a" target="_blank" :href="video.videoUrl">
								<img :src="video.img" />
							</a>
						</div>
						<div class="v-title">
							<div>
								<div class="v-title-left">
									<a>{{video.videoTitle}}</a>
								</div>
								<div class="v-title-right">
									<a><span class="span-r">{{video.readNumber}}次播放</span></a>
								</div>
							</div>
							<div style="margin-left: 5px;padding-bottom: 10px;">
								<!-- <span class="collect_video" v-if="loginuser.login==false" @click="collect(video.id)">☆收藏</span> -->
								<span class="collect_video" v-if="video.status==1" @click="collect(video.id)">☆收藏</span>
								<span class="collect_video1" v-if="video.status==0" @click="collect(video.id)">★已收藏</span>
							</div>
						</div>
					</li>
				</ul>
				<li class="block">
					<el-pagination background layout="prev, pager, next,jumper" :total="totalRecord" :page-size="pageSize"
					 :current-page="currPage" @current-change="handleCurrentChange">
					</el-pagination>
				</li>
			</div>
			<div v-show="msg === 3">
				<ul>
					<li v-for="(video,index) in videos_s" :key="index">
						<div class="v-img">
							<a tag="a" target="_blank" :href="video.videoUrl">
								<img :src="video.img" />
							</a>
						</div>
						<div class="v-title">
							<div>
								<div class="v-title-left">
									<a>{{video.videoTitle}}</a>
								</div>
								<div class="v-title-right">
									<a><span class="span-r">{{video.readNumber}}次播放</span></a>
								</div>
							</div>
							<div style="margin-left: 5px;padding-bottom: 10px;">
								<!-- <span class="collect_video" v-if="loginuser.login==false" @click="collect(video.id)">☆收藏</span> -->
								<span class="collect_video" v-if="video.status==1" @click="collect(video.id)">☆收藏</span>
								<span class="collect_video1" v-if="video.status==0" @click="collect(video.id)">★已收藏</span>
							</div>
						</div>
					</li>
				</ul>
				<li class="block">
					<el-pagination background layout="prev, pager, next,jumper" :total="totalRecord" :page-size="pageSize"
					 :current-page="currPage" @current-change="handleCurrentChange">
					</el-pagination>
				</li>
			</div>
			<div v-show="msg === 4">
				<ul>
					<li v-for="(video,index) in videos_s" :key="index">
						<div class="v-img">
							<a tag="a" target="_blank" :href="video.videoUrl">
								<img :src="video.img" />
							</a>
						</div>
						<div class="v-title">
							<div>
								<div class="v-title-left">
									<a>{{video.videoTitle}}</a>
								</div>
								<div class="v-title-right">
									<a><span class="span-r">{{video.readNumber}}次播放</span></a>
								</div>
							</div>
							<div style="margin-left: 5px;padding-bottom: 10px;">
								<!-- <span class="collect_video" v-if="loginuser.login==false" @click="collect(video.id)">☆收藏</span> -->
								<span class="collect_video" v-if="video.status==1" @click="collect(video.id)">☆收藏</span>
								<span class="collect_video1" v-if="video.status==0" @click="collect(video.id)">★已收藏</span>
							</div>
						</div>
					</li>
				</ul>
				<li class="block">
					<el-pagination background layout="prev, pager, next,jumper" :total="totalRecord" :page-size="pageSize"
					 :current-page="currPage" @current-change="handleCurrentChange">
					</el-pagination>
				</li>
			</div>
			<div v-show="msg === 5">
				<ul>
					<li v-for="(video,index) in videos_s" :key="index">
						<div class="v-img">
							<a tag="a" target="_blank" :href="video.videoUrl">
								<img :src="video.img" />
							</a>
						</div>
						<div class="v-title">
							<div>
								<div class="v-title-left">
									<a>{{video.videoTitle}}</a>
								</div>
								<div class="v-title-right">
									<a><span class="span-r">{{video.readNumber}}次播放</span></a>
								</div>
							</div>
							<div style="margin-left: 5px;padding-bottom: 10px;">
								<!-- <span class="collect_video" v-if="loginuser.login==false" @click="collect(video.id)">☆收藏</span> -->
								<span class="collect_video" v-if="video.status==1" @click="collect(video.id)">☆收藏</span>
								<span class="collect_video1" v-if="video.status==0" @click="collect(video.id)">★已收藏</span>
							</div>
						</div>
					</li>
				</ul>
				<li class="block">
					<el-pagination background layout="prev, pager, next,jumper" :total="totalRecord" :page-size="pageSize"
					 :current-page="currPage" @current-change="handleCurrentChange">
					</el-pagination>
				</li>
			</div>
			<div v-show="msg === 6">
				<ul>
					<li v-for="(video,index) in videos_s" :key="index">
						<div class="v-img">
							<a tag="a" target="_blank" :href="video.videoUrl">
								<img :src="video.img" />
							</a>
						</div>
						<div class="v-title">
							<div>
								<div class="v-title-left">
									<a>{{video.videoTitle}}</a>
								</div>
								<div class="v-title-right">
									<a><span class="span-r">{{video.readNumber}}次播放</span></a>
								</div>
							</div>
							<div style="margin-left: 5px;padding-bottom: 10px;">
								<!-- <span class="collect_video" v-if="loginuser.login==false" @click="collect(video.id)">☆收藏</span> -->
								<span class="collect_video" v-if="video.status==1" @click="collect(video.id)">☆收藏</span>
								<span class="collect_video1" v-if="video.status==0" @click="collect(video.id)">★已收藏</span>
							</div>
						</div>
					</li>
				</ul>
				<li class="block">
					<el-pagination background layout="prev, pager, next,jumper" :total="totalRecord" :page-size="pageSize"
					 :current-page="currPage" @current-change="handleCurrentChange">
					</el-pagination>
				</li>
			</div>
			<div v-show="msg === 7">
				<ul>
					<li v-for="(video,index) in videos_s" :key="index">
						<div class="v-img">
							<a tag="a" target="_blank" :href="video.videoUrl">
								<img :src="video.img" />
							</a>
						</div>
						<div class="v-title">
							<div>
								<div class="v-title-left">
									<a>{{video.videoTitle}}</a>
								</div>
								<div class="v-title-right">
									<a><span class="span-r">{{video.readNumber}}次播放</span></a>
								</div>
							</div>
							<div style="margin-left: 5px;padding-bottom: 10px;">
								<!-- <span class="collect_video" v-if="loginuser.login==false" @click="collect(video.id)">☆收藏</span> -->
								<span class="collect_video" v-if="video.status==1" @click="collect(video.id)">☆收藏</span>
								<span class="collect_video1" v-if="video.status==0" @click="collect(video.id)">★已收藏</span>
							</div>
						</div>
					</li>
				</ul>
				<li class="block">
					<el-pagination background layout="prev, pager, next,jumper" :total="totalRecord" :page-size="pageSize"
					 :current-page="currPage" @current-change="handleCurrentChange">
					</el-pagination>
				</li>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		Message
	} from 'element-ui';
	import {
		MessageBox
	} from 'element-ui';
	export default {
		name: 'VideoList',
		data() {
			return {
				msg: 0,
				keyword:1,
				totalRecord: 0,
				currPage: 1,
				pageSize: 10,
				loginuser: {},
				videos: [],
				videos_s:[],
// 				totalRecord_s: 0,
// 				currPage_s: 1,
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
				loading.close()
			}, 1000);
		},
		mounted: function() {
			this.getUserId();
			this.getVideo();
			this.getVideoBySort();
		},
		methods: {
			getUserId:function(){
				var _this=this;
				const user=localStorage.getItem('login_key');
				var loginKey=JSON.parse(user);
				if(loginKey){
					_this.loginuser={
						userId:loginKey.userId,
						login:loginKey.login
					}
				}else{
					_this.loginuser={
						login:false
					}
				}
			},
			getVideo: function() {
				var _this = this;
				_this.$http({
					method: 'GET',
					url: this.apiServer+'api/news/selectVideo',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					params: {
						currPage: _this.currPage,
						pageSize: _this.pageSize,
						userId: _this.loginuser.userId
					}

				}).then(function(res) {
					if (res.data.code == 0) {
						_this.videos = res.data.data;
						_this.totalRecord=res.data.total;
						console.log(_this.videos)
					} else {
						alert('加载数据失败');
					}
				})
			},
			getVideoBySort: function() {
				var _this = this;
				_this.$http({
					method: 'POST',
					url: this.apiServer+'video/searchVideoBySort',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					params: {
						currPage: _this.currPage_s,
						pageSize: _this.pageSize,
						userId: _this.loginuser.userId,
						sort:_this.keyword
					}
			
				}).then(function(res) {
					if (res.data.code == 0) {
						_this.videos_s = res.data.data;
						_this.totalRecord=res.data.total;
						console.log(_this.videos)
					} else {
						alert('加载数据失败');
					}
				})
			},
			collect: function(id) {
				var _this = this;
				if(_this.loginuser.login==false){
					_this.$confirm('抱歉您还未登录，不能收藏，请先登录。点击确定登录。', '提醒', {
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
								message: action === 'cancel' ?
									'已放弃登录' :
									'停留在当前页面'
							})
						});
				}else{
					_this.$http({
						method: 'GET',
						url: this.apiServer+'api/news/collectVideo',
						header: {
							'content-type': 'application/json;charset=UTF-8 '
						},
						params: {
							userId: _this.loginuser.userId,
							videoId: id
						}
					}).then(function(res) {
						if (res.data.code == 0) {
							// _this.getVideo();
							_this.getVideoBySort();
							if (res.data.data.status == 0) {
								Message({
									message: '收藏成功！',
									type: 'success'
								});
								// _this.status=res.data.data.status;
							} else {
								Message({
									message: '已取消收藏！',
									type: 'success'
								});
								// _this.status=res.data.data.status;
							}
						} else {
							Message({
								message: '失败！',
								type: 'error'
							});
						}
					})
				}
			},
			sel() {
				console.log(this.value);
				console.log(this.value2);
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				var _this = this;
				_this.pageSize = val;
				_this.getVideo();
			},
			handleCurrentChange(val) {
				console.log(`第${val}页 `);
				var _this = this;
				_this.currPage = val;
				_this.getVideo();
			}
		}

	};
</script>

<style scoped>
	.container {
		margin: 0 auto;
		width: 1024px;
		display: flex;
		width: 100%;
		margin-top: 10px;
		height: auto;
	}

	.left {
		width: 28%;
		background-color: #fff;
		/* height: 490px */
	}

	.left div {
		line-height: 54px;
		height: 54px;
		border-top: 2px solid rgb(250, 250, 250);
		list-style: none;
		text-align: center;
	}

	.left_text {
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
		background-color: #fff;
		margin-bottom: 30px;

	}

	.nav-item {
		text-decoration: none;
		height: 50px;
		color: #333;
		line-height: 50px;
		font-size: 16px;
	}

	.cur {
		color: rgb(0, 158, 48);
		line-height: 50px;
		font-size: 16px;
	}

	.right img {
		width: 315px;
		height: 189px;
		border: none;
		vertical-align: middle;
	}

	/* .right li:first-child {
		width: 40%;
		float: left;
		margin-right: 2%;
		list-style: none;
	} */

	.right li {
		width: 50%;
		border-bottom: 2px solid #fafafa;
		margin-bottom: 10px;
		float: left;
		padding-bottom: 2%;
		padding-top: 2%;
	}

	/* .right ul {
		padding: 1% 4% 1% 10%;
	} */

	/* .video-content{
		margin: 0;
	    padding: 0;
	} */
	.v-title{
		color: #808080;
		background-color: rgb(250,250,250);
		width: 315px;
	}

	.v-title-left {
		width: 66%;
		line-height: 45px;
		float: left;
		margin-left: 2%;
		margin-right: 2%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.v-title-right {
		width: 30%;
		float: left;
		line-height: 45px;
		color: #808080;
		text-align: center;
	}

	.collect_video {
		cursor: pointer;
	}

	.collect_video1 {
		cursor: pointer;
		color: rgb(0, 158, 1);
	}
	.block{
		margin-left: 33%;
		padding-bottom: 20px;
		border: 0px;
	}
</style>
