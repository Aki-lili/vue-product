
<template>
  <div class="index-wrap">
    <div class="index-left">
      <div class="index-left-block all-page">
        <h2>所有产品</h2>
        <!--全部产品区域使用template模板-->
        <template v-for="product in productList">
          <h3>{{product.title}}</h3>
          <ul>
            <li v-for="item in product.list" @click="routerPush(item.url)">
              <a>{{item.name}}</a>
              <span v-if="item.hot" class="hot-tag">HOT</span>
            </li>
          </ul>
          <div class="hr" v-if="!product.last"></div>
        </template>
      </div>
      <div class="index-left-block lastest-news">
        <h2>最新报道</h2>
        <ul>
          <li v-for="(item,index) in getNewsList">
            <a :href="item.url" class="new-item" target="_blank">{{index+1}}. {{item.title}}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="index-right">
      <!--首页轮播图--slides数据/inv轮播图自动轮播时间可通过父组件设置-->
      <slide-Show :slides="slides" :inv="slideSpeed" @on-change="dosomeingOnchange"></slide-Show>
      <div class="index-board-list">
        <div class="index-board-item" v-for="(item,index) in boardList" :class="[{'line-last' : index % 2 !== 0}, 'index-board-' + item.id]">
          <div class="index-board-item-inner">
            <h2>{{item.title}}</h2>
            <p>{{item.description}}</p>
            <div class="index-board-button">
              <!--根据boardList的tokey跳转至detail详情页购买页-->
              <router-link class="button" tag="button" :class="index==1?'button-hover':''" :disabled="index==1?false:true" :to="{path:'detail/'+item.toKey}">立即购买</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import slideShow from "../components/slideShow";
export default {
  components: {
    slideShow
  },
  data() {
    return {
      locale: "en",
      hello: this.$t("message.hello"),
      slideSpeed: 3000,
      getNewsList: [],
      slides: [
        {
          src: require("../assets/slideShow/pic1.jpg"),
          //使用require，在项目被打包以后，webpake会自动解析找到图片的地址，图片通过js引入到页面就需要用require，直接在template或者css使用图片不需要使用require
          title: "1",
          href: "detail/count"
        },
        {
          src: require("../assets/slideShow/pic2.jpg"),
          title: "xxx2",
          href: "detail/forecast"
        },
        {
          src: require("../assets/slideShow/pic3.jpg"),
          title: "xxx3",
          href: "detail/analysis"
        },
        {
          src: require("../assets/slideShow/pic4.jpg"),
          title: "xxx4",
          href: "detail/publish"
        }
      ],
      boardList: [
        {
          title: "开放产品",
          description: "开放产品是一款开放产品",
          id: "car",
          toKey: "count",
          saleout: false
        },
        {
          title: "品牌营销",
          description: "品牌营销帮助你的产品更好地找到定位",
          id: "earth",
          toKey: "analysis",
          saleout: false
        },
        {
          title: "使命必达",
          description: "使命必达快速迭代永远保持最前端的速度",
          id: "loud",
          toKey: "forecast",
          saleout: true
        },
        {
          title: "勇攀高峰",
          description: "帮你勇闯高峰，到达事业的顶峰",
          id: "hill",
          toKey: "publish",
          saleout: false
        }
      ],
      productList: {
        pc: {
          title: "PC产品",
          list: [
            {
              name: "数据统计",
              url: "statistics"
            },
            {
              name: "数据预测",
              url: "forecast"
            },
            {
              name: "流量分析",
              url: "analysis",
              hot: true
            },
            {
              name: "广告发布",
              url: "advertising"
            }
          ]
        },
        app: {
          title: "手机应用类",
          last: true,
          list: [
            {
              name: "91助手",
              url: "statistics"
            },
            {
              name: "产品助手",
              url: "forecast",
              hot: true
            },
            {
              name: "智能地图",
              url: "analysis"
            },
            {
              name: "团队语音",
              url: "advertising"
            }
          ]
        }
      }
    };
  },
  mounted() {
    //			axios请求最新消息数据
    axios
      .all([axios.get("/static/db.json")])
      .then(
        axios.spread(response => {
          if (response.data) {
            this.getNewsList = response.data.getNewsList;
          }
        })
      )
      .catch(error => {
        console.log("数据未获取到");
      });
  },
  methods: {
    dosomeingOnchange() {
      //这是子组件slideShow通过this.$emit传过来的事件及参数，监听子组件的变化，可以根据子组件传过来的参数做一些操作;
    }
  },
  watch: {
    locale(val) {
      this.$i18n.locale = val;
    }
  },
  created() {}
};
</script>
<style scoped>

</style>
<style scoped="scoped">
.index-wrap {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
}

.index-left {
  float: left;
  width: 300px;
  text-align: left;
}

.index-right {
  float: left;
  width: 900px;
}

.index-left-block {
  margin: 15px;
  background: #fff;
  box-shadow: 0 0 1px #ddd;
}

.index-left-block .hr {
  margin-bottom: 20px;
}

.index-left-block h2 {
  background: #4fc08d;
  color: #fff;
  padding: 10px 15px;
  margin-bottom: 15px;
}

.index-left-block h3 {
  padding: 0 15px 5px 15px;
  font-weight: bold;
  color: #222;
}

.index-left-block ul {
  padding: 10px 15px;
}
.index-left-block li {
  padding: 5px;
}
.all-page li {
  cursor: pointer;
  transition: all 0.4s ease;
  padding: 5px;
}
.all-page li:hover {
  transform: translate(10px);
  transition: all 0.4s ease;
  color: #f40;
}
.index-board-list {
  overflow: hidden;
}

.index-board-item {
  float: left;
  width: 400px;
  background: #fff;
  box-shadow: 0 0 1px #ddd;
  padding: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
}
.index-board-item-inner {
  min-height: 125px;
  padding-left: 120px;
}

.index-board-car .index-board-item-inner {
  background: url(../assets/images/1.png) no-repeat;
}

.index-board-loud .index-board-item-inner {
  background: url(../assets/images/2.png) no-repeat;
}

.index-board-earth .index-board-item-inner {
  background: url(../assets/images/3.png) no-repeat;
}

.index-board-hill .index-board-item-inner {
  background: url(../assets/images/4.png) no-repeat;
}

.index-board-item h2 {
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin-bottom: 15px;
}

.line-last {
  margin-right: 0;
}

.index-board-button {
  margin-top: 20px;
}

.lastest-news {
  min-height: 512px;
}

.hot-tag {
  background: red;
  color: #fff;
}

.new-item {
  display: inline-block;
  width: 230px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.new-item:hover {
  color: #f40;
}
</style>