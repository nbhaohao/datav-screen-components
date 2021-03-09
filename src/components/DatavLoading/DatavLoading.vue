<template>
  <div class="data-v-loading">
    <svg :width="width" :height="height" viewBox="0 0 50 50">
      <circle
        cx="25"
        cy="25"
        r="22"
        fill="none"
        stroke-width="3"
        :stroke="outsideColor"
        stroke-dasharray="34"
        stroke-linecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 25 25; 360 25 25"
          :dur="`${duration}s`"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke"
          :values="`${outsideColor};${insideColor};${outsideColor}`"
          :dur="`${+duration * 2}s`"
          repeatCount="indefinite"
        ></animate>
      </circle>
      <circle
        cx="25"
        cy="25"
        r="12"
        fill="none"
        stroke-width="3"
        :stroke="outsideColor"
        stroke-dasharray="19"
        stroke-linecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="360 25 25; 0 25 25"
          :dur="`${duration}s`"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke"
          :values="`${insideColor};${outsideColor};${insideColor}`"
          :dur="`${+duration * 2}s`"
          repeatCount="indefinite"
        ></animate>
      </circle>
    </svg>
    <div class="data-v-loading-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "DatavLoading",
  props: {
    width: {
      type: [Number, String],
      default: 50,
    },
    height: {
      type: [Number, String],
      default: 50,
    },
    outsideColor: {
      type: String,
      default: "#3be6cb",
    },
    insideColor: {
      type: String,
      default: "#02bcfe",
    },
    duration: {
      type: [Number, String],
      default: 2,
    },
  },
};
</script>

<style scoped lang="scss">
.data-v-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
