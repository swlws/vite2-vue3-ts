import { getAppName } from '~/tool/env';
import { DicOption, ModuleItem } from './type';

type Module = Record<string, any>;

function getProject(name: string): Module | undefined {
  const ps = import.meta.globEager('./project/*.ts');

  for (let key in ps) {
    if (key.includes(name)) return ps[key];
  }

  return;
}

const cache = new Map<string, Record<string, ModuleItem[]>>();

/**
 * 获取工程的字典配置信息
 *
 * @returns
 */
function dicConfig(): Record<string, ModuleItem[]> | undefined {
  const name = getAppName();

  if (cache.has(name)) {
    return cache.get(name);
  }

  let m = getProject(name);
  if (!m) return;

  let cfg = m.default;
  cache.set(name, cfg);
  return cfg;
}

/**
 * 根据模块、字段，获取配置项
 *
 * @param module
 * @param field
 * @returns
 */
export function getFieldOptions(module: string, field: string): DicOption[] | undefined {
  let cfg = dicConfig();
  if (!cfg) return;

  let m: ModuleItem[] = cfg[module];
  let obj = m.find((item) => item.key === field);

  return obj?.options;
}

/**
 * 根据模块、字段，获取配置项
 *
 * @param module
 * @param field
 * @param value
 * @returns
 */
export function getFieldOption(
  module: string,
  field: string,
  value: number | string | boolean,
): DicOption | undefined {
  let options = getFieldOptions(module, field);

  if (!options) return;

  return options.find((item) => item.key === value);
}
