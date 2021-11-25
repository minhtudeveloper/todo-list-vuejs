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
    valueIsUpdate: function (): string {
      const result = this.valueUpdate;
      return result || "";
    }
  },
  methods: {
    onCheck: function (value: objectTodo) {
      this.$emit("onCheck", value);
    },
    onDelete: function (value: objectTodo) {
      this.$emit("onDelete", value);
    },
    onHoverContent: function (value: string) {
      if (!this.valueUpdate) this.$emit("onHoverContent", value);
    },
    onUpdate: function (value: string) {
      if (this.valueUpdate !== value) {
        this.valueUpdate = value;
        this.$emit("chooseUpdate", { value, isChoose: true, valueOld: value });
      } else {
        this.valueUpdate = false;
        this.$emit("chooseUpdate", { value, isChoose: false });
      }
    }
  },
  watch: {
    data: function () {
      this.valueUpdate = false;
    }
  }
});
</script>

<style lang="scss">
@import "@/styles/variables.scss";
.list-todo {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid $color-dark;
  background-color: #fff;
  .item {
    display: flex;
    padding: 15px;
    align-items: center;

    /* The checkbox */
    .checkbox {
      height: 16px;
      display: block;
      position: relative;
      padding-left: 35px;
      margin-bottom: 12px;
      cursor: pointer;
      font-size: 25px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
      }
      .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        border: 1px solid $text-primary2;

        &::after {
          content: "";
          position: absolute;
          display: none;
          left: 9px;
          top: 5px;
          width: 5px;
          height: 10px;
          border: solid white;
          border-width: 0 3px 3px 0;
          -webkit-transform: rotate(45deg);
          -ms-transform: rotate(45deg);
          transform: rotate(45deg);
        }
      }
      input:checked ~ .checkmark {
        background-color: $text-primary1;
      }
      input:checked ~ .checkmark:after {
        display: block;
      }
    }
    p {
      flex: 2;
      padding: 5px 15px;
      &.line-through {
        text-decoration-line: line-through;
      }
      &:hover {
        cursor: pointer;
      }
      &.is-choose {
        background-color: $text-primary2;
      }
    }
    span {
      font-size: 25px;
      color: rgb(201, 14, 14);
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
