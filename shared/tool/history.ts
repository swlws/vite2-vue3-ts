import { Dep, Watch } from './pub-sub';
const isDevelopment = import.meta.env.MODE === 'development';

const historyChangeHandler = () => {
  console.log(`Current Href: ${location.href}`);
};

/**
 * onpopstate可以监听history.back()、history.go()、history.forward()
 */
if (isDevelopment) {
  let originOnPopState = window.onpopstate;
  window.onpopstate = function (...args) {
    historyChangeHandler();

    if (originOnPopState) {
      return (originOnPopState as any).apply(this, args);
    }
    return null;
  };
}

/**
 * 重写pushState、replaceState方法，监听路由变化
 */
type Func = (name: string) => (...args: any[]) => void;
const addHistoryMethod: Func = (function () {
  const historyDep = new Dep();
  return function (name: string) {
    if (name === 'historychange') {
      return function (fn: any) {
        const event = new Watch(name, fn);
        historyDep.add(event);
      };
    }

    // 重写pushState、replaceState
    if (name === 'pushState' || name === 'replaceState') {
      const method = history[name];
      return function (...args: any[]) {
        method.apply(history, args as any);
        historyDep.notify();
      };
    }

    return () => {};
  };
})();

if (isDevelopment) {
  const history = window.history as any;
  history.pushState = addHistoryMethod('pushState');
  history.replaceState = addHistoryMethod('replaceState');

  // 自定义响应路由的变化
  addHistoryMethod('historychange')(historyChangeHandler);
}
