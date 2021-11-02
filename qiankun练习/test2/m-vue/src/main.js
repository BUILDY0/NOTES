import { createApp } from 'vue'
import {createWebHistory,createRouter} from 'vue-router'
import App from './App.vue'
import routes from './router'

// createApp(App).mount('#app')
// console.log(createApp,'++',createRouter,'++',createWebHistory);
let history,router,app;
function render(props = {}){
//    console.log(props);
   history = createWebHistory('/vue');
   router =  createRouter({
       history,
       routes
   });
   app = createApp(App);
   let {container} = props;
   app.use(router).mount(container ? container.querySelector('#app'):'#app')
}

// qiankun在渲染前提供一个变量window.__POWERED_BY_QIANKUN__
if(!window.__POWERED_BY_QIANKUN__){
    render();
}
export async function bootstrap(){
    console.log(`bootstrap`);
}

export async function mount(props){
    console.log(`mount`);
    console.log(props);
    render(props);
}
export async function unmount(){
    console.log(`unmount`);
    history = null;
    router = null;
    app = null;
}