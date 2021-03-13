<template>
  <div class="base-scroll-list" :id="id">
    <div
      class="base-scroll-list-header"
      :style="{
        backgroundColor: actualConfig.headerBg,
        height: `${actualConfig.headerHeight}px`,
      }"
    >
      <div
        class="header-item base-scroll-list-text"
        v-for="(headerItem, i) in headerData"
        :key="headerItem + i"
        :style="{
          width: `${columnWidths[i]}px`,
          textAlign: aligns[i],
          fontSize: `${actualConfig.headerFontSize}px`,
          color: actualConfig.headerColor,
          ...headerStyle[i],
        }"
        v-html="headerItem"
      ></div>
    </div>
    <div
      class="base-scroll-list-rows-wrapper"
      :style="{ height: `${height - actualConfig.headerHeight}px` }"
    >
      <div
        class="base-scroll-list-rows"
        v-for="(rowData, index) in currentRowData"
        :key="rowData.rowIndex"
        :style="{
          height: `${rowHeights[index]}px`,
          lineHeight: `${rowHeights[index]}px`,
          backgroundColor:
            rowData.rowIndex % 2 === 0
              ? actualConfig.rowBg[1]
              : actualConfig.rowBg[0],
        }"
      >
        <div
          class="base-scroll-list-columns base-scroll-list-text"
          v-for="(colData, colIndex) in rowData.data"
          v-html="colData"
          :key="colIndex"
          :style="{
            width: `${columnWidths[colIndex]}px`,
            textAlign: aligns[colIndex],
            fontSize: `${actualConfig.rowFontSize}px`,
            color: actualConfig.rowColor,
            ...rowStyle[colIndex],
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { v4 as uuidV4 } from "uuid";
import useScreen from "../../hooks/useScreen";
import assign from "lodash/assign";
import cloneDeep from "lodash/cloneDeep";
import { DEFAULT_CONFIG, handleHeader, handleRowsHeight, sleep } from "./utils";

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
    const actualConfig = ref({});
    const headerData = ref([]);
    const headerStyle = ref([]);
    const rowStyle = ref([]);
    const columnWidths = ref([]);
    const rowHeights = ref([]);
    const rowsData = ref([]);
    const currentRowData = ref([]);
    const currentIndex = ref(0);
    const rowNum = ref(0);
    const aligns = ref([]);

    let avgHeight = 0;

    const initList = (config) => {
      const {
        columnWidths: _columnWidths,
        headerData: _headerData,
        headerStyle: _headerStyle,
        rowsData: _rowsData,
        rowStyle: _rowStyle,
        aligns: _aligns,
      } = handleHeader({
        config,
        width,
      });
      columnWidths.value = _columnWidths;
      headerData.value = _headerData;
      headerStyle.value = _headerStyle;
      if (
        _rowsData.length >= config.rowNum &&
        _rowsData.length < config.rowNum * 2
      ) {
        rowsData.value = _rowsData.concat(_rowsData).map((item, index) => ({
          data: item,
          rowIndex: index,
        }));
      } else {
        rowsData.value = _rowsData.map((item, index) => ({
          data: item,
          rowIndex: index,
        }));
      }
      rowStyle.value = _rowStyle;
      aligns.value = _aligns;
      rowNum.value =
        config.rowNum > rowsData.value.length
          ? rowsData.value.length
          : config.rowNum;
    };
    const initRowsHeight = (config) => {
      const {
        rowHeights: _rowHeights,
        avgHeight: _avgHeight,
      } = handleRowsHeight({
        config,
        height,
        rowNum: rowNum.value,
      });
      rowHeights.value = _rowHeights;
      avgHeight = _avgHeight;
    };

    const startAnimation = async (config, avgHeight) => {
      const { rowNum, moveNum, duration } = config;
      const totalLength = rowsData.value.length;
      if (totalLength < rowNum) {
        return;
      }
      const index = currentIndex.value;
      const _rowsData = cloneDeep(rowsData.value);
      // 根据 index 重新连接数据
      // [a, b, c, d, e, f, g]  index = 1
      // [b, c, d, e, f, g, a]
      currentRowData.value = _rowsData
        .slice(index)
        .concat(_rowsData.slice(0, index));
      rowHeights.value = new Array(totalLength).fill(avgHeight);
      const waitTime = 300;
      await sleep(waitTime);
      rowHeights.value.splice(0, moveNum, ...new Array(moveNum).fill(0));
      currentIndex.value += moveNum;
      const isLast = currentIndex.value - totalLength;
      if (isLast >= 0) {
        currentIndex.value = isLast;
      }
      await sleep(duration - waitTime);
      await startAnimation(config, avgHeight);
    };

    onMounted(() => {
      const _actualConfig = assign(DEFAULT_CONFIG, props.config);
      initList(_actualConfig);
      initRowsHeight(_actualConfig);
      actualConfig.value = _actualConfig;
      startAnimation(actualConfig.value, avgHeight);
    });
    return {
      id,
      headerData,
      headerStyle,
      columnWidths,
      rowHeights,
      rowsData,
      currentRowData,
      rowStyle,
      aligns,
      actualConfig,
      height,
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
  .base-scroll-list-rows-wrapper {
    overflow: hidden;
    .base-scroll-list-rows {
      display: flex;
      align-items: center;
      transition: all 0.3s linear;
      .base-scroll-list-columns {
        font-size: 28px;
        height: 100%;
      }
    }
  }
}
</style>
