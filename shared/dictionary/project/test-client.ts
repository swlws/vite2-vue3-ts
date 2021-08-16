import { ModuleItem } from '../type';

export const PERSION_MODULE = 'persion_module';
const persion_module: ModuleItem[] = [
  {
    key: 'sex',
    label: '性别',
    options: [
      {
        key: 1,
        label: '男性',
      },
      {
        key: 2,
        label: '女性',
      },
    ],
  },
];

const modules: Record<string, ModuleItem[]> = {
  [PERSION_MODULE]: persion_module,
};
export default modules;
