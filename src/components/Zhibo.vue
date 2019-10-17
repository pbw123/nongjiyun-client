<template>
		<div class="container">
		<div class="content1">
		<div class="right">
			<router-link to="" class="right_text">远程连线客户端</router-link>
		</div>
		<div class="player"> <video-player  class=" video-player vjs-custom-skin"
                     ref="videoPlayer"
                     :playsinline="true"
                     :options="playerOptions"
                     @play="onPlayerPlay($event)"
                     @pause="onPlayerPause($event)"> 
					 </video-player> 
	  </div>	
		</div>
		</div>
</template>

<script>
	import { videoPlayer } from 'vue-video-player';
export default {
  data () {
    return {
      playerOptions: {
//        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "video/mp4",
          src: "http://object.jsnjy.net.cn/OSS/178.mp4" //你的m3u8地址（必填）
        }],
        poster: "http://object.jsnjy.net.cn/OSS/20190509/4140d5c2c0ea4d2793bf2ddb2fc3a29e.JPG", //你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
//        controlBar: {
//          timeDivider: true,
//          durationDisplay: true,
//          remainingTimeDisplay: false,
//          fullscreenToggle: true  //全屏按钮
//        }
      }
    }
  },
  components: {
    videoPlayer
  },
  methods: {
    onPlayerPlay(player) {
      
    },
    onPlayerPause(player){
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  }
}
</script>

<style scoped>
.container{
		width: 100%;
    background-color: white;
    margin-top: 1%;
    margin-bottom: 20px;
}
.content1{
width: 80%;
margin-left: 10%;
padding-top: 20px;
padding-bottom: 20px;
}
.right{
	  text-align: center;
    height: 68px;
    width: 21%;
    float: right;
    line-height: 70px;
    background:url(../assets/icon_category_08.png);
}
.right_text{
	font-size: 20px;
	text-decoration: none;
}
.player{
	margin-top: 100px;
}
</style>

