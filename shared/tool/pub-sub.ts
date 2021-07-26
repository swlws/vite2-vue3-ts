type Func = (...args: any[]) => {};

export interface Watch {
  constructor(name: string, fn: Func): void;
  name: string;
  fn: Func;
  update(): void;
}

/**
 * 订阅者
 */
export class Watch {
  constructor(name: string, fn: Func) {
    this.name = name;
    this.fn = fn;
  }

  update() {
    const fn = this.fn;
    if (!(typeof fn === 'function')) return;

    fn(this.name);
  }
}

/**
 * 发布者
 */
export interface Dep {
  constructor(): void;
  name: string;
  fn: Func;
  subs: Watch[];
}
export class Dep {
  constructor() {
    this.subs = [];
  }

  add(w: Watch) {
    this.subs.push(w);
  }

  notify() {
    this.subs.forEach((w) => {
      if (!(typeof w.update === 'function')) return;

      w.update.apply(w);
    });
  }
}
