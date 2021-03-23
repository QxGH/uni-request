import login from './login.js';

export default {
	config: {
		baseUrl: "https://www.fastmock.site/mock/cf616a96108b1f49004ba088538222bf/test",
		headers: {},
		header: {},
		dataType: "json",
		responseType: "text"
	},
	interceptor: {
		request: null,
		response: null
	},
	request(options) { 
		return new Promise((resolve, reject) => {
			let _config = null
			options.url = this.config.baseUrl + options.url
			options.complete = (response) => {
				let statusCode = response.statusCode

				response.config = _config

				if (process.env.NODE_ENV === 'development') {
					if (statusCode === 200) {
						console.log("【" + _config.requestId + "】 结果：" + JSON.stringify(response.data))
					}
				}

				if (this.interceptor.response) {
					let newResponse = this.interceptor.response(response)
					if (newResponse) {
						response = newResponse
					}
				}

				if (statusCode === 200) { //成功
					resolve(response);
				} else {
					reject(response)
				}
			}

			_config = Object.assign({}, this.config, options)
			_config.requestId = new Date().getTime()

			if (this.interceptor.request) {
				this.interceptor.request(_config)
			}

			if (process.env.NODE_ENV === 'development') {
				console.log("【" + _config.requestId + "】 地址：" + _config.url)
				if (_config.data) {
					console.log("【" + _config.requestId + "】 参数：" + JSON.stringify(_config.data))
				}
			}
			let token = localStorage.getItem('token');
			if(token) {
				_config.header.token = token;
			} else {
				login(_config, (oldConfig) => {
					oldConfig.header.token = token;
					uni.request(oldConfig);
				})
				return false
			};

			uni.request(_config);
		});
	},
	get(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'GET'
		return this.request(options)
	},
	post(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'POST'
		return this.request(options)
	},
	put(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'PUT'
		return this.request(options)
	},
	delete(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'DELETE'
		return this.request(options)
	}
}
