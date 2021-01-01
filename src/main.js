import Vue from 'vue'
import App from './App.vue'

import './style.less'

Vue.config.productionTip = false

if(module.hot) {
  module.hot.accept('./App.vue'), () => {
    // App.vue模块文件被设置为热替换模块后，其内容变化不会触发浏览器刷新，而是会进入如下事件处理
    // console.log('HMR') // 自动刷新导致看不到
    new Vue({
      render: h => h(App),
    }).$mount('#app')
  }
}

new Vue({
  render: h => h(App),
}).$mount('#app')
