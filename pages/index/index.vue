<template>
	<view class="content">
		<image class="logo" :src="avatar"></image>
		<view class="text-area">
			<text class="title">{{username}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				avatar: ''
			}
		},
		onLoad() {
			this.getDetails()
		},
		methods: {
			getDetails() {
				let api = this.$http.post("/getDetails", {})
				.then(res=> {
					if(res.data.code == '0') {
						let data = res.data.data;
						this.username = data.info.username;
						this.avatar = data.info.avatar;
					} else {
						alert('error')
					}
				})
				.catch(err=> {
					alert('error')
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
