<template>
  <div class="list-todo">
    <div class="item" v-for="todo in data" :key="todo.value">
      <label class="checkbox">
        <input
          type="checkbox"
          :checked="todo.status === COMPLETE"
          v-if="todo.status !== DELETE"
          @click="onCheck(todo)"
        />
        <span class="checkmark" v-if="todo.status !== DELETE"></span>
      </label>
      <p
        @mouseover="onHoverContent(todo.value)"
        @mouseleave="onHoverContent('')"
        @dblclick="onUpdate(todo.value)"
        :class="`${todo.status === DELETE ? 'line-through' : ''} ${
          valueIsUpdate === todo.value ? 'is-choose' : ''
        }`"
      >
        {{ todo.value }}
      </p>
      <span
        class="delete"
        @click="onDelete(todo)"
        v-if="todo.status !== DELETE && valueIsUpdate !== todo.value"
        >X</span
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { statusTodo, objectTodo } from "@/constants/statusOption";

export default defineComponent({
  data() {
    const { ACTIVE, COMPLETE, DELETE } = statusTodo;
    return {
      ACTIVE,
      COMPLETE,
      DELETE,
      valueUpdate: false as string | false,
      test: null
    };
  },
  props: {
    data: Array
  },
  computed: {
    valueIsUpdate(): string {
      const result = this.valueUpdate;
      return result || "";
    }
  },
  methods: {
    onCheck(value: objectTodo) {
      this.$emit("onCheck", value);
    },
    onDelete(value: objectTodo) {
      this.$emit("onDelete", value);
    },
    onHoverContent(value: string) {
      if (!this.valueUpdate) this.$emit("onHoverContent", value);
    },
    onUpdate(value: string) {
      if (this.valueUpdate !== value) {
        this.valueUpdate = value;
        this.$emit("chooseUpdate", { value, isChoose: true, valueOld: value });
      } else {
        this.$emit("chooseUpdate", { value, isChoose: false });
      }
    }
  },
  watch: {
    data() {
      this.valueUpdate = false;
    }
  }
});
</script>
