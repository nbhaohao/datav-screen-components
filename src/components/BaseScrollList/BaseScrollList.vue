<template>
  <div class="base-scroll-list" :id="id">
    <div
      class="base-scroll-list-header"
      :style="{
        backgroundColor: config.headerBg,
        height: `${config.headerHeight}px`,
      }"
    >
      <div
        class="header-item base-scroll-list-text"
        v-for="(headerItem, i) in headerData"
        :key="headerItem + i"
        :style="headerStyle[i]"
        v-html="headerItem"
      ></div>
    </div>
    <div class="base-scroll-list-rows"></div>
  </div>
</template>

<script>
import { onMounted, ref, reactive } from "vue";
import { v4 as uuidV4 } from "uuid";
import useScreen from "../../hooks/useScreen";
import cloneDeep from "lodash/cloneDeep";
import assign from "lodash/assign";
export default {
  name: "BaseScrollList",
  props: {
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const id = `base-scroll-list-${uuidV4()}`;
    const { width, height } = useScreen(id);
    const DEFAULT_CONFIG = {
      header: [],
      headerStyle: [],
      headerBg: "rgb(90,90,90)",
      headerHeight: 35,
      headerIndex: false,
      headerIndexContent: "#",
      headerIndexStyle: {},
    };
    const actualConfig = ref({});
    const headerData = ref([]);
    const headerStyle = ref([]);
    const handleHeader = (config) => {
      const _headerData = cloneDeep(config.header);
      const _headerStyle = cloneDeep(config.headerStyle);
      if (_headerData.length === 0) {
        return;
      }
      if (config.headerIndex) {
        _headerData.unshift(config.headerIndexContent);
        _headerStyle.unshift(config.headerIndexStyle);
      }
      headerData.value = _headerData;
      headerStyle.value = _headerStyle;
    };
    onMounted(() => {
      const _actualConfig = assign(DEFAULT_CONFIG, props.config);
      handleHeader(_actualConfig);
      actualConfig.value = _actualConfig;
    });
    return {
      id,
      headerData,
      headerStyle,
    };
  },
};
</script>

<style scoped lang="scss">
.base-scroll-list {
  width: 100%;
  height: 100%;
  .base-scroll-list-text {
    padding: 0 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    box-sizing: border-box;
  }
  .base-scroll-list-header {
    display: flex;
    font-size: 15px;
    align-items: center;
    .header-item {
    }
  }
}
</style>
