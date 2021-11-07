<template>
  <div id="app">
 <!-- 一个带分页功能的数据网格 -->
<!-- data-source绑定总数据,只接受数组 -->
  <DxDataGrid
      :columns="column"
      :show-borders="true"
      :data-source="personData"
    >
    <!-- page-size绑定的是默认几条信息分一页 -->
      <DxPaging :page-size="10" />
      <DxPager
        :show-page-size-selector="true"
        :allowed-page-sizes="pageSizes"
        :show-info="true"
        :show-borders="true"
      />
    </DxDataGrid>   

  </div>
</template>

<script>
import {
  DxDataGrid,
  DxPaging,
  DxPager,
} from 'devextreme-vue/data-grid'
import './mock';
export default {
  components: {
    DxDataGrid,
    DxPaging,
    DxPager,
  },
  data() {
    return {
      personData: [],
      column: ['id', 'name', 'age', 'email', 'birth'],//dataSource绑定的数组里的每条属性写在这里，只接受数组
      pageSizes: [5, 10, 20,40], //控制有多少分页选项
    }
  },
  created() {
    this.getPersonData()
  },
  methods: {
    async getPersonData() {
      const { data : res } = await this.$axios.get('http://www.mocktest.com')
      console.log(res)
      let arr = res
      this.personData = arr
    },
  },
}

</script>

