import cloneDeep from "lodash/cloneDeep";

export const DEFAULT_CONFIG = {
  header: [],
  headerStyle: [],
  rowStyle: [],
  headerBg: "rgb(90,90,90)",
  headerHeight: 35,
  headerIndex: false,
  headerIndexContent: "#",
  headerIndexStyle: {
    width: "50px",
  },
  rowIndexStyle: {},
  data: [],
  rowNum: 10,
  rowBg: ["rgb(40,40,40)", "rgb(55,55,55)"],
  aligns: ["center", "center"],
  headerFontSize: 28,
  rowFontSize: 28,
  headerColor: "#fff",
  rowColor: "#000",
  moveNum: 1,
  duration: 2000,
};

const getAvgWidth = (dataArray, styleArray, width) => {
  const usedWidthInfo = styleArray.reduce(
    (prevValue, style) => {
      if (style.width) {
        return {
          width: prevValue.width + parseInt(style.width.replace("px", "")),
          used: prevValue.used + 1,
        };
      }
      return prevValue;
    },
    { width: 0, used: 0 }
  );
  return (
    (width.value - usedWidthInfo.width) /
    (dataArray.length - usedWidthInfo.used)
  );
};

export const handleHeader = ({ config, width }) => {
  const _headerData = cloneDeep(config.header);
  const _headerStyle = cloneDeep(config.headerStyle);
  const _rowStyle = cloneDeep(config.rowStyle);
  const _rowsData = cloneDeep(config.data || []);
  const _aligns = cloneDeep(config.aligns);
  if (_headerData.length === 0) {
    return;
  }
  if (config.headerIndex) {
    _headerData.unshift(config.headerIndexContent);
    _headerStyle.unshift(config.headerIndexStyle);
    _rowStyle.unshift(config.rowIndexStyle);
    _aligns.unshift("center");
    _rowsData.forEach((rows, index) => rows.unshift(index + 1));
  }
  const avgWidth = getAvgWidth(_headerData, _headerStyle, width);
  const columnWidths = new Array(_headerData.length).fill(avgWidth);
  _headerStyle.forEach((style, index) => {
    if (style.width) {
      columnWidths[index] = +style.width.replace("px", "");
    }
  });
  return {
    columnWidths,
    headerData: _headerData,
    headerStyle: _headerStyle,
    rowsData: _rowsData,
    rowStyle: _rowStyle,
    aligns: _aligns,
  };
};

export const handleRowsHeight = ({ config, height, rowNum }) => {
  const { headerHeight } = config;
  const unusedHeight = height.value - headerHeight;
  const avgHeight = unusedHeight / rowNum;
  return {
    rowHeights: new Array(rowNum).fill(avgHeight),
    avgHeight,
  };
};

export const sleep = (duration) =>
  new Promise((resolve) => setTimeout(resolve, duration));
