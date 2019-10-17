<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
	data:function(){
		return{
			// storageData:{},
		}
	},
	onShow: function () {
		// console.log('App Show')
	},
	beforeUpdate:function(){},
	onLoad:function(){},
}
</script>

<style>
#app {
  width: 100%;
  background-color: rgb(250,250,250);
}
body{
	color: rgb(51, 51, 51);
	font-family: Arial, 微软雅黑, "Microsoft yahei", "Hiragino Sans GB", "冬青黑体简体中文 w3", "Microsoft Yahei", "Hiragino Sans GB", "冬青黑体简体中文 w3", STXihei, 华文细黑, SimSun, 宋体, Heiti, 黑体, sans-serif;
	margin: 0;
	padding: 0;
	font-size: 14px;
}
li{
	list-style: none;
}
</style>
