<template>
  <div id="datav-container" ref="datavContainer">
    <template v-if="ready">
      <slot></slot>
    </template>
  </div>
</template>

<script>
import { ref, getCurrentInstance, onMounted, onUnmounted, nextTick } from "vue";
import { debounce } from "../../utils";

export default {
  name: "DatavContainer",
  props: {
    options: Object,
    default: () => {},
  },
  setup(props) {
    const width = ref(0);
    const height = ref(0);
    const originalWidth = ref(0);
    const originalHeight = ref(0);
    const ready = ref(false);
    let context;
    let dom;
    const initSize = () => {
      dom = context.refs.datavContainer;
      return new Promise((resolve) => {
        nextTick(() => {
          if (props.options && props.options.width && props.options.height) {
            width.value = props.options.width;
            height.value = props.options.height;
          } else {
            width.value = dom.clientWidth;
            height.value = dom.clientHeight;
          }
          if (!originalWidth.value || !originalHeight.value) {
            originalWidth.value = window.screen.width;
            originalHeight.value = window.screen.height;
          }
          resolve();
        });
      });
    };
    const updateSize = () => {
      if (width.value && height.value) {
        dom.style.width = `${width.value}px`;
        dom.style.height = `${height.value}px`;
      } else {
        dom.style.width = `${originalWidth.value}px`;
        dom.style.height = `${originalHeight.value}px`;
      }
    };
    const updateScale = () => {
      const currentWidth = document.body.clientWidth;
      const currentHeight = document.body.clientHeight;
      const realWidth = width.value || originalWidth.value;
      const realHeight = height.value || originalHeight.value;
      const widthScale = currentWidth / realWidth;
      const heightScale = currentHeight / realHeight;
      dom.style.transform = `scale(${widthScale}, ${heightScale})`;
    };
    const onResize = debounce(async () => {
      await initSize();
      updateScale();
    }, 100);
    onMounted(async () => {
      context = getCurrentInstance();
      await initSize();
      updateSize();
      updateScale();
      window.addEventListener("resize", onResize);
      ready.value = true;
    });
    onUnmounted(() => {
      window.removeEventListener("resize", onResize);
    });
    return {
      ready,
    };
  },
};
</script>

<style scoped lang="scss">
#datav-container {
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 999;
  transform-origin: left top;
}
</style>
