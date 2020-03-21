//这是工程的入口文件
import Vue from 'vue';
import App from './app.vue';

import './styles/test.css';
import './styles/test-stylus.styl';
import './assets/vue.jpg';


const root = document.createElement('div')
document.body.appendChild(root)

// 一种写法
// //mount就是讲我们的App挂载到root这样一个根节点中去
// new Vue({
//   render: (h) => h(App)
// }).$mount(root)


// 容易理解的写法
new Vue({
    el: root,
    // router: router,
    render: (c) => {
        return c(App);
    },
});