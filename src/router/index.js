import Vue from 'vue'
import Router from 'vue-router'

//Layout首页头部&&尾部组件
import Layout from '@/components/layout'

//index首页内容
import IndexPage from '@/page/index'
import orderListPage from '@/page/orderList'
import statisticsPage from '@/page/statistics'
import forecastPage from '@/page/forecast'
import analysisPage from '@/page/analysis'
import advertisingPage from '@/page/advertising'
//測試
import languagePage from '@/page/language'
//detail详情页
import DetailPage from '@/page/detail'

//detail详情页左侧导航内容
import DetailAnaPage from '@/page/detail/analysis'
import DetailCouPage from '@/page/detail/count'
import DetailForPage from '@/page/detail/forecast'
import DetailPubPage from '@/page/detail/publish'

Vue.use(Router)

export default new Router({
  mode: 'history', //http://localhost:8080/#/Hello 哈希值配合redirect使用,去掉 地址栏的#/
  routes: [{
      path: '', //别名请不要用在path为’/’中，如下代码的别名是不起作用的。
      redirect: '/index' //路由重定向，进入页面默认是index页面,path值改为 * 
      //			redirect：仔细观察URL，redirect是直接改变了url的值，把url变成了真实的path路径。
      //			alias：URL路径没有别改变，这种情况更友好，让用户知道自己访问的路径，只是改变了<router-view>中的内容。
    },
    {
      path: '/index', //路由重定向index页之后， 要再定义一遍， 不然没有数据
      name: 'IndexPage',
      component: IndexPage,
    },
    {
      path: '/orderList',
      name: 'orderListPage',
      component: orderListPage
    },
    {
      path: '/statistics',
      name: 'statisticsPage',
      component: statisticsPage
    }, {
      path: '/forecast',
      name: 'forecastPage',
      component: forecastPage
    }, {
      path: '/analysis',
      name: 'analysisPage',
      component: analysisPage
    }, {
      path: '/advertising',
      name: 'advertisingPage',
      component: advertisingPage
    },
    {
      path: '/language',
      name: 'languagePage',
      component: languagePage
    },
    {
      path: '/detail',
      name: 'DetailPage',
      component: DetailPage,
      redirect: '/detail/count', //进入detail页面默认count
      children: [{
          path: 'analysis',
          name: 'DetailAnaPage',
          component: DetailAnaPage,
        },
        {
          path: 'count',
          name: 'DetailCouPage',
          component: DetailCouPage,
        },
        {
          path: 'forecast',
          name: 'DetailForPage',
          component: DetailForPage,
        },
        {
          path: 'publish',
          name: 'DetailPubPage',
          component: DetailPubPage,
        }
      ]
    }
  ]
})
