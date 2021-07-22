import { HttpResponse, useApiModule } from '~/api';

let apiModules = useApiModule();

let APP_APIS = apiModules.app;

if (!APP_APIS) {
  throw new Error('Api Module Occur Error');
}

/**
 * 获取应用信息
 *
 * @returns
 */
export function getAppInfo() {
  return APP_APIS.getAppInfo().then((res: HttpResponse) => {
    if (res && res.r0 === 0) return res.res;

    return {};
  });
}
