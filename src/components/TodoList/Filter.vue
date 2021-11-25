<template>
  <div class="filter-todo">
    <div class="progess">
      <span
        :style="{ width: calculateFilter.numberProgessCompleted + '%' }"
      ></span>
    </div>
    <div class="filter">
      <div class="left">
        <p>{{ calculateFilter.numberCompleted }} item completed</p>
      </div>
      <div class="right">
        <button
          @click="changeKey(statusFilter.ALL)"
          :class="keyFilter === statusFilter.ALL ? 'active' : ''"
        >
          All
        </button>
        <button
          @click="changeKey(statusFilter.ACTIVE)"
          :class="keyFilter === statusFilter.ACTIVE ? 'active' : ''"
        >
          Active
        </button>
        <button
          @click="changeKey(statusFilter.COMPLETED)"
          :class="keyFilter === statusFilter.COMPLETED ? 'active' : ''"
        >
          Completed
        </button>
        <button
          @click="changeKey(statusFilter.DELETED)"
          :class="keyFilter === statusFilter.DELETED ? 'active' : ''"
        >
          Deleted
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { statusFilter } from "@/constants/statusOption";

export default defineComponent({
  data() {
    return {
      statusFilter
    };
  },
  props: {
    keyFilter: String,
    calculateFilter: Object
  },
  methods: {
    changeKey: function (key: string) {
      this.$emit("changeKey", key);
    }
  }
});
</script>

<style lang="scss">
@import "@/styles/variables.scss";
.filter-todo {
  background-color: #fff;
  .progess {
    flex-flow: 1;
    height: 10px;
    width: 100%;
    background-color: $color-dark;
    border-radius: 5px;
    span {
      display: block;
      height: 100%;
      width: 0;
      border-radius: 5px;
      background-color: $text-primary1;
    }
  }
  .filter {
    padding: 15px 0;
    display: flex;
    justify-content: space-between;
    color: $text-primary1;
    border-bottom: 1px solid $color-dark;
    .left {
      padding: 0 15px;
      p {
        font-size: 16px;
      }
    }
    .right {
      padding: 0 10px;
      button {
        margin: 0 5px;
        border: none;
        background: none;
        color: $text-primary2;
        font-size: 16px;
        &:hover {
          color: $text-primary1;
          cursor: pointer;
        }
        &.active {
          color: $text-primary1;
        }
      }
    }
  }
}
</style>
