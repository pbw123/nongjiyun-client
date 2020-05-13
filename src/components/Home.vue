<template>
	<div>
		<div id="slider">
			<div class="window" @mouseover="stop" @mouseleave="play">
				<ul class="container" :style="containerStyle">
					<li>
						<img :style="{width:imgWidth+'px'}" :src="sliders[sliders.length - 1].img" alt="">
					</li>
					<li v-for="(item, index) in sliders" :key="index">
						<img :style="{width:imgWidth+'px'}" :src="item.img" alt="">
					</li>
					<li>
						<img :style="{width:imgWidth+'px'}" :src="sliders[0].img" alt="">
					</li>
				</ul>
				<ul class="dots">
					<li v-for="(dot, i) in sliders" :key="i" :class="{dotted: i === (currentIndex-1)}" @click="jump(i+1)">
					</li><img  />
				</ul>
			</div>
		</div>
		<div class="news" style="margin-top: 70px;width: 100%;height: 425px;background-color: #FFFFFF;">
			<div class="news-title" style="background-color: #e85a00;">
				<h3>头条</h3>
			</div>
			<div style="width: 100%;height: 2%;"></div>
			<div class="news-content">
				<ul class="top-news" v-for="(topnew,index) in topnews.topNews" :key="index" v-if="index<4">
					<li class="li1" style="margin-top: 2%;" @click="gotoNewsDetail(topnew.id,loginUser.userId)">
						<a>
							<h4>{{topnew.title}}</h4>
						</a>
						<div class="n-time">
							<a style="line-height: 14px;margin-left: 20px;">
								<img src="/static/calendar.png" style="width: 14px; height: 14px;heiborder: none;vertical-align: middle;" />
								<span style="color: #808080;font-size: 12px;">{{handleTime(topnew.createTime)}}</span>
								<img src="/static/icon_look.png" style="width: 16px;height: 9.8px;" />
								<span style="color: #808080;font-size: 12px;">{{topnew.readNumber}}</span>
							</a>
						</div>
						<a>
							<img class="news-img" :src="topnew.icon" />
						</a>
						<div class="n-content">
							<router-link to='/News'>
							    <p v-html="handleContent(topnew.content)"></p>
							</router-link>
						</div>
					</li>
				</ul>
			</div>
			<div class="news-more">
				<div style="width: 100%;height: 10px;"></div>

        <router-link to="/news">
          查看更多
        </router-link>
			</div>
		</div>
		<div class="ask" style="margin-top: 70px;width: 100%;background-color: #FFFFFF;">
			<div class="news-title" style="background-color: #10d063;">
				<h3>提 问</h3>
			</div>
			<div style="width: 100%;height: 15px;"></div>
			<div class="ask-content">
				<ul class="top-ask">
					<li class="ask-li" v-for="(ask, index) in asks" :key="index" v-if="index<6">
						<div style="float: left;padding-right: 20px;margin-top: 5px;">
							<img style="border-radius: 50%;width: 30px;height: 30px;" :src="ask.user.headUrl">
						</div>
						<div class="a-name">
							<span style="color: #808080;">{{ask.user.userName}} </span>
							<span class="a-identity" style="color: #808080;">{{ask.user.identity}}</span>
						</div>
						<div class="a-address" style="color: #808080;">{{ask.user.userAddress}}</div>
						<a>
							<div class="a-question" style="cursor: pointer;margin-top: 10px;height: 36px; margin-left: 20px;"
							@click="gotoDetail(ask.id,loginUser.userId)">
								{{handleContent(ask.content)}}
							</div>
						</a>
						<div style=" display: flex;line-height: 17px;color: #808080;">
							<div class="a-location" style="padding-top: 10px;">
								<img src="/static/icon_address.png" style="width: 12px;height: 17px;">
							</div>
							<div style="padding-top: 10px;">&nbsp;&nbsp;{{ask.user.userAddress}}</div>
						</div>
						<div class="a-answer" style="color: #808080;float: right;line-height: 17px;">
							{{handleTime(ask.createTime)}} &nbsp;&nbsp;&nbsp;已回答:{{ask.replyAmount}}
						</div>
						<div style="width: 100%;height: 20px;"></div>
					</li>
				</ul>
			</div>
			<div class="ask-more" style="margin-top: 10px;text-align: center;">
        <router-link to="/ask">
          查看更多
        </router-link>

      </div>
			<div style="width: 100%;height: 10px;"></div>
		</div>
		<div class="video" style="margin-top: 70px;width: 100%;height: 410px;background-color: #FFFFFF;margin-bottom: 20px;">
			<div class="news-title" style="background-color: #2790da;">
				<h3>视 频</h3>
			</div>
			<div class="video-content">
				<ul>
					<li v-for="(video,index) in videos" :key="index" v-if="index<2">
						<div class="v-img">
							<a tag="a" target="_blank" :href="video.videoUrl">
							<img :src="video.img" />
							</a>
						</div>
						<div class="v-title" style="height: 70px; color: #808080;background-color: rgb(250,250,250);width: 393px;">
							<div class="v-title-left">
								<a>{{video.videoTitle}}</a>
							</div>
							<div class="v-title-right">
								<a><span class="span-r">{{video.readNumber}}次播放</span></a>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<div style="width: 100%;height: 10px;"></div>
			<div class="video-more" >
				<div style="width: 100%;height: 10px;"></div>
        <router-link to="/videoList">
          查看更多
        </router-link>

      </div>
		</div>
	</div>
