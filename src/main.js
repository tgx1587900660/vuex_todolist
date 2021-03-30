import Vue from 'vue'
import App from './App.vue'

// 引入 store 实例对象，以便共享数据
import store from './store'

// 1. 导入 ant-design-vue 组件库
import Antd from 'ant-design-vue'
// 2. 导入组件库的样式表
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false

// 3. 安装组件库
Vue.use(Antd)

new Vue({
  // 把 store 挂载到 vue 实例对象中
  store,
  render: h => h(App)
}).$mount('#app')
