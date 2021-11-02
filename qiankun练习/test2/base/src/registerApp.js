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

start();