// window.onerror 运行时错误
// window.addEventListener("error") 资源加载错误
// window.addEventListener("unhandledrejection") Promise 没有 Catch错误
// try/catch 处理跨域脚本错误
// vue自身的错误捕获

import { time } from 'weblibext';
console.log('enable moniter');

const isObject = (s: any) => {
  return Object.prototype.toString.call(s) === '[oject Object]';
};

/**
 * 启动时，全局捕获错误事件
 *
 * @param event
 * @param source
 * @param lineno
 * @param colno
 * @param error
 */
window.onerror = (
  event: string | Event,
  source?: string | undefined,
  lineno?: number | undefined,
  colno?: number | undefined,
  error?: Error | undefined,
) => {
  console.error('window.onerror', error);
};

window.addEventListener('error', (err) => {
  console.log('Window Error Listener', err);
});

/**
 * Promise 异常处理
 */
window.addEventListener('unhandledrejection', (ev) => {
  if (isObject(ev)) {
    console.log(
      `未处理的 unhandledrejection 事件，Promise reject 抛出了普通对象，在附加信息中查看，${ev.reason}`,
    );

    return;
  }
  console.log('Window Unhandledrejection Listener', ev.reason);
});

/**
 * 跨域脚本错误：Script error
 * 劫持原生方法，使用try/catch，抛出错误
 *
 * TODO 存在问题，会导致事件注册紊乱。可能是this的原因
 */
// const orignAddEventListener = EventTarget.prototype.addEventListener;
// EventTarget.prototype.addEventListener = (
//   type: string,
//   listener: EventListenerOrEventListenerObject | null,
//   options?: boolean | AddEventListenerOptions | undefined,
// ) => {
//   const wrappedListener = (...args: any[]) => {
//     if (!listener) return;
//     try {
//       return (listener as any).apply(this, args);
//     } catch (err) {
//       throw err;
//     }
//   };
//   return orignAddEventListener.call(this, type, wrappedListener, options);
// };

// ******************用户行为-用户页面点击******************

const userOpListener = (eventName: string) => {
  return function (event: Event) {
    let target;
    try {
      target = event.target;
    } catch (e) {
      target = '<unknown>';
    }

    // TODO 上报数据
    console.log({
      eventName,
      time: time.parseTime(new Date()),
      target,
    });
  };
};
window.addEventListener('click', userOpListener('click'));
