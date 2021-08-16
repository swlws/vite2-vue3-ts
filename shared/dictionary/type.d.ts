export type DicOption = {
  key: string | number | boolean;
  label: string;
  icon?: string;
  color?: string;
  aside?: string;
};

export type ModuleItem = {
  key: string;
  label: string;
  options: DicOption[];
};
