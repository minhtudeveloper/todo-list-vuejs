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
