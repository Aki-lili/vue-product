//eventBus的 $emit $on 可实现组件之间的信息自由传递

import Vue from 'vue'
const eventBus = new Vue()
//作为一个被赋值的变量，导出使用花括号
export { eventBus }
