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
    changeKey(key: string) {
      this.$emit("changeKey", key);
    }
  }
});
</script>
