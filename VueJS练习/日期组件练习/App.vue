<template>
  <div class="app">
    <date-picker v-model="date" />
    <!-- :date="date" @change-date="changeDate" -->
  </div>
</template>

<script>
import DatePicker from "./DatePicker";

export default {
  components: {
    DatePicker,
  },
  data() {
    return {
      date: new Date(),
    };
  },
  // methods: {
  //   changeDate(date) {
  //     this.date = date;
  //   },
  // },
};
</script>

<style scoped>
</style>