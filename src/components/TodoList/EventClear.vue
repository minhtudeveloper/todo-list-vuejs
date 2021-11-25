<template>
  <div class="event-clear">
    <div class="button-clear">
      <div class="popup" v-if="isPopup">
        <div class="message"><p>Are you clear to all completed !</p></div>
        <div class="onEvent">
          <button @click="onClear">Ok</button>
          <button @click="onClickCancle">Cancle</button>
        </div>
      </div>
      <button class="clear" @click="onClickClear">Clear Completed</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      isPopup: false
    };
  },
  methods: {
    onClickClear() {
      this.isPopup = true;
    },
    onClickCancle() {
      this.isPopup = false;
    },
    onClear() {
      this.isPopup = false;
      this.$emit("clearCompleted");
    }
  }
});
</script>
