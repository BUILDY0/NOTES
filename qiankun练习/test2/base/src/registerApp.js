import {registerMicroApps,start} from 'qiankun';

const loader = (loading)=>{
    console.log(loading);
};
registerMicroApps([{
    name:'m-vue',
    entry:'//localhost:20000',
    container:'#container',
    activeRule:'/vue',
    loader,
},{
    name:'m-react',
    entry:'//localhost:30000',
    container:'#container',
    activeRule:'/react',
    loader,
}],{
    beforeLoad(){
        console.log(`beforeLoad`);
    },
    beforeMount(){
        console.log(`beforeMount`);
    },
    afterMount(){
        console.log('afterMount');
    },
    beforeUnmount(){
        console.log('beforeUnmount');
    },
    afterUnmount(){
        console.log('afterUnmount');
    }
})

start({
    /**
     * 样式隔离可以采用两种方式：（二选一）
     * 一、开启sandbox选项，这样会用CSSmodules的方式解决，为每个微应用加上data-qiankun="%name%"的自定义行间属性，并在样式表中使用属性选择器选出dom并添加样式（推荐）
     * 二、使用shadowDOM的方法，缺点是增加全局样式会出现问题。
     */
    sandbox:{
        experimentalStyleIsolation:true,//CSSmodules方式
        // strictStyleIsolation:true,//shadowDOM方式
    }
});