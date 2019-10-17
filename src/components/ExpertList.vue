<template>
	<div class="container">
		<div class="left">
			<h3 class="left_text">专家分类</h3>
			<div><a href="javascript:;" @click="msg = 0" :class="{ cur: msg === 0 }" class="nav-item">全部</a></div>
			<div><a href="javascript:;" @click="msg = 1,keyword=1,getExpertsBySort()" :class="{ cur: msg === 1 }" class="nav-item">水稻</a></div>
			<div><a href="javascript:;" @click="msg = 2,keyword=2,getExpertsBySort()" :class="{ cur: msg === 2 }" class="nav-item">小麦</a></div>
			<div><a href="javascript:;" @click="msg = 3,keyword=3,getExpertsBySort()" :class="{ cur: msg === 3 }" class="nav-item">特粮特经</a></div>
			<div><a href="javascript:;" @click="msg = 4,keyword=4,getExpertsBySort()" :class="{ cur: msg === 4 }" class="nav-item">蔬菜</a></div>
			<div><a href="javascript:;" @click="msg = 5,keyword=5,getExpertsBySort()" :class="{ cur: msg === 5 }" class="nav-item">果树</a></div>
			<div><a href="javascript:;" @click="msg = 6,keyword=6,getExpertsBySort()" :class="{ cur: msg === 6 }" class="nav-item">植保</a></div>
			<div><a href="javascript:;" @click="msg = 7,keyword=7,getExpertsBySort()" :class="{ cur: msg ===7 }" class="nav-item">生猪</a></div>
			<div><a href="javascript:;" @click="msg = 8,keyword=8,getExpertsBySort()" :class="{ cur: msg ===8 }" class="nav-item">家禽</a></div>
			<div><a href="javascript:;" @click="msg = 9,keyword=9,getExpertsBySort()" :class="{ cur: msg ===9 }" class="nav-item">家畜</a></div>
			<div><a href="javascript:;" @click="msg = 10,keyword=10,getExpertsBySort()" :class="{ cur: msg ===10 }" class="nav-item">花木</a></div>
			<div><a href="javascript:;" @click="msg = 11,keyword=11,getExpertsBySort()" :class="{ cur: msg ===11 }" class="nav-item">蚕桑</a></div>
			<div><a href="javascript:;" @click="msg = 12,keyword=12,getExpertsBySort()" :class="{ cur: msg ===12 }" class="nav-item">茶叶</a></div>
			<div><a href="javascript:;" @click="msg = 13,keyword=13,getExpertsBySort()" :class="{ cur: msg ===13 }" class="nav-item">水产</a></div>
			<div><a href="javascript:;" @click="msg = 14,keyword=14,getExpertsBySort()" :class="{ cur: msg ===14 }" class="nav-item">土肥</a></div>
			<div><a href="javascript:;" @click="msg = 15,keyword=15,getExpertsBySort()" :class="{ cur: msg ===15 }" class="nav-item">环境能源</a></div>
			<div><a href="javascript:;" @click="msg = 16,keyword=16,getExpertsBySort()" :class="{ cur: msg ===16 }" class="nav-item">农机</a></div>
			<div><a href="javascript:;" @click="msg = 17,keyword=17,getExpertsBySort()" :class="{ cur: msg ===17 }" class="nav-item">农产品加工</a></div>
			<div><a href="javascript:;" @click="msg = 18,keyword=18,getExpertsBySort()" :class="{ cur: msg ===18 }" class="nav-item">农业气象</a></div>
			<div><a href="javascript:;" @click="msg = 19,keyword=19,getExpertsBySort()" :class="{ cur: msg ===19 }" class="nav-item">农经</a></div>
			<div><a href="javascript:;" @click="msg = 20,keyword=20,getExpertsBySort()" :class="{ cur: msg ===20 }" class="nav-item">农业信息化</a></div>
			<div><a href="javascript:;" @click="msg = 21,keyword=21,getExpertsBySort()" :class="{ cur: msg ===21 }" class="nav-item">农产品质量</a></div>
		</div>
		<div class="right">
			<div v-show="msg === 0">
				<div class="list">
					<div class="list-content" v-for="(item, index) in expertList" :key="index">
						<div class="content" @click="gotoExpertDetail(item.id)">
							<div style="width: 30%;"><img :src="item.headImg" /></div>
							<div style="line-height: 25px;">
								<div>
									<span style="color: black;">{{item.expertName}}</span>
								</div>
								<div>
									<span>单位：{{handleContent(item.unitName)}}</span>
								</div>
								<div>
									<span>问题：{{item.number}}</span>

								</div>
								
							</div>
						</div>
					</div>
				</div>
				<div class="block" v-if="totalRecord > pageSize">
					<el-pagination
						background
						layout="prev, pager, next,jumper"
						:total="totalRecord"
						:page-size="pageSize"
						:current-page="currPage"
						@current-change="handleCurrentChange"
					></el-pagination>
				</div>
			</div>
			<div v-show="msg ===1">
				<div class="list">
					<div class="list-content" v-for="(item,index) in expertList2" :key="index">
						<div class="content" @click="gotoExpertDetail(item.id)">
							<div style="width: 30%;">
								<img :src="item.headImg"/>
							</div>
							<div style="line-height: 25px;">
								<div>
									<span style="color: black;">{{item.expertName}}</span>
								</div>
								<div>
									<span>单位：{{handleContent(item.unitName)}}</span>
								</div>
								<div>
									<span>问题：{{item.number}}</span>
								</div>
							</div>
						</div>
					</div>	
				</div>
				<div class="block" v-if="totalRecord2>pageSize">
					<el-pagination 
					background layout="prev, pager, next,jumper" :total="totalRecord2"
					:page-size="pageSize" :current-page="currPage2"
					@current-change="handleCurrentChange2"
					>
					</el-pagination>
				</div>
			</div>
			<div v-show="msg ===2">
				<div class="list">
					<div class="list-content" v-for="(item,index) in expertList2" :key="index">
						<div class="content" @click="gotoExpertDetail(item.id)">
							<div style="width: 30%;">
								<img :src="item.headImg"/>
							</div>
							<div style="line-height: 25px;">
								<div>
									<span style="color: black;">{{item.expertName}}</span>
								</div>
								<div>
									<span>单位：{{handleContent(item.unitName)}}</span>
								</div>
								<div>
									<span>问题：{{item.number}}</span>
								</div>
							</div>
						</div>
					</div>	
				</div>
				<div class="block" v-if="totalRecord2>pageSize">
					<el-pagination 
					background layout="prev, pager, next,jumper" :total="totalRecord2"
					:page-size="pageSize" :current-page="currPage2"
					@current-change="handleCurrentChange2"
					>
					</el-pagination>
				</div>
			</div>
			<div v-show="msg ===3">
				<div class="list">
					<div class="list-content" v-for="(item,index) in expertList2" :key="index">
						<div class="content" @click="gotoExpertDetail(item.id)">
							<div style="width: 30%;">
								<img :src="item.headImg"/>
							</div>
							<div style="line-height: 25px;">
								<div>
									<span style="color: black;">{{item.expertName}}</span>
								</div>
								<div>
									<span>单位：{{handleContent(item.unitName)}}</span>
								</div>
								<div>
									<span>问题：{{item.number}}</span>
								</div>
							</div>
						</div>
					</div>	
				</div>
				<div class="block" v-if="totalRecord2>pageSize">
					<el-pagination 
					background layout="prev, pager, next,jumper" :total="totalRecord2"
					:page-size="pageSize" :current-page="currPage2"
					@current-change="handleCurrentChange2"
					>
					</el-pagination>
				</div>
			</div>
			<div v-show="msg ===4">
				<div class="list">
					<div class="list-content" v-for="(item,index) in expertList2" :key="index">
						<div class="content" @click="gotoExpertDetail(item.id)">
							<div style="width: 30%;">
								<img :src="item.headImg"/>
							</div>
							<div style="line-height: 25px;">
								<div>
									<span style="color: black;">{{item.expertName}}</span>
								</div>
								<div>
									<span>单位：{{handleContent(item.unitName)}}</span>
								</div>
								<div>
									<span>问题：{{item.number}}</span>
								</div>
							</div>
						</div>
					</div>	
				</div>
				<div class="block" v-if="totalRecord2>pageSize">
					<el-pagination 
					background layout="prev, pager, next,jumper" :total="totalRecord2"
					:page-size="pageSize" :current-page="currPage2"
					@current-change="handleCurrentChange2"
					>
					</el-pagination>
				</div>
			</div>
			<div v-show="msg ===5">
				<div class="list">
					<div class="list-content" v-for="(item,index) in expertList2" :key="index">
						<div class="content" @click="gotoExpertDetail(item.id)">
							<div style="width: 30%;">
								<img :src="item.headImg"/>
							</div>
							<div style="line-height: 25px;">
								<div>
									<span style="color: black;">{{item.expertName}}</span>
								</div>
								<div>
									<span>单位：{{handleContent(item.unitName)}}</span>
								</div>
								<div>
									<span>问题：{{item.number}}</span>
								</div>
							</div>
						</div>
					</div>	
				</div>
				<div class="block" v-if="totalRecord2>pageSize">
					<el-pagination 
					background layout="prev, pager, next,jumper" :total="totalRecord2"
					:page-size="pageSize" :current-page="currPage2"
					@current-change="handleCurrentChange2"
					>
					</el-pagination>
				</div>
			</div>	
			<div v-show="msg ===6">
				<div class="list">
					<div class="list-content" v-for="(item,index) in expertList2" :key="index">
						<div class="content" @click="gotoExpertDetail(item.id)">
							<div style="width: 30%;">
								<img :src="item.headImg"/>
							</div>
							<div style="line-height: 25px;">
								<div>
									<span style="color: black;">{{item.expertName}}</span>
								</div>
								<div>
									<span>单位：{{handleContent(item.unitName)}}</span>
								</div>
								<div>
									<span>问题：{{item.number}}</span>
								</div>
							</div>
						</div>
					</div>	
				</div>
				<div class="block" v-if="totalRecord2>pageSize">
					<el-pagination 
					background layout="prev, pager, next,jumper" :total="totalRecord2"
					:page-size="pageSize" :current-page="currPage2"
					@current-change="handleCurrentChange2"
					>
					</el-pagination>
				</div>
			</div>
			<div v-show="msg ===7">
				<div class="list">
					<div class="list-content" v-for="(item,index) in expertList2" :key="index">
						<div class="content" @click="gotoExpertDetail(item.id)">
							<div style="width: 30%;">
								<img :src="item.headImg"/>
							</div>
							<div style="line-height: 25px;">
								<div>
									<span style="color: black;">{{item.expertName}}</span>
								</div>
								<div>
									<span>单位：{{handleContent(item.unitName)}}</span>
								</div>
								<div>
									<span>问题：{{item.number}}</span>
								</div>
							</div>
						</div>
					</div>	
				</div>
				<div class="block" v-if="totalRecord2>pageSize">
					<el-pagination 
					background layout="prev, pager, next,jumper" :total="totalRecord2"
					:page-size="pageSize" :current-page="currPage2"
					@current-change="handleCurrentChange2"
					>
					</el-pagination>
				</div>
			</div>
			<div v-show="msg ===8">
				<div class="list">
					<div class="list-content" v-for="(item,index) in expertList2" :key="index">
						<div class="content" @click="gotoExpertDetail(item.id)">
							<div style="width: 30%;">
								<img :src="item.headImg"/>
							</div>
							<div style="line-height: 25px;">
								<div>
									<span style="color: black;">{{item.expertName}}</span>
								</div>
								<div>
									<span>单位：{{handleContent(item.unitName)}}</span>
								</div>
								<div>
									<span>问题：{{item.number}}</span>
								</div>
							</div>
						</div>
					</div>	
				</div>
				<div class="block" v-if="totalRecord2>pageSize">
					<el-pagination 
					background layout="prev, pager, next,jumper" :total="totalRecord2"
					:page-size="pageSize" :current-page="currPage2"
					@current-change="handleCurrentChange2"
					>
					</el-pagination>
				</div>
			</div>
			<div v-show="msg ===9">
				<div class="list">
					<div class="list-content" v-for="(item,index) in expertList2" :key="index">
						<div class="content" @click="gotoExpertDetail(item.id)">
							<div style="width: 30%;">
								<img :src="item.headImg"/>
							</div>
							<div style="line-height: 25px;">
								<div>
									<span style="color: black;">{{item.expertName}}</span>
								</div>
								<div>
									<span>单位：{{handleContent(item.unitName)}}</span>
								</div>
								<div>
									<span>问题：{{item.number}}</span>
								</div>
							</div>
						</div>
					</div>	
				</div>
				<div class="block" v-if="totalRecord2>pageSize">
					<el-pagination 
					background layout="prev, pager, next,jumper" :total="totalRecord2"
					:page-size="pageSize" :current-page="currPage2"
					@current-change="handleCurrentChange2"
					>
					</el-pagination>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'ExpertList',
		data() {
			return {
				msg:0,
				keyword:1,
				expertList:[],
				expertList2:[],
				totalRecord: 0,
				currPage: 1,
				pageSize: 20,
				totalRecord2: 0,
				currPage2: 1,
			};
		},
		mounted:function(){
			this.getExperts();
			this.getExpertsBySort();
		},
		methods:{
			getExperts:function(){
			    var _this = this;
			    _this.$http({
				    method:'GET',
				    url:this.apiServer+'expert/getAllExpert',
				    header:{
				        'content-type': 'application/json;charset=UTF-8'
				    },
					params:{
						currPage: _this.currPage,
						pageSize: _this.pageSize
					}
				})
				.then(function(res) {
					if (res.data.code == 0) {
						_this.expertList = res.data.data;
						_this.totalRecord = res.data.total;
					} else {
						alert('加载数据失败');
					}
				});
		},
			getExpertsBySort:function(){
			    var _this = this;
			    _this.$http({
				    method:'GET',
				    url:'http://47.101.51.245:8888/api/expert/getExpertBySort',
				    header:{
				        'content-type': 'application/json;charset=UTF-8'
				    },
					params:{
						currPage: _this.currPage2,
						pageSize: _this.pageSize,
						expertSort:_this.keyword,
					}
			    }).then(function(res){
				    if(res.data.code==0){
					    _this.expertList2 = res.data.data;
						_this.totalRecord2=res.data.total;
				    }else{
					    alert('加载数据失败');
				    }
			    })
			},
			gotoExpertDetail: function(id) {
				var _this=this;
			    _this.$router.push({path:'/Expert',query:{id:id}});
			},
			handleContent:function(content){
				content = content.replace(/(\n)/g, "");
				content = content.replace(/(\t)/g, "");
				content = content.replace(/(\r)/g, "");
				content = content.replace(/<\[^>]*>/g, "");
				content = content.replace(/\s*/g, "");
				if(content.length>8){
					return content.substring(0,8)+'...';
				}else{
					return content.substring(0,8)
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
				_this.getExperts();
			},
			handleCurrentChange(val) {
				console.log(`第${val}页 `);
				var _this = this;
				_this.currPage = val;
				_this.getExperts();
			},
			handleCurrentChange2(val) {
				console.log(`第${val}页 `);
				var _this = this;
				_this.currPage = val;
				_this.getExpertsBySort();
			},
		}
	}
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
.content span {
	color: rgb(109, 109, 109);
}
.list {
	margin-top: 30px;
	border-top: 2px solid rgb(250, 250, 250);
}
.list-content {
	width: 50%;
	border-bottom: 2px solid rgb(250, 250, 250);
	float: left;
}
.content {
	width: 75%;
	margin: 0 auto;
	margin-bottom: 20px;
	margin-top: 20px;
	display: flex;
	cursor: pointer;
}
.content img {
	height: 75px;
	width: 75px;
	border-radius: 50%;
	border: 0px;
}
.block {
	margin-top: 30px;
	padding-bottom: 30px;
	margin-left: 25%;
	float: left;
}
</style>
