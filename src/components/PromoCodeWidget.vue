<template>
  <div class="promo-code-widget">
    <template v-if="isInputShown">
      <form class="promo-code-widget__form" @submit.prevent="applyCode()">
        <input
          class="promo-code-widget__form-input input-underlined"
          type="text"
          v-model="code"
          placeholder="Promo code"
        />
        <button class="promo-code-widget__form-btn btn-framed" type="submit">
          Apply
        </button>
      </form>

      <button class="promo-code-widget__toggle" @click="toggleInput()">
        <span class="promo-code-widget__toggle-txt"> Hide promo code </span>
        <i class="promo-code-widget__toggle-ico ico ico__arrow-top"></i>
      </button>
    </template>

    <template v-else>
      <button class="promo-code-widget__toggle" @click="toggleInput()">
        <span class="promo-code-widget__toggle-txt"> I have promo code </span>
        <i class="promo-code-widget__toggle-ico ico ico__arrow-down"></i>
      </button>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const code = ref('')
    const applyCode = () => {
      console.log(code.value)
    }

    const isInputShown = ref(false)
    const toggleInput = () => {
      isInputShown.value = !isInputShown.value
    }

    return { code, applyCode, isInputShown, toggleInput }
  },
})
</script>

<style scoped lang="scss">
.promo-code-widget {
  width: 100%;
}

.promo-code-widget__form {
  width: 100%;
  display: grid;
  grid: 'input button' / 1fr auto;
  gap: 0.8rem;
}

.promo-code-widget__form-input {
  grid-area: input;
}

.promo-code-widget__form-btn {
  grid-area: button;
}

.promo-code-widget__toggle {
  border-bottom: 1px dashed currentColor;

  .promo-code-widget__form + & {
    margin-top: 1.2rem;
  }
}

.promo-code-widget__toggle-ico,
.promo-code-widget__toggle-txt {
  vertical-align: middle;
}
</style>
