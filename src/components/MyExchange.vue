<template>
	<div>
		<div class="list" v-show="!show">
			<div class="content" v-for="(item, index) in myexchange" :key="index">
				<div class="e-content">
					<div class="question-content">
						<span style="cursor: pointer" @click="gotoDetail(item.id)">{{ handleContent(item.content) }}</span>
					</div>
					<div class="bottom" style="">
						<span style="margin-right: 20px;">{{item.time}}</span>
						<el-button type="text" @click="deleteExchange(item.id)">
							<span style="color: red;cursor: pointer;">删除</span>
						</el-button>
						<span style="margin-left: 50px;">点赞：{{item.like}}</span>
						<span style="margin-left: 20px;">回复数：{{item.replyAmount}}</span>
					</div>
				</div>
			</div>
			<div class="block">
				<el-pagination
				background layout="prev, pager, next,jumper" :total="totalRecord"
				:page-size="pageSize" :current-page="currPage"
				@current-change="handleCurrentChange"
				>
				</el-pagination>
			</div>
		</div>
		<div class="none" v-show="show">
			<div class="none-text">
				<div class="img"><img src="/static/铁锹.png" style="height: 70px;width: 70px;" /></div>
				<span>暂无内容</span>
			</div>
		</div>
	</div>
</template>

<script>
import { Message } from 'element-ui';
export default {
	name: 'myExchange',
	data() {
		return {
			loginUser: JSON.parse(localStorage.getItem('login_key')),
			myexchange: [],
			show: false,
			totalRecord: 0,
			currPage: 1,
			pageSize: 6
		};
	},
	mounted: function() {
		this.getMyExchange();
	},
	methods: {
		getMyExchange: function() {
			var _this = this;
			console.log('getMyExchange');
			_this.$http({
					method: 'GET',
					url: this.apiServer + 'api/exchange/getMyExchangeList',
					params: {
						userId: _this.loginUser.userId,
						currPage: _this.currPage,
						pageSize: _this.pageSize
					},
					header: {
						'content-type': 'application/json'
					}
				})
				.then(function(res) {
					if (res.data.code == 0) {
						_this.myexchange = res.data.data;
						_this.totalRecord = res.data.total;
						// 						if (_this.myexchange.length == 0) {
						// 							_this.show = true;
						// 						}
						if (_this.totalRecord == 0) {
							_this.show = true;
						}
						if (_this.myexchange.length == 0) {
							_this.currPage = _this.currPage - 1;
							_this.getMyExchange();
						}
					} else {
						Message({
							message: '数据加载失败!！',
							type: 'error'
						});
					}
				});
		},
		gotoDetail: function(id) {
			this.$router.push({
				path: '/exchangeDetail',
				query: {
					id: id
				}
			});
		},

			//删除交流
		deleteExchange: function(eId) {
				var _this = this;
				_this.$confirm('是否要删除该交流?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				})
				.then(() => {
					console.log('deleteExchange:eId(' + eId + ')');
					_this
						.$http({
							method: 'GET',
							url: this.apiServer + 'api/exchange/deleteExchange',
							params: {
								id: eId
							},
							header: {
								'content-type': 'application/json'
							}
						})
						.then(function(res) {
							if (res.data.code == 0) {
								Message({
									message: '删除成功!！',
									type: 'success'
								});
								_this.getMyExchange();
							} else {
								Message({
									message: '删除失败!！',
									type: 'error'
								});
							}
						});
				})
				.catch(() => {
					_this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
		},
		sel() {
			console.log(this.value);
			console.log(this.value2);
		},
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
			var _this = this;
			_this.pageSize = val;
			_this.getMyExchange();
		},
		handleCurrentChange(val) {
			console.log(`第${val}页 `);
			var _this = this;
			_this.currPage = val;
			_this.getMyExchange();
		},
		handleContent: function(content) {
			content = content.replace(/(\n)/g, '');
			content = content.replace(/(\t)/g, '');
			content = content.replace(/(\r)/g, '');
			content = content.replace(/<\[^>]*>/g, '');
			content = content.replace(/\s*/g, '');
			if (content.length > 65) {
				return content.substring(0, 65) + '...[详情]';
			} else {
				return content.substring(0, 65);
			}
		}
	}
};
</script>
<style scoped>
.question-content span {
	font-size: 17px;
}

	.bottom span {
		color: rgb(109,109,109);
	}

.content {
	width: 100%;
	/* border-top: 2px solid rgb(244, 244, 244); */
	/* border-bottom: 2px solid rgb(244, 244, 244); */
	margin-bottom: 5px;
	background-color: #ffffff;
}

.list {
	width: 95%;
	margin: 0 auto;
	/* height: 700px; */
	margin-top: 20px;
	margin-bottom: 20px;
}
	.sort {
		background-color: rgb(233, 102, 53);
		height: 25px;
		width: 45px;
		line-height: 25px;
		text-align: center;
		border-radius: 4px;
		margin-right: 5px;
	}
	.e-content{
		width: 97%;
		margin: 0 auto;
		padding-top: 10px;
	}
	.question-content{
		display: flex;
		margin-bottom: 30px;
	}
	.none-text{
		width: 50%;
		margin: 0 auto;
		margin-top: 150px;
		text-align: center;
	}
	.none span{
		font-size: 20px;
		color: rgb(109,109,109);
		letter-spacing: 5px;
	}
	.block{
		text-align: center;
		margin-top: 20px;
		padding-bottom: 20px;
	}
</style>
