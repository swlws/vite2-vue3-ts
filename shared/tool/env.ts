/**
 * 获取应用名称
 *
 * @returns
 */
export function getAppName() {
  let value = import.meta.env.VITE_APP_NAME;
  if (!value) {
    throw new Error(`The Environment Variable Does Not Exist: VITE_APP_NAME`);
  }

  console.log(`APP_NAME: ${value}`);
  return value;
}

/**
 * 获取应用标题
 *
 * @returns
 */
export function getAppTitle() {
  let value = import.meta.env.VITE_APP_TITLE;
  if (!value) {
    throw new Error(`The Environment Variable Does Not Exist: VITE_APP_TITLE`);
  }

  return value;
}

/**
 * REST接口的前缀
 *
 * @returns
 */
export function getHttpBaseUrl() {
  let value = import.meta.env.VITE_HTTP_BASE_URL;
  if (!value) {
    throw new Error(`The Environment Variable Does Not Exist: VITE_HTTP_BASE_URL`);
  }

  return value;
}
