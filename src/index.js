import Test from "./components/Test";
import Icon from "./components/Icon";
import SvgAnimation from "./components/SvgAnimation";
import DataVLoading from "./components/DataVLoading";
import DataVFlyBox from "./components/DataVFlyBox";
export default (Vue) => {
  Vue.use(Test);
  Vue.use(Icon);
  Vue.use(SvgAnimation);
  Vue.use(DataVLoading);
  Vue.use(DataVFlyBox);
};
