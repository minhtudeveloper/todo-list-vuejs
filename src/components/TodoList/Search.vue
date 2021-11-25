<template>
  <div class="search">
    <input
      type="text"
      :placeholder="textPlaceHolder || 'What needs to be done'"
      v-model="inputVal"
      @keydown.enter="onKeyEnter"
    />
    <div class="message-input">
      <p>{{ messageInput }}</p>
      <p v-if="this.valueEventUpdate?.isChoose">{{ messageUpdate }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      content: this.value,
      valueOld: this.valueEventUpdate?.value
    };
  },
  props: {
    value: String,
    inpusChange: String,
    messageInput: String,
    valueEventUpdate: Object
  },
  computed: {
    inputVal: {
      get() {
        const result = this.valueEventUpdate?.isChoose
          ? this.valueEventUpdate.value
          : this.value;
        return result;
      },
      set(val: string) {
        if (this.valueEventUpdate?.isChoose)
          this.$emit("update:valueUpdate", val);
        else this.$emit("update:value", val);
      }
    },
    messageUpdate(): string {
      const result = this.valueEventUpdate?.isChoose
        ? `Double click value ${this.valueEventUpdate.valueOld} again to CANCEL.`
        : "";
      return result;
    },
    textPlaceHolder(): string | false {
      const result = this.valueEventUpdate?.isChoose
        ? `Enter to update value `
        : false;
      return result;
    }
  },
  methods: {
    onKeyEnter() {
      if (this.valueEventUpdate?.isChoose) {
        if (
          this.valueEventUpdate.value !== this.valueEventUpdate.valueOld &&
          this.valueEventUpdate.value !== ""
        ) {
          this.$emit("onKeyEnter", {
            ...this.valueEventUpdate,
            value: this.valueEventUpdate.value,
            isUpdate: true
          });
        }
      } else {
        if (this.inputVal !== "") {
          this.$emit("onKeyEnter", { value: this.value, isUpdate: false });
        }
      }
    }
  }
});
</script>

<style lang="scss">
@import "@/styles/variables.scss";
.search {
  padding: 15px 0;
  text-align: center;
  input {
    padding: 8px !important;
    width: calc(100% - 16px);
    border: none;
    color: $text-primary1;
    font-size: 24px;
    letter-spacing: 1px;
    outline: none;
    box-shadow: -0.5px 1px $color-dark;
    &:hover {
      outline: 1px solid $text-primary2;
    }
    &::placeholder {
      color: $text-primary2;
    }
  }
  .message-input {
    text-align: left;
    padding-top: 15px;
    p {
      min-height: 18px;
      padding: 3px 0;
    }
  }
}
</style>