</template>
<script>
	import { Loading } from 'element-ui';
	export default {
		name: 'Home',
		props: {
			initialSpeed: {
				type: Number,
				default: 30
			},
			initialInterval: {
				type: Number,
				default: 3
			}
		},
		data() {
			return {
				topnews:[],
				asks:[],
				videos:[],
				loginUser:JSON.parse(localStorage.getItem('login_key')),
				sliders: [{
						// url:''
						img: 'https://object.jsnjy.net.cn/OSS/20190505/7c10d23ab3c2416d8f55ed2468062d4f.jpg'
					},
					{
						img: 'https://object.jsnjy.net.cn/OSS/20190503/f51318fdc3e44974bfb1358c86360683.JPG'
					},
					{
						img: 'https://object.jsnjy.net.cn/OSS/20190423/565eaead098c454cbaf670fc30d82f9d.jpg'
					},
					{
						img: 'https://object.jsnjy.net.cn/OSS/20190430/fa89336790664ccab47dfe45038c634b.jpg'
					},
					{
						img: 'https://object.jsnjy.net.cn/OSS/20181014/1394c125cf5c4b0c8e535e21355c8c6c.jpg'
					},
					{
						img: 'https://object.jsnjy.net.cn/OSS/20190111/26b6545c4d7445c098ad4b356384b1b7.jpg'
					},
					{
						img: 'https://object.jsnjy.net.cn/OSS/20180621/eb0c40f36aec465a8c20388ca8bdb515.jpg'
					},
					{
						img: 'https://object.jsnjy.net.cn/OSS/20190320/dcbfe44a78ca43e1a74421472578b459.jpg'
					},
				],
				imgWidth: 1025,
				currentIndex: 1,
				distance: -1025,
				transitionEnd: true,
				speed: this.initialSpeed,
				loading:true,
			};
		},
		computed: {
			containerStyle() {
				return {
					transform: `translate3d(${this.distance}px, 0, 0)`
				}
			},
			interval() {
				return this.initialInterval * 1000
			}
		},
		mounted() {
			this.init();
			this.getTopNews();
			this.getAsks();
			this.getVideo();
		},
		// onshow:function(){},
		// beforeUpdate:function(){},
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
		methods: {

			gotoNewsDetail: function(id,userId) {
				this.$router.push({path:'/NewsDetail',query:{id:id,userId:userId}});
			},
			gotoDetail: function(id,userId) {
				this.$router.push({path:'/askDetail',query:{id:id,userId:userId}});
		    },
			getVideo:function(){
				var _this = this;
				_this.$http({
					method:'GET',
					url:this.apiServer+'api/news/selectVideo',
					header:{
						'content-type':'application/x-www-form-urlencoded'
					}

				}).then(function(res){
						if(res.data.code==0){
						_this.videos = res.data.data;
						console.log(_this.videos)
					}else{
						alert('加载数据失败');
					}
				})
			},
			getTopNews:function(){
				var _this=this;
				_this.$http({
					method:'GET',
					url:this.apiServer+'api/index/getIndexMessage?id=18',
					header:{
					'content-type': 'application/x-www-form-urlencoded'
					}
				}).then(function(res){
					if(res.data.code==0){
						_this.topnews = res.data.data;
					}else{
						alert('加载数据失败');
					}
				})
			},
			getImgs:function(){
				var _this=this;
				_this.$http({
					method:'GET',
					url:'http://47.101.51.245:8888/api/index/getIndexMessage?id=18',
					header:{
					'content-type': 'application/x-www-form-urlencoded'
					}
				}).then(function(res){
					if(res.data.code==0){
						_this.topnews = res.data.data;
					}else{
						alert('加载数据失败');
					}
				})
			},
			getAsks:function(){
				var _this=this;
				_this.$http({
					method: 'POST',
					url: this.apiServer+'api/question/getQuestionList',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					}
				}).then(function(res) {
					if(res.data.code==0){
						_this.asks = res.data.data;
					}else{
						alert('加载数据失败');
					}

				})
			},
			init() {
				this.play()
				window.onblur = function() {
					this.stop()
				}.bind(this)
				window.onfocus = function() {
					this.play()
				}.bind(this)
			},
			move(offset, direction, speed) {
				console.log(speed)
				if (!this.transitionEnd) return
				this.transitionEnd = false
				direction === -1 ? this.currentIndex += offset / 1025 : this.currentIndex -= offset / 1025
				if (this.currentIndex > 8) this.currentIndex = 1
				if (this.currentIndex < 1) this.currentIndex = 8

				const destination = this.distance + offset * direction
				this.animate(destination, direction, speed)
			},
			animate(des, direc, speed) {
				if (this.temp) {
					window.clearInterval(this.temp);
					this.temp = null;
				}
				this.temp = window.setInterval(() => {
					if ((direc === -1 && des < this.distance) || (direc === 1 && des > this.distance)) {
						this.distance += speed * direc
					} else {
						this.transitionEnd = true
						window.clearInterval(this.temp)
						this.distance = des
						if (des < -8200) this.distance = -1025
						if (des > -1025) this.distance = -8200
					}
				}, 20)
			},
			jump(index) {
				const direction = index - this.currentIndex >= 0 ? -1 : 1;
				const offset = Math.abs(index - this.currentIndex) * 1025;
				const jumpSpeed = Math.abs(index - this.currentIndex) === 0 ? this.speed : Math.abs(index - this.currentIndex) *
					this.speed;
				this.move(offset, direction, jumpSpeed)
			},
			play() {
				if (this.timer) {
					window.clearInterval(this.timer)
					this.timer = null
				}
				this.timer = window.setInterval(() => {
					this.move(1025, -1, this.speed)
				}, this.interval)
			},
			stop() {
				window.clearInterval(this.timer)
				this.timer = null
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
		}
	}
