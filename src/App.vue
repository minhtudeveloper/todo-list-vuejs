<template>
  <todo-list />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TodoList from "@/components/TodoList/index.vue";

export default defineComponent({
  name: "App",
  components: {
    "todo-list": TodoList
  }
});
</script>
<style lang="scss">
* {
  padding: 0;
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}
body {
  background-color: #f9f9f9;
}
::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
