import axios from 'axios'
import * as types from './types'
//state 存放数据
const state = {
	orderList: [],
	params: {},
	language: 'EN',
}
//页面没办法直接调用state值，必须通过getters
const getters = {
	getOrderList: state => state.orderList,//赋值为传进来的orderList数据
	language: state => state.language
}
//actions是一个可以进行异步的操作
const actions = {
	fetchOrderList({ commit, state }) {
		//commit是用来调用mutations的 
		//state获取状态里面的数据
		axios.get('/static/db.json', state.params)
			.then((res) => {
				commit('updateOrderList', res.data.list)
			}, (err) => {
				console.log(err)
			})
	},
	setLanguage({ commit }, val) {
		commit('LANGUAGE', val)
	}
}
//mutations进行同步的操作
const mutations = {
	//只允许mutations对state进行更改，不允许actions对state直接进行更改，所以在actions里面使用commit方法
	updateOrderList(state, playLoad) {
		console.log(state.orderList, playLoad)
		state.orderList = playLoad
	},
	updateParams(state, { key, val }) {
		//参数payLoad里面自带的key value两个字段，通过解构赋值参数写成{key,val}
		state.params[key] = val
	},
	[types.LANGUAGE](state, val) {
		state.language = val
	}
}
//模块全部输出注册才能使用
export default {
	state,
	getters,
	actions,
	mutations
}