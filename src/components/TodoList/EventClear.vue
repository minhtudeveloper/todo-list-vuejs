<template>
  <div class="event-clear">
    <div class="button-clear">
      <div class="popup" v-if="isPopup">
        <div class="message"><p>Are you clear all completed!</p></div>
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
    onClickClear: function () {
      this.isPopup = true;
    },
    onClickCancle: function () {
      this.isPopup = false;
    },
    onClear: function () {
      this.isPopup = false;
      this.$emit("clearCompleted");
    }
  }
});
</script>

<style lang="scss">
@import "@/styles/variables.scss";
.event-clear {
  padding: 20px 0;
  width: 100%;
  .button-clear {
    max-width: 300px;
    margin: 0 auto;
    position: relative;
    .popup {
      height: 100px;
      width: 80%;
      min-width: 240px;
      background-color: #df6d6d;
      position: absolute;
      z-index: 1;
      bottom: 20px;
      right: 0;
      border-radius: 20px 20px 0 0;
      display: flex;
      align-items: center;
      flex-direction: column;
      border: 1px solid $text-primary2;
      .message {
        padding: 12px;
        color: #fff;
        font-size: 14px;
      }

      button {
        margin: 0 10px;
        padding: 5px 10px;
        background-color: #fff;
        border: 1px solid $text-primary2;
        color: $text-primary1;
        font-weight: bold;
        &:hover {
          cursor: pointer;
          background-color: $color-dark;
        }
      }
    }
    button.clear {
      position: relative;
      z-index: 2;
      width: 100%;
      height: 40px;
      border: 1px solid $text-primary2;
      background-color: $text-primary2;
      border-radius: 20px;
      font-size: 22px;
      font-weight: bold;
      color: #f2f2f2;
      &:hover {
        cursor: pointer;
        background-color: $text-primary1;
      }
    }
  }
}
</style>
