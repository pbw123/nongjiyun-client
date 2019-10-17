import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
	mode: "history",
	routes: [{
			path: '/',
			redirect: 'Index',
		},
		{
			//主页
			path: '/index',
			redirect: 'home',
			component: resolve => require(['../components/Index.vue'], resolve),
			meta: {
				title: '主页'
			},
			children: [{
					//首页
					path: '/home',
					component: resolve => require(['../components/Home.vue'], resolve),
					meta: {
						title: '首页'
					}
				},
				{
					//资讯
					path: '/news',
					component: resolve => require(['../components/News.vue'], resolve),
					meta: {
						title: '资讯'
					},
				},
				{
					path: '/newsDetail',
					component: resolve => require(['../components/NewsDetail.vue'], resolve),
					meta: {
						title: '资讯详情'
					}
				},
				{
					//视频
					path: '/videoList',
					component: resolve => require(['../components/VideoList.vue'], resolve),
					meta: {
						title: '视频'
					},

				},
				{
					//提问
					path: '/ask',
					component: resolve => require(['../components/Ask.vue'], resolve),
					meta: {
						title: '提问'
					},
				},
				{
					//交流
					path: '/exchange',
					component: resolve => require(['../components/Exchange.vue'], resolve),
					meta: {
						title: '交流'
					}
				},
				{
					path: '/exchangeDetail',
					component: resolve => require(['../components/ExchangeDetail.vue'], resolve),
					meta: {
						title: '交流详情'
					}
				},

				{
					//直播
					path: '/zhibo',
					component: resolve => require(['../components/Zhibo.vue'], resolve),
					meta: {
						title: '直播'
					}
				},
				{
					//专家列表
					path: '/expertList',
					component: resolve => require(['../components/ExpertList.vue'], resolve),
					meta: {
						title: '专家列表'
					}
				},
				{
					//专家信息
					path: '/expert',
					component: resolve => require(['../components/Expert.vue'], resolve),
					meta: {
						title: '专家信息'
					}
				},
				{
					//文章详情
					path: '/newsDetail',
					component: resolve => require(['../components/NewsDetail.vue'], resolve),
					meta: {
						title: '文章详情'
					}
				},
				{
					//提问详情
					path: '/askDetail',
					component: resolve => require(['../components/AskDetail.vue'], resolve),
					meta: {
						title: '提问详情'
					}
				},
				{
					//提问
					path: '/putQuestion',
					component: resolve => require(['../components/PutQuestion.vue'], resolve),
					meta: {
						title: '提问'
					}
				},
				{
					//发布交流
					path: '/putExchange',
					component: resolve => require(['../components/PutExchange.vue'], resolve),
					meta: {
						title: '发布交流'
					}
				},
				{
					//咨询专家
					path: '/askExpert',
					component: resolve => require(['../components/AskExpert.vue'], resolve),
					meta: {
						title: '咨询专家'
					}
				},
				{
					//专家问题列表
					path: '/expert_Questions',
					component: resolve => require(['../components/Expert_questions.vue'], resolve),
					meta: {
						title: '专家提问列表'
					}
				},
				{
					//咨询专家问题详情
					path: '/expert_QuestionDetail',
					component: resolve => require(['../components/Expert_questionDetail.vue'], resolve),
					meta: {
						title: '咨询专家问题详情'
					}
				},
			]
		},
		{
			//用户登录注册
			path: '/sign',
			redirect: 'Signin',
			component: resolve => require(['../components/Sign.vue'], resolve),
			meta: {
				title: '登录注册页面'
			},
			children: [{
					//用户登录
					path: '/signIn',
					component: resolve => require(['../components/Signin.vue'], resolve),
					meta: {
						title: '登录页面'
					}
				},
				{
					//用户注册
					path: '/Signup',
					component: resolve => require(['../components/Signup.vue'], resolve),
					meta: {
						title: '注册页面'
					}
				}
			]
		},
		{
			//用户中心
			path: '/userCenter',
			redirect: 'myInfo',
			component: resolve => require(['../components/UserCenter.vue'], resolve),
			meta: {
				title: '用户中心'
			},
			children:[
				{
					//我的资料
					path: '/myInfo',
					component: resolve => require(['../components/MyInfo.vue'], resolve),
					meta: {
						title: '我的资料'
					}
				},
				{
					//我的提问
					path: '/myQuestion',
					component: resolve => require(['../components/MyQuestion.vue'], resolve),
					meta: {
						title: '我的提问'
					}
				},
				{
					//我的回答
					path: '/myAnswer',
					component: resolve => require(['../components/MyAnswer.vue'], resolve),
					meta: {
						title: '我的回答'
					}
				},
				{
					//我的交流
					path: '/myExchange',
					component: resolve => require(['../components/MyExchange.vue'], resolve),
					meta: {
						title: '我的交流'
					}
				},
				{
					//我的收藏
					path: '/myCollect',
					component: resolve => require(['../components/MyCollect.vue'], resolve),
					meta: {
						title: '我的收藏'
					},
				},
				{
					//我的关注
					path: '/myFollow',
					component: resolve => require(['../components/MyFollow.vue'], resolve),
					meta: {
						title: '我的关注'
					}
				},
				{
					//我的供求
					path: '/myGQ',
					component: resolve => require(['../components/MyGQ.vue'], resolve),
					meta: {
						title: '我的供求'
					}
				},
			]
		},
		// 		{
		// 			//用户登录
		// 			path: '/Signin',
		// 			component: resolve => require(['../components/Signin.vue'], resolve),
		// 			meta: {
		// 				title: '登录页面'
		// 			}
		// 		},
		// 		{
		// 			//用户注册
		// 			path: '/Signup',
		// 			component: resolve => require(['../components/Signup.vue'], resolve),
		// 			meta: {
		// 				title: '注册页面'
		// 			}
		// 		}


	]
})
