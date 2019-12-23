import axios from 'axios';
import Vue from 'vue';
//接口请求前缀
axios.defaults.baseURL =
  'https://press.h5no1.com/apg-insurance-answer-three/api';
axios.defaults.timeout = 10000; //设置请求超时500毫秒
//是否需要cookie
axios.defaults.withCredentials = true;

// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    const { ok, msg } = response.data;
    if (!ok) {
    const error = new Error(msg);
    Sentry.withScope(scope => {
      // 使用 api 的请求地址作为分类依据
      const { url, baseURL } = response.config;
      const fingerprint = url.replace(baseURL, '');
      scope.setFingerprint(['{{ default }}', fingerprint]);
      Sentry.captureException(error);
    });
    }
    // 对响应数据做点什么
    return response;
  },
  function(err) {
    const error = new Error(err.message);
    Sentry.withScope(scope => {
      // 使用 api 的请求地址作为分类依据
      const { url, baseURL } = err.config;
      console.log(url, baseURL);
      const fingerprint = url.replace(baseURL, '');
      scope.setFingerprint(['{{ default }}', fingerprint]);
      Sentry.captureException(error);
    });
    // 对响应错误做点什么
    return Promise.reject(err);
  }
);

Vue.prototype.$ajax = axios;
