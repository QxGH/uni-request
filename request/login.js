
export default function(_config, callback) {
	uni.request({
		url: 'https://www.fastmock.site/mock/cf616a96108b1f49004ba088538222bf/test/login',
		method: 'POST',
		header: {
			'Content-Type': 'application/json'
		},
		success: (res) => {
			if(res.data.code == 0) {
				localStorage.setItem('token', res.data.data.token)
				callback(_config)
			} else {
				alert('error')
			}
		},
		error: (err) => {
			alert('error')
		}
	});
}
