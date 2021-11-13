
<template>
  <div id="app">
    <v-chart :option='data' class='charts'/>
  </div>
</template>

<script>
import 'echarts';
export default {
  name: 'App',
  data(){
    return {
      data:{
        tiele:{
          text:'hello',
        },
        xAxis:{
          data:'ABCDE'.split('')
        },
        yAxis:{

        },
        series:{
          name:'value',
          type:'bar',
          data:[5,10,15,20,25]
        }
      }
    }
  }
}
</script>

<style scoped>
.chart{
  height: 800px;
  width: 100%;
  border: 1px solid yellow;
}
</style>


