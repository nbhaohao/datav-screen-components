<template>
  <div class="data-v-fly-box" ref="dataVFlyBoxContainer">
    <svg :width="width" :height="height">
      <defs>
        <path :id="pathId" :d="path" fill="none" />
        <radialGradient
          :id="radialGradientId"
          cx="50%"
          cy="50%"
          fx="100%"
          fy="50%"
          r="50%"
        >
          <stop offset="0%" stop-color="#fff" stop-opacity="1"></stop>
          <stop offset="100%" stop-color="#fff" stop-opacity="0"></stop>
        </radialGradient>
        <mask :id="maskId">
          <circle
            :r="starLength"
            cx="0"
            cy="0"
            :fill="`url(#${radialGradientId})`"
          >
            <animateMotion
              :dur="`${duration}s`"
              :path="path"
              rotate="auto"
              repeatCount="indefinite"
            ></animateMotion>
          </circle>
        </mask>
      </defs>
      <use :href="`#${pathId}`" stroke-width="1" :stroke="lineColor" />
      <use
        :href="`#${pathId}`"
        stroke-width="3"
        :stroke="starColor"
        :mask="`url(#${maskId})`"
      />
    </svg>
    <div class="data-v-fly-box-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, getCurrentInstance, computed } from "vue";
import { v4 as uuidV4 } from "uuid";
export default {
  name: "DataVFlyBox",
  props: {
    lineColor: {
      type: String,
      default: "#235fa7",
    },
    starColor: {
      type: String,
      default: "#4fd2dd",
    },
    starLength: {
      type: [String, Number],
      default: 50,
    },
    duration: {
      type: [Number, String],
      default: 3,
    },
  },
  setup() {
    const uuid = uuidV4();
    const width = ref(0);
    const height = ref(0);
    const pathId = `path-${uuid}`;
    const radialGradientId = `radial-${uuid}`;
    const maskId = `mask-${uuid}`;
    const path = computed(
      () =>
        `M5 5 L${width.value - 5} 5 L${width.value - 5} ${
          height.value - 5
        } L5 ${height.value - 5} Z`
    );
    const init = () => {
      const instance = getCurrentInstance();
      const dom = instance.ctx.$refs["dataVFlyBoxContainer"];
      width.value = dom.clientWidth;
      height.value = dom.clientHeight;
    };
    onMounted(() => {
      init();
    });
    return {
      maskId,
      pathId,
      radialGradientId,
      width,
      height,
      path,
    };
  },
};
</script>

<style scoped lang="scss">
.data-v-fly-box {
  position: relative;
  width: 100%;
  height: 100%;
  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .data-v-fly-box-content {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 5px;
  }
}
</style>
