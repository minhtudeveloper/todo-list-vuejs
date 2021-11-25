<template>
  <div class="todo-list">
    <div class="title"><h1>TODOS</h1></div>
    <search-input
      v-model:value="textInput"
      v-model:valueUpdate="eventUpdate.value"
      :valueEventUpdate="valueEventUpdate"
      :messageInput="messageSearch"
      @onKeyEnter="onKeyEnter"
    />
    <filter-todo
      :keyFilter="statusFilter"
      :calculateFilter="calculateFilter"
      @changeKey="changeKeyFilter"
    />
    <list-todo
      :data="dataFilter"
      @onCheck="onCheck"
      @onDelete="onDelete"
      @onHoverContent="onHoverContent"
      @chooseUpdate="chooseUpdate"
    />
    <event-clear v-if="isShowClearCompleted" @clearCompleted="clearCompleted" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Search from "./Search.vue";
import Filter from "./Filter.vue";
import List from "./List.vue";
import EventClear from "./EventClear.vue";
import { statusTodo, statusFilter, objectTodo } from "@/constants/statusOption";
import removeVietnameseTones from "@/constants/remoteVietnameseTone";

interface DataObject {
  todoList: objectTodo[];
  statusFilter: statusFilter;
  textInput: string;
  messageInput: string;
  eventUpdate: eventUpdateObject;
}
interface eventUpdateObject {
  valueOld?: string;
  value: string;
  isChoose?: boolean;
  isUpdate?: boolean;
}
interface calculateFilterObject {
  numberCompleted: number;
  numberProgessCompleted: string;
}
export default defineComponent({
  name: "TodoList",
  components: {
    "search-input": Search,
    "filter-todo": Filter,
    "list-todo": List,
    "event-clear": EventClear
  },
  data(): DataObject {
    return {
      todoList: [],
      statusFilter: statusFilter.ALL,
      textInput: "",
      messageInput: "",
      eventUpdate: {
        value: ""
      }
    };
  },
  created() {
    this.todoList = require("@/utils/todoList.json");
  },
  computed: {
    dataFilter: function (): objectTodo[] {
      let keysFilter: Array<number> = [];
      switch (this.statusFilter) {
        case statusFilter.ALL:
          keysFilter = [statusTodo.ACTIVE, statusTodo.COMPLETE];
          break;
        case statusFilter.ACTIVE:
          keysFilter = [statusTodo.ACTIVE];
          break;
        case statusFilter.COMPLETED:
          keysFilter = [statusTodo.COMPLETE];
          break;
        default:
          keysFilter = [statusTodo.DELETE];
          break;
      }
      return this.todoList.filter((item) => {
        return (
          keysFilter.includes(item.status) &&
          removeVietnameseTones(item.value)
            .toLowerCase()
            .includes(removeVietnameseTones(this.textInput.toLowerCase()))
        );
      });
    },
    calculateFilter: function (): calculateFilterObject {
      const numberCompleted = this.todoList.reduce(
        (counter: number, obj: objectTodo) =>
          obj.status === statusTodo.COMPLETE ? counter + 1 : counter,
        0
      );
      const numberNotDelete = this.todoList.reduce(
        (counter: number, obj: objectTodo) =>
          obj.status !== statusTodo.DELETE ? counter + 1 : counter,
        0
      );
      const numberProgessCompleted = (
        (numberCompleted / numberNotDelete) *
        100
      ).toFixed(2);
      return { numberCompleted, numberProgessCompleted };
    },
    messageSearch: function (): string {
      return this.messageInput;
    },
    valueEventUpdate: function (): eventUpdateObject {
      const result = this.eventUpdate;
      return result;
    },
    isShowClearCompleted: function (): boolean {
      if (
        [statusFilter.DELETED, statusFilter.ACTIVE].includes(
          this.statusFilter
        ) ||
        !Number(this.calculateFilter.numberProgessCompleted)
      ) {
        return false;
      }
      return true;
    }
  },
  methods: {
    onCheck: function (todo: objectTodo) {
      const index = this.todoList.findIndex(
        (item) => item.value === todo.value
      );
      if (index >= 0) {
        const status =
          todo.status === statusTodo.ACTIVE
            ? statusTodo.COMPLETE
            : statusTodo.ACTIVE;
        this.todoList[index] = {
          value: todo.value,
          status
        };
      }
    },
    onDelete: function (todo: objectTodo) {
      const index = this.todoList.findIndex(
        (item) => item.value === todo.value
      );
      if (index >= 0) {
        const status = statusTodo.DELETE;
        this.todoList[index] = {
          value: todo.value,
          status
        };
      }
    },
    onHoverContent: function (value: string) {
      if (value) this.messageInput = `Double click to update value: ${value}`;
      else this.messageInput = "";
    },
    changeKeyFilter: function (key: statusFilter) {
      this.statusFilter = key;
    },
    onKeyEnter: function (obj: eventUpdateObject) {
      const { value, isUpdate, valueOld } = obj;
      if (isUpdate) {
        const index = this.todoList.findIndex(
          (item) => item.value === valueOld
        );
        if (index >= 0) {
          this.todoList[index].value = value;
          this.messageInput = `updated value '${valueOld}' to '${value}' successfully`;
          this.eventUpdate = {
            value: ""
          };
        }
      } else {
        if (this.todoList.some((item) => item.value === value)) {
          return;
        } else {
          this.todoList.push({
            value,
            status: statusTodo.ACTIVE
          });
          this.messageInput = `added ${value} successfully`;
        }
      }
    },
    chooseUpdate: function (obj: eventUpdateObject) {
      this.messageInput = `updating for value: ${obj.valueOld} ~~~`;
      this.eventUpdate = obj;
    },
    clearCompleted: function () {
      this.todoList = this.todoList.map((item) => {
        if (item.status == statusTodo.COMPLETE) {
          item.status = statusTodo.DELETE;
        }
        return item;
      });
    }
  }
});
</script>

<style lang="scss">
@import "@/styles/variables.scss";
.todo-list {
  width: 50%;
  max-width: 600px;
  min-height: 600px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .title {
    text-align: center;
    padding-bottom: 15px;
    h1 {
      color: $text-primary1;
      font-size: 50px;
    }
  }
}
</style>