</script>
<style scoped>
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	ul {
		list-style: none;
	}

	#slider {
		text-align: center;
		margin-top: 10px;
	}

	.window {
		position: relative;
		width: 1025px;
		height: 327px;
		margin: 0 auto;
		overflow: hidden;
		cursor: pointer;
	}

	.container {
		display: flex;
		position: absolute;
	}

	.slider img {
		user-select: none;
		width: 100%;
		height: 100%;
	}

	.dots {
		position: absolute;
		bottom: 10px;
		left: 50%;
		transform: translateX(-50%);
	}

	.dots li {
		display: inline-block;
		width: 10px;
		height: 10px;
		margin: 0 3px;
		border: 1px solid white;
		border-radius: 50%;
		background-color: rgba(0, 0, 0, 0.2);
		cursor: pointer;
	}

	.dots .dotted {
		background-color: rgb(255, 255, 255);
	}

	.top-news li {
		float: left;
	}

	.news {
		width: 1025px;
		margin: 0 auto;
		margin-top: 70px;
		height: 420px;
		background-color: #FFFFFF;
	}

	.li1 {
		height: 159px;
		/* width: 480px; */
		background-color: rgb(250, 250, 250);
		width: 47%;
		border-bottom: 2px solid #fafafa;
		/* margin-bottom: 20px; */
		/* float: left; */
		margin-left: 2%;
		margin-top: 2%;
		cursor: pointer;
	}

	.li1 a:hover {
		color: rgb(35, 82, 124);
	}

	.news-title {
		border: 5px solid #ffffff;
		text-align: center;
		float: left;
		border-radius: 40px;
		width: 80px;
		height: 80px;
		margin-top: -48px;
		position: absolute;
		/* margin-bottom: 4%; */
	}

	.news-more {
		width: 100%;
		/* padding-top: 10px; */
		padding-bottom: 10px;
		text-align: center;
		border-top: 2px solid #fafafa;
		margin-top: 36%;
	}

	.news-more a {
		color: #808080;
		text-decoration: none;
		font-size: 14px;
	}

	.news-img {
		/* margin-left: 10%; */
		margin-left: 4%;
		width: 30%;
		margin-right: 4%;
		margin-top: 2%;
		width: 120px;
		height: 80px;
		vertical-align: middle;
		float: left;
	}

	.n-content {
		width: auto;
		padding-right: 4%;
		margin-top: 3%;
		height: 122px;
		line-height: 22px;
	}

	a:link {
		text-decoration: none;
	}

	h3 {
		text-align: center;
		line-height: 72px;
		font-size: 14px;
		font-weight: normal;
		color: #ffffff;
	}

	h4 {
		padding: 2% 4% 0 4%;
		height: 37px;
		font-size: 17px;
		line-height: 23px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	p {
		color: #808080;
		font-size: 14px;
	}

	.ask-content {
		margin-left: 20px;
		margin-right: 20px;
	}

	.ask-li {
		margin-top: 15px;
		border-bottom: 2px solid rgb(250, 250, 250);
	}

	.a-question:hover {
		color: rgb(35, 82, 124)
	}

	.ask-more a {
		color: #808080;
		text-decoration: none;
		font-size: 14px;
	}

	.video img {
		width: 393px;
		height: 250px;
		border: none;
		vertical-align: middle;
	}

	.video li:first-child {
		width: 48%;
		float: left;
		margin-right: 4%;
		list-style: none;
	}

	.video li {
		width: 45%;
		float: left;
		list-style: none;
		cursor: pointer;
	}

	.video ul {
		padding: 4% 10% 1% 10%;
	}

	/* .video-content{
		margin: 0;
        padding: 0;
	} */

	.v-title-left {
		width: 66%;
		line-height: 70px;
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
		line-height: 70px;
		color: #808080;
		text-align: center;
	}

	.video-more {
		width: 100%;
		/* padding-top: 10px; */
		padding-bottom: 10px;
		text-align: center;
		border-top: 2px solid #fafafa;
		margin-top: 30%;
	}

	.video-more a {
		color: #808080;
		text-decoration: none;
		font-size: 14px;
	}
</style>
