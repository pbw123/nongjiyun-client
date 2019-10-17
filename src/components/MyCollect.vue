<template>
	<div>
		<div class="top">
			<div class="top-text" @click="msg = 0" :class="{ cur: msg === 0 }"><a href="javascript:;" class="nav-item" :class="{ cur1: msg === 0 }">问答</a></div>
			<div class="top-text" @click="msg = 1" :class="{ cur: msg === 1 }"><a href="javascript:;" class="nav-item" :class="{ cur1: msg === 1 }">交流</a></div>
			<div class="top-text" @click="msg = 2" :class="{ cur: msg === 2 }"><a href="javascript:;" class="nav-item" :class="{ cur1: msg === 2 }">资讯</a></div>
			<div class="top-text" @click="msg = 3" :class="{ cur: msg === 3 }"><a href="javascript:;" class="nav-item" :class="{ cur1: msg === 3 }">视频</a></div>
		</div>
		<div class="content">
			<!-- <div>{{c_question}}</div> -->
			<div class="c-qenv" v-show="msg === 0">
				<div v-show="!show1">
					<div class="c-exchange" v-for="(item,index) in c_question" :key="index">
						<div class="a-content">
							<div class="shang" style="display: flex;">
								<div class="avatar" style="margin-right: 10px;" @click="gotoAskDetail(item.question.id,loginUser.userId)">
									<img :src="item.question.user.headUrl" style="height: 40px;width: 40px;border-radius: 50%;" />
								</div>
								<div class="name" style="margin-top: 3px;width: 25%;" @click="gotoAskDetail(item.question.id,loginUser.userId)">
									<span style="color: rgb(109,109,109);">{{item.question.user.userName}}</span></br>
									<span style="color: rgb(109,109,109);font-size: 13px;">{{item.question.user.userAddress}}</span>
								</div>
								<div style="margin-top: 3px;display: flex;width: 55%;" @click="gotoAskDetail(item.question.id,loginUser.userId)">
									<div class="leixing">
										<span>{{item.question.user.identity}}</span>
									</div>
									<div class="leixing" style="margin-left: 10px;">
										<span>{{item.question.sort}}</span>
									</div>
								</div>
								<div style="margin-top: 5px;">
									<span style="color: rgb(0,158,1);" @click="collectQuestion(item.question.id,loginUser.userId)">取消收藏</span>
								</div>
							</div>
							<div class="zhong" style="margin-bottom: 10px;margin-top: 10px;" @click="gotoAskDetail(item.question.id,loginUser.userId)">
								<div class="zhong1-content">
									<span>{{handleContent(item.question.content)}}</span>
								</div>

								<div class="zhong-ad">

									<img src="../assets/icon_address.png" style="height: 17px;width: 12px;margin-right: 3px;" />
									<div >
										<span style="color: rgb(109,109,109);font-size: 12px;">{{item.question.address}}</span>
									</div>
									<!-- <div>
										<span style="color: rgb(109,109,109);font-size: 12px;"></span>
									</div> -->
								</div>
							</div>
							<div class="xia" @click="gotoAskDetail(item.question.id,loginUser.userId)">
								<div style="margin-top: 10px;display: flex;">
									<span style="flex: 1 1 80%;color: rgb(109,109,109);">{{handleTime(item.question.createTime)}}</span>
									<span style="color: rgb(109,109,109);">已回答：{{item.question.replyAmount}}</span>
								</div>
							</div>
						</div>
					</div>
					<div class="block">
						<el-pagination 
						background layout="prev, pager, next,jumper" :total="totalRecord_q"
						:page-size="pageSize" :current-page="currPage_q"
						@current-change="handleCurrentChange_question"
						>
						</el-pagination>
					</div>
				</div>
				<div class="none" v-show="show1">
					<div class="none-text">
						<div class="img">
							<img src="../assets/铁锹.png" style="height: 70px;width: 70px;" />
						</div>
						<span>暂无内容</span>
					</div>
				</div>
			</div>
			<div class="c-qenv" v-show="msg === 1">
				<!-- <div>{{c_question}}</div> -->
				<div v-show="!show2">
					<div class="c-exchange" v-for="(item,index) in c_exchange" :key="index">
						<div class="a-content">
							<div class="shang" style="display: flex;">
								<div class="avatar" style="margin-right: 10px;" @click="gotoExchangeDetail(item.exchange.id,loginUser.userId)">
									<img :src="item.exchange.user.headUrl" style="height: 40px;width: 40px;border-radius: 50%;" />
								</div>
								<div class="name" style="margin-top: 3px;width: 25%;" @click="gotoExchangeDetail(item.exchange.id,loginUser.userId)">
									<span style="color: rgb(109,109,109);">{{item.exchange.user.userName}}</span></br>
									<span style="color: rgb(109,109,109);font-size: 13px;">{{item.exchange.user.userAddress}}</span>
								</div>
								<div style="margin-top: 3px;display: flex;width: 53%;" @click="gotoExchangeDetail(item.exchange.id,loginUser.userId)">
									<div class="leixing">
										<span>{{item.exchange.user.identity}}</span>
									</div>
								</div>
								<div style="margin-top: 3px;">
									<span style="color: rgb(0,158,1);" @click="collectExchange(item.exchange.id,loginUser.userId)">取消收藏</span>
								</div>
							</div>
							<div class="zhong" style="margin-bottom: 10px;margin-top: 10px;" @click="gotoExchangeDetail(item.exchange.id,loginUser.userId)">
								<div class="zhong1-content">
									<span>{{handleContent(item.exchange.content)}}</span>
								</div>
								<div class="zhong-ad">
									<img src="../assets/icon_address.png" style="height: 17px;width: 12px;margin-right: 3px;" />
									<div>
										<span style="color: rgb(109,109,109);font-size: 12px;">{{item.exchange.address}}</span>
										<!-- <span style="color: rgb(109,109,109);font-size: 12px;">江苏省南京市栖霞区羊山北路</span> -->
									</div>
								</div>
							</div>
							<div class="xia">
								<div style="margin-top: 10px;display: flex;">
									<div style="flex: 1 1 70%;"  @click="gotoExchangeDetail(item.exchange.id,loginUser.userId)">
										<span style="color: rgb(109,109,109);">{{handleTime(item.exchange.createTime)}}</span>
									</div>
									<div>
										<span style="color: rgb(0,158,1);" v-if="item.exchange.isLike==0" @click="isLike(item.exchangeId,loginUser.userId)">已赞：{{item.exchange.like}}</span>
										<span style="color: rgb(109,109,109);" v-if="item.exchange.isLike==1" @click="isLike(item.exchangeId,loginUser.userId)">点赞：{{item.exchange.like}}</span>
										<span style="color: rgb(109,109,109);">已回答：{{item.exchange.replyNumber}}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
						<div class="block">
						<el-pagination background layout="prev, pager, next,jumper" :total="totalRecord_e" :page-size="pageSize"
						 :current-page="currPage_e" @current-change="handleCurrentChange_exchange">
						</el-pagination>
					</div>
				</div>
				<div class="none" v-show="show2">
					<div class="none-text">
						<div class="img">
							<img src="../assets/铁锹.png" style="height: 70px;width: 70px;" />
						</div>
						<span>暂无内容</span>
					</div>
				</div>
			</div>
			<div class="c-qenv" v-show="msg === 2">
				<div v-show="!show3" style="margin-top: 10px;">
					<div v-for="(item,index) in news" :key="index" class="c-news">
						<div class="shang_news">
							<div style="width: 85%;">
								<span class="shang_text" @click="gotoNewsDetail(item.news.id)">{{item.news.title}}</span>
							</div>
							<div>
								<span style="color: rgb(0,158,1);" @click="collectNews(item.news.id,loginUser.userId)">取消收藏</span>
							</div>
						</div>
						<div class="xia_news" style="margin-left: 10px;">
							<div class="left_img" v-if="item.icon!=null">
								<img :src="item.icon" class="kuai_img" />		
							</div>
							<div class="xia_content">
								<div style="height: 80px;">
									<span class="xia_text" @click="gotoNewsDetail(item.news.id)" v-html="handleContent(item.news.content)"></span>
								</div>
								<div>
									<span class="xia_text" @click="gotoNewsDetail(item.news.id)" style="float: right;margin-right: 1%;">{{handleTime(item.news.createTime)}}&nbsp;&nbsp;阅读量:{{item.news.readNumber}}</span>
								</div>
							</div>
						</div>
					</div>
					<div class="block">
						<el-pagination background layout="prev, pager, next,jumper" :total="totalRecord_n" :page-size="pageSize"
						 :current-page="currPage_n" @current-change="handleCurrentChange_news">
						</el-pagination>
					</div>
				</div>
				<div class="none" v-show="show3">
					<div class="none-text">
						<div class="img">
							<img src="../assets/铁锹.png" style="height: 70px;width: 70px;" />
						</div>
						<span>暂无内容</span>
					</div>
				</div>
			</div>
			<div class="c-qenv" v-show="msg === 3">
				<div v-show="!show4">
					<ul>
						<li v-for="(video,index) in videos" :key="index">
							<div style="border: 0px;">
								<a tag="a" target="_blank" :href="video.videos.videoUrl">
									<img :src="video.videos.img" style="height: 150px;width: 236px;border: 0px;" />
								</a>
							</div>
							<div class="v-title" style="color: #808080;background-color: rgb(250,250,250);width: 236px;">
								<div>
									<div class="v-title-left">
										<a tag="a" target="_blank" :href="video.videos.videoUrl">{{video.videos.videoTitle}}</a>
									</div>
									<div class="v-title-right">
										<a tag="a" target="_blank" :href="video.videos.videoUrl"><span class="span-r">{{video.videos.readNumber}}次播放</span></a>
									</div>
								</div>
								<div style="margin-left: 5px;padding-bottom: 10px;">
									<span class="collect_video" @click="collectVideo(loginUser.userId,video.videos.id)">★已收藏</span>
									<!-- <span class="collect_video1" v-if="video.status==0" @click="collect(video.id)">★已收藏</span> -->
								</div>
							</div>
						</li>
					</ul>
					<li class="block" style="margin-left: 25%;">
						<el-pagination background layout="prev, pager, next,jumper" :total="totalRecord_v" :page-size="pageSize"
						 :current-page="currPage_v" @current-change="handleCurrentChange_video">
						</el-pagination>
					</li>
				</div>
				<div class="none" v-show="show4">
					<div class="none-text">
						<div class="img">
							<img src="../assets/铁锹.png" style="height: 70px;width: 70px;" />
						</div>
						<span>暂无内容</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		Message
	} from 'element-ui';
	export default {
		name: 'myCollect',
		data() {
			return {
				msg: 0,
				show1: false,
				show2:false,
				show3:false,
				show4:false,
				loginUser: JSON.parse(localStorage.getItem('login_key')),
				c_question: [],
				c_exchange: [],
				videos: [],
				totalRecord_q: 0,
				totalRecord_e: 0,
				totalRecord_n: 0,
				totalRecord_v: 0,
				currPage_q: 1,
				currPage_e:1,
				currPage_n:1,
				currPage_v:1,
				pageSize: 4,
				news: [],
			};
		},
		mounted: function() {
			this.getC_question();
			this.getC_exchange();
			this.getCollectNews();
			this.getCollectVideo();
		},
		methods: {
			//收藏中的资讯列表
			getCollectNews: function() {
				var _this = this;
				_this.$http({
					method: 'GET',
					url: this.apiServer+'api/user/getCollectNewsById',
					params: {
						currPage: _this.currPage_n,
						pageSize: _this.pageSize,
						userId: _this.loginUser.userId
					},

				}).then(function(res) {
					if (res.data.code == 0) {
						_this.totalRecord_n = res.data.total;
						_this.news = res.data.data;
						console.log(_this.news);
// 						if (_this.totalRecord_n == 0) {
// 							_this.show3 = true;
// 						}
						if (_this.totalRecord_n == 0) {
							_this.show3 = true;
						}
						if(_this.news.length==0){
							_this.currPage_n=_this.currPage_n-1;
							_this.getCollectNews();
						}
					} else {
						alert('数据加载失败！');
					}
				})
			},
			getCollectVideo: function() {
				var _this = this;
				_this.$http({
					method: 'GET',
					url: this.apiServer+'api/user/getCollectVideoById',
					params: {
						currPage: _this.currPage_v,
						pageSize: _this.pageSize,
						userId: _this.loginUser.userId
					}
				}).then(function(res) {
					if (res.data.code == 0) {
						_this.videos = res.data.data;
						_this.totalRecord_v = res.data.total;
						if (_this.totalRecord_v == 0) {
							_this.show4 = true;
						}
						if(_this.videos.length==0){
							_this.currPage_v=_this.currPage_v-1;
							_this.getCollectVideo();
						}
						console.log('视频' + _this.videos)
					} else {
						alert('加载数据失败');
					}
				})
			},
			getC_question: function() {
				var _this = this;
				_this.$http({
					method: 'GET',
					url: this.apiServer+'api/user/getCollectQuestionById',
					params: {
						userId: _this.loginUser.userId,
						currPage: _this.currPage_q,
						pageSize: _this.pageSize,
					},
					header: {
						'content-type': 'application/json'
					}
				}).then(function(res) {
					if (res.data.code == 0) {
						_this.c_question = res.data.data;
						_this.totalRecord_q = res.data.total;
// 						if (_this.c_question.length == 0) {
// 							_this.show1 = true;
// 						}
                        if (_this.totalRecord_q == 0) {
							_this.show1 = true;
						}
						if(_this.c_question.length==0){
							_this.currPage_q=_this.currPage_q-1;
							_this.getC_question();
						}
					} else {
						Message({
							message: '数据加载失败!！',
							type: 'error',
						});
					}
				})
			},
			getC_exchange: function() {
				var _this = this;
				_this.$http({
					method: 'GET',
					url: this.apiServer+'api/user/getCollectExchangeById',
					params: {
						userId: _this.loginUser.userId,
						currPage: _this.currPage_e,
						pageSize: _this.pageSize,
					},
					header: {
						'content-type': 'application/json'
					}
				}).then(function(res) {
					if (res.data.code == 0) {
						_this.c_exchange = res.data.data;
						_this.totalRecord_e = res.data.total;
// 						if (_this.c_exchange.length == 0) {
// 							_this.show2 = true;
// 						}
                        if (_this.totalRecord_e == 0) {
							_this.show2 = true;
						}
						if(_this.c_exchange.length==0){
							_this.currPage_e=_this.currPage_e-1;
							_this.getC_exchange();
						}
					} else {
						Message({
							message: '数据加载失败!！',
							type: 'error',
						});
					}
				})
			},
			isLike: function(eId, userId) {
				var _this = this;
				_this.$http({
					method: 'GET',
					url: this.apiServer+'api/exchange/checkLike',
					params: {
						exchangeId: eId,
						userId: userId,
					},
					header: {
						'content-type': 'application/json'
					}
				}).then(function(res) {
					if (res.data.code == 0) {
						_this.getC_exchange();
						if(res.data.data.status==0){
							Message({
								message: '已点赞！',
								type: 'success'
							});
						};
						if(res.data.data.status==1){
							Message({
								message: '已取消点赞!！',
								type: 'success',
							});
						}
					} else {
						Message({
							message: '出错!！',
							type: 'error',
						});
					}
				})
			},
			collectVideo: function(userId,id) {
				var _this = this;
				_this.$http({
					method: 'GET',
					url: this.apiServer+'api/news/collectVideo',
					header: {
						'content-type': 'application/json;charset=UTF-8 '
					},
					params: {
						userId: userId,
						videoId: id
					}
				}).then(function(res) {
					if (res.data.code == 0) {
						_this.getCollectVideo();
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
			},
			collectQuestion: function(id,userId) {
				var _this = this;
				_this.$http({
					method: 'POST',
					url: this.apiServer+'api/question/collectQuestion',
					header: {
						'content-type': 'application/json;charset=UTF-8 '
					},
					params: {
						questionId: id,
						userId:userId,
					}
				}).then(function(res) {
					if (res.data.code == 0) {
						_this.getC_question()
						if (res.data.data.status == 0) {
							Message({
								message: '收藏成功！',
								type: 'success'
							});
						} else {
							Message({
								message: '已取消收藏！',
								type: 'success'
							});
						}
					} else {
						Message({
							message: '失败！',
							type: 'error'
						});
					}
				})
			},
			collectExchange: function(id,userId) {
				var _this = this;
				_this.$http({
					method: 'POST',
					url: this.apiServer+'api/exchange/collectExchange',
					header: {
						'content-type': 'application/json;charset=UTF-8 '
					},
					params: {
						exchangeId: id,
						userId: userId,
					}
				}).then(function(res) {
					if (res.data.code == 0) {
						_this.getC_exchange();
						if (res.data.data.status == 0) {
							Message({
								message: '收藏成功！',
								type: 'success'
							});
						} else {
							Message({
								message: '已取消收藏！',
								type: 'success'
							});
						}
					} else {
						Message({
							message: '失败！',
							type: 'error'
						});
					}
				})
			},
			collectNews: function(id,userId) {
				var _this = this;
				_this.$http({
					method: 'GET',
					url: this.apiServer+'api/news/collectNews',
					header: {
						'content-type': 'application/json;charset=UTF-8 '
					},
					params: {
						newsId: id,
						userId: userId,
					}
				}).then(function(res) {
					if (res.data.code == 0) {
						_this.getCollectNews();
						if (res.data.data.status == 0) {
							Message({
								message: '收藏成功！',
								type: 'success'
							});
						
						} else {
							Message({
								message: '已取消收藏！',
								type: 'success'
							});
						
						}
					} else {
						Message({
							message: '失败！',
							type: 'error'
						});
					}
				})
			},
			gotoNewsDetail: function(id) {
				this.$router.push({
					path: '/NewsDetail',
					query: {
						id: id
					}
				});
			},
			gotoAskDetail: function(id, userId) {
				this.$router.push({
					path: '/askDetail',
					query: {
						id: id,
						userId: userId
					}
				});
			},
			gotoExchangeDetail: function(id, userId) {
				this.$router.push({
					path: '/exchangeDetail',
					query: {
						id: id,
						userId: userId
					}
				});
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
				if(content.length>63){
					return content.substring(0,63)+'...[详情]';
				}else{
					return content.substring(0,63)
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
				_this.getCollectNews();
				_this.getCollectVideo();
			},
			handleCurrentChange_n(val) {
				console.log(`第${val}页 `);
				var _this = this;
				_this.currPage = val;
				_this.getCollectNews();
			},
			handleCurrentChange_question(val) {
				console.log(`第${val}页 `);
				var _this = this;
				_this.currPage_q = val;
				_this.getC_question();
			},
			handleCurrentChange_exchange(val) {
				console.log(`第${val}页 `);
				var _this = this;
				_this.currPage_e = val;
				_this.getC_exchange();
			},
			handleCurrentChange_news(val) {
				console.log(`第${val}页 `);
				var _this = this;
				_this.currPage_n= val;
				_this.getCollectNews();
			},
			handleCurrentChange_video(val) {
				console.log(`第${val}页 `);
				var _this = this;
				_this.currPage_v= val;
				_this.getCollectVideo();
			}
			
			
		}
	}
</script>

<style scoped>
	.top {
		display: flex;
		height: 50px;
		border-bottom: 1px solid rgb(114, 114, 114);
		line-height: 50px;
	}

	.list_text {
		text-decoration: none;
		color: rgb(109, 109, 109);
		padding: 1em 4em;
	}

	.top-text {
		width: 25%;
		text-align: center;
	}

	.nav-item {
		text-decoration: none;
		color: rgb(109, 109, 109);
		font-size: 16px;
	}

	.cur {
		text-decoration: none;
		color: rgb(0, 158, 1);
		font-size: 16px;
		border-bottom: 3px solid rgb(0, 158, 1);
	}

	.cur1 {
		color: rgb(0, 158, 1);
	}

	.content {
		width: 97%;
		margin: 0 auto;
		margin-bottom: 10px;
	}

	.leixing {
		border-radius: 5px;
		border: 1px solid rgb(109, 109, 109);
		height: 20px;
		text-align: center;
		line-height: 20px;
	}

	.leixing span {
		color: rgb(109, 109, 109);
		font-size: 12px;
		letter-spacing: 3px;
	}

	.a-content {
		padding-bottom: 10px;
		padding-top: 10px;
		width: 97%;
		margin: 0 auto;
	}

	.none-text {
		width: 50%;
		margin: 0 auto;
		margin-top: 150px;
		text-align: center;
	}

	.none span {
		font-size: 20px;
		color: rgb(109, 109, 109);
		letter-spacing: 5px;
	}

	.shang_news {
		margin-bottom: 8px;
		margin-left: 10px;
		display: flex;
	}

	.xia_news {
		display: flex;
	}

	.kuai_img {
		display: block;
		width: 150px;
		height: 100px;
		float: left;
		margin-right: 3%;
	}

	.left_img {
		flex: 1 1 30%;
	}
	.xia_content{
		flex:1 1 70%;
	}
	.shang_text {
		font-size: 18px;
		color: #333;
		text-decoration: none;
	}

	li {
		width: 50%;
		border-bottom: 2px solid #fafafa;
		margin-bottom: 10px;
		float: left;
		padding-bottom: 2%;
		padding-top: 2%;
	}

	.v-title-left {
		width: 50%;
		line-height: 40px;
		float: left;
		margin-left: 3%;
		margin-right: 16%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.v-img {
		width: 236px;
		height: 200px;
	}

	.v-title-right {
		width: 30%;
		float: left;
		line-height: 40px;
		color: #808080;
		text-align: center;
	}
	a{
		/* font-size: 18px; */
		color: #808080;
		text-decoration: none;
	}
	.collect_video{
		cursor: pointer;
		color: rgb(0,158,1);
	}
	.zhong-ad{
		line-height: 17px;
		height: 17px;
		display: flex;
		margin-top: 5px;
	}
	.block{
		text-align: center;
		margin-top: 20px;
		padding-bottom: 20px;
	}
	.c-news{
		margin-bottom: 13px;
		background-color: #FFFFFF;
		padding-bottom: 10px;
		padding-top: 10px;
		cursor: pointer;
	}
	.c-exchange{
		background-color: #FFFFFF;
		margin-top: 10px;
		cursor: pointer;
	}
</style>
