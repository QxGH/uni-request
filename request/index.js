import http from './http.js';

http.interceptor.request = (config) => {
    //添加通用参数 
	console.log('请求前',config)
	return config;
}
//设置请求结束后拦截器
http.interceptor.response = (response) => {
    //判断返回状态 执行相应操作
	console.log('请求后',response)
	debugger
    return response;
}
export default http;