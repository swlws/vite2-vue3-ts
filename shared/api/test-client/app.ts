import { getHttpBaseUrl } from '../../tool/env';

const BASE_URL = getHttpBaseUrl();

export default {
  /**
   * @api {get} /api/v1/app_info 001-获取应用信息
   * @apiVersion 0.0.1
   *
   * @apiDescription 获取应用信息
   * @apiGroup A-Application
   * @apiName getNetwork
   *
   * @apiSuccess {Number} r0
   * @apiSuccess {String} r1
   * @apiSuccess {Object} res
   * @apiSuccess {Object} res 响应体
   * @apiSuccess {String} res.name 应用名称
   *
   */
  getAppInfo: {
    url: `${BASE_URL}/v1/app_info`,
    method: 'get',
  },
};
