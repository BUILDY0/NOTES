<template>
  <div id="hello">
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      option: {
        title: {
          text: "Traffic Sources",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: [
            "Direct",
            "Email",
            "Ad Networks",
            "Video Ads",
            "Search Engines",
          ],
        },
        series: [
          {
            name: "Traffic Sources",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 1335, name: "Direct" },
              { value: 1310, name: "Email" },
              { value: 1234, name: "Ad Networks" },
              { value: 1135, name: "Video Ads" },
              { value: 11548, name: "Search Engines" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
    };
  },
  mounted() {
    const dom = document.getElementById('hello')
    const e = this.$echarts.init(dom);
    e.setOption(this.option);
    window.e = e;
    e.getOption();
  },
};
</script>

<style scoped>
#hello {
  width: 800px;
  height: 400px;
}
</style>
