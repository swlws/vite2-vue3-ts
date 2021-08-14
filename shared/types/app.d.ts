// 泛型工具
// Partial<T> 将类型T（对象）中的KEY变为可选
// Requied<T> 将类型T（对象）中的KEY变为必须
// Record<K, T> 定义KEY、value的类型
// Pick<T, K> 提取对象T中的部分K，形成新的对象类型
// Omit<T, K> 去除对象T中的部分K，形成新的对象类型
// Exclude<T, U> 去除T与U交集的部分，返回剩余的T
// ReturnType<T> 获取 T 类型(函数)对应的返回值类型：

/**
 * 普通对象
 */
export type PlainObject = Record<string, any>;
