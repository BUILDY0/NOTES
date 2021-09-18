<template>
  <div class="date-picker" v-listen-panel>
    <div class="picker-input">
      <span class="input-prefix">
        <i class="iconfont icon-date"></i>
      </span>
      <input
        type="text"
        :value="showStraightFormat"
        @change="customChangeDate"
      />
    </div>
    <div class="picker-panel" v-show="showPanel">
      <div class="picker-arrow" />
      <div class="picker-body">
        <div class="picker-header">
          <span
            class="picker-btn iconfont icon-prev-year"
            @click="curDateChange(undefined, 'prev-year')"
          />
          <span
            class="picker-btn iconfont icon-prev-month"
            @click="curDateChange(undefined, 'prev-month')"
          />
          <span class="picker-date">
            {{ curDate.curYear }}年{{ curDate.curMonth + 1 }}月
          </span>
          <span
            class="picker-btn iconfont icon-next-month"
            @click="curDateChange(undefined, 'next-month')"
          />
          <span
            class="picker-btn iconfont icon-next-year"
            @click="curDateChange(undefined, 'next-year')"
          />
        </div>
        <div class="picker-content">
          <div class="picker-weeks">
            <div
              v-for="week in ['日', '一', '二', '三', '四', '五', '六']"
              :key="week"
            >
              {{ week }}
            </div>
          </div>
          <div class="picker-days">
            <div
              v-for="date in showPanelDate"
              :key="date.getTime()"
              :class="isCur(date)"
              @click="changeDate(date)"
            >
              {{ date.getDate() }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    date: {
      type: Date,
      default: () => new Date(),
    },
  },
  model: {
    prop: "date",
    event: "change-date",
  },
  directives: {
    "listen-panel": {
      bind(el, banding, vnode) {
        const vm = vnode.context;
        document.onclick = (e) => {
          const dom = e.target;
          const isElSon = el.contains(dom);
          if (isElSon && !vm.showPanel) {
            vm.changeShowPanel(true);
          } else if (!isElSon && vm.showPanel) {
            vm.changeShowPanel(false);
          }
        };
      },
    },
  },
  data() {
    return {
      showPanel: false,
      curDate: null,
    };
  },
  watch: {
    date(newVal) {
      if (+new Date(newVal)) {
        this.curDateChange(newVal);
      }
      return;
    },
  },
  created() {
    this.curDateChange(this.date);
  },
  methods: {
    customChangeDate(e) {
      this.$emit("change-date", new Date(e.target.value));
    },
    curDateChange(date, option) {
      if (date) {
        this.curDate = {
          curYear: date.getFullYear(),
          curMonth: date.getMonth(),
          curDay: date.getDate(),
        };
      }
      if (option) {
        switch (option) {
          case "prev-year":
            this.curDate.curYear--;
            break;
          case "prev-month":
            if (this.curDate.curMonth - 1 < 0) {
              this.curDate.curYear--;
              this.curDate.curMonth = 11;
            } else {
              this.curDate.curMonth--;
            }
            break;
          case "next-month":
            if (this.curDate.curMonth + 1 > 11) {
              this.curDate.curYear++;
              this.curDate.curMonth = 0;
            } else {
              this.curDate.curMonth++;
            }
            break;
          case "next-year":
            this.curDate.curYear++;
            break;

          default:
            return;
        }
        this.$emit(
          "change-date",
          new Date(
            this.curDate.curYear,
            this.curDate.curMonth,
            this.curDate.curDay
          )
        );
        return;
      }
    },
    isCur(date) {
      let isSelect, isToday, otherMonth;
      const { todayYear, todayMonth, todayDay } = this.today;
      const { curYear, curMonth, curDay } = this.curDate;
      if (
        date.getFullYear() === curYear &&
        date.getMonth() === curMonth &&
        date.getDate() === curDay
      ) {
        isSelect = true;
      } else {
        isSelect = false;
      }

      if (
        date.getFullYear() === todayYear &&
        date.getMonth() === todayMonth &&
        date.getDate() === todayDay
      ) {
        isToday = true;
      } else {
        isToday = false;
      }
      if (date.getMonth() !== curMonth) {
        otherMonth = true;
      } else {
        otherMonth = false;
      }

      const obj = {
        "is-today": isToday,
        "is-select": isSelect,
        "other-month": otherMonth,
      };

      return obj;
    },
    changeDate(date) {
      this.$emit("change-date", date);
      setTimeout(() => {
        this.changeShowPanel(false);
      }, 0);
    },
    changeShowPanel(state) {
      if (state === true && this.showPanel === false) {
        this.showPanel = true;
      } else if (state === false && this.showPanel === true) {
        this.showPanel = false;
      }
      return;
    },
  },
  computed: {
    showStraightFormat() {
      return `${this.curDate.curYear}-${this.curDate.curMonth + 1}-${
        this.curDate.curDay
      }`;
    },
    showPanelDate() {
      const arr = [];
      const { curYear, curMonth } = this.curDate;
      const firstDay = new Date(curYear, curMonth);
      const offsetDay = firstDay.getDay();
      for (let i = 0; i < 42; i++) {
        arr.push(new Date(+firstDay + (i - offsetDay) * 24 * 60 * 60 * 1000));
      }
      return arr;
    },
    today() {
      const today = new Date();
      return {
        todayYear: today.getFullYear(),
        todayMonth: today.getMonth(),
        todayDay: today.getDate(),
      };
    },
  },
};
</script>

<style scoped>
@import "./assets/font.css";

.date-picker {
  display: inline-block;
}

.picker-input {
  position: relative;
}

.picker-input input {
  height: 40px;
  line-height: 40px;
  padding: 0 30px;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
}

.picker-input .input-prefix {
  position: absolute;
  left: 5px;
  width: 25px;
  height: 100%;
  line-height: 40px;
  text-align: center;
  color: #c0c4cc;
}

.picker-panel {
  position: absolute;
  width: 322px;
  height: 329px;
  margin-top: 5px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.picker-panel .picker-arrow {
  position: absolute;
  top: -12px;
  left: 30px;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-bottom-color: #ebeef5;
}

.picker-panel .picker-arrow::after {
  position: absolute;
  left: -6px;
  top: 1px;
  content: "";
  display: block;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-bottom-color: #fff;
  border-top-width: 0;
}

.picker-panel .picker-body {
}

.picker-panel .picker-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 15px;
  padding-bottom: 10px;
}
.picker-panel .picker-btn {
  margin-right: 5px;
  margin-left: 5px;
  font-size: 12px;
  color: #303133;
  cursor: pointer;
}

.picker-panel .picker-date {
  margin-left: 60px;
  margin-right: 60px;
  font-size: 14px;
  user-select: none;
}

.picker-panel .picker-content {
  padding: 0 10px 10px 10px;
  color: #606266;
  user-select: none;
}

.picker-panel .picker-weeks {
  display: flex;
  justify-content: space-around;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ebeef5;
}

.picker-panel .picker-days {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.picker-panel .picker-days div {
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin: 4px 6px;
  font-size: 12px;
  cursor: pointer;
}

.picker-panel .picker-days div:hover {
  color: #409eff;
}

.picker-panel .picker-days div.is-today {
  color: #409eff;
  font-weight: 700;
}

.picker-panel .picker-days div.is-select {
  border-radius: 50%;
  background-color: #409eff;
  color: #fff;
}

.picker-panel .picker-days div.other-month {
  color: #c0c4cc;
}
</style>