import Vue from 'vue'
import Vuex from 'vuex'
//引入vuex，因为需要使用vue的use方法
Vue.use(Vuex)
import orderList from './modules/orderList'
//使用Vuex的Store方法
export default new Vuex.Store({
	modules:{
		orderList
	}
})
//再去main.js里面引入store



