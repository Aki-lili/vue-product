<template>
  <div @click="resetComponent">
    <div class="app-head">
      <div class="app-head-inner">
        <!-- <router-link :to="{path:'/'}"><img src="../assets/images/1.png" style="margin-left: 16px;" /></router-link> -->
        <router-link :to="{path:'/'}">
          <div class="div"></div>
        </router-link>
        <div class="head-nav">
          <ul class="nav-list">
            <li>{{username}}</li>
            <li v-if="username !== ''" class="nav-pile">|</li>
            <li v-if="username === ''" @click="loginClick">{{$t('message.login')}}</li>
            <li v-if="username !== ''" @click="quitClick">{{$t('message.signOut')}}</li>
            <li class="nav-pile">|</li>
            <li v-if="username === ''" @click="registerClick">{{$t('message.signUp')}}</li>
            <li v-if="username === ''" class="nav-pile">|</li>
            <li @click="aboutClick">{{$t('message.about')}}</li>
            <template>
              <li style="margin-left: 30px;color: #4fc08d;" @click="changeLan">{{langName}}</li>
              <!-- <li class="nav-pile">|</li>
              <li>EN</li> -->
            </template>
          </ul>
        </div>
      </div>
    </div>
    <!--内容部分-->
    <div class="app-content">
      <keep-alive>
        <!--keep-alive 单页面应用缓存，把访问过的页面进行缓存-->
        <router-view></router-view>
      </keep-alive>
    </div>
    <div class="app-foot">@ 2016 fishenal MIT</div>
    <!--isShow组件dialog传过来的，type = Boolean-->
    <my-dialog :isShow="isShowLogintDialog" @on-close="closeDialog('isShowLogintDialog')">
      <log-form @has-log="onSuccessLog"></log-form>
    </my-dialog>

    <my-dialog :isShow="isShowRebisterDialog" @on-close="closeDialog('isShowRebisterDialog')">
      <reg-form></reg-form>
    </my-dialog>

    <my-dialog :isShow="isShowAboutDialog" @on-close="closeDialog('isShowAboutDialog')">
      <p>本报告在调研数据的基础上，采用定性与定量相结合的方式深入分析了专车市场发展的驱动因素与阻碍因素、专车市场背后的产业格局、专车企业的竞争格局、用户对专车市场的依赖程度、专车对其他交通工具运力的补充效应等，通过这五个章节的研究反映专车市场的发展态势和面临的问题。报告力求客观、深入、准确地反映中国专车市场发展情况，为政府、企事业单位和社会各界提供决策依据。 </p>
    </my-dialog>
  </div>

</template>

<script>
//作为一个被赋值的变量，引用使用花括号
import { mapState } from "vuex";
import { eventBus } from "../eventBus";
import Dialog from "./base/dialog";
import LogForm from "./logForm";
import RegForm from "./regForm";
export default {
  components: {
    myDialog: Dialog,
    LogForm,
    RegForm
  },
  data() {
    return {
      isShowLogintDialog: false,
      isShowRebisterDialog: false,
      isShowAboutDialog: false,
      username: ""
    };
  },
  computed: {
    ...mapState({
      language: state => state.orderList.language
    }),
    langName() {
      return this.language == "zh-CN" ? "English" : "中文";
    }
  },
  methods: {
    changeLan() {
      if (this.language == "EN") {
        this.$i18n.locale = "zh-CN";
        this.$store.dispatch("setLanguage", "zh-CN");
      } else {
        this.$i18n.locale = "EN";
        this.$store.dispatch("setLanguage", "EN");
      }
    },
    loginClick() {
      this.isShowLogintDialog = true;
    },
    registerClick() {
      this.isShowRebisterDialog = true;
    },
    aboutClick() {
      this.isShowAboutDialog = true;
    },
    closeDialog(attr) {
      this[attr] = false;
    },
    onSuccessLog(data) {
      this.closeDialog("isShowLogintDialog");
      this.username = data.username;
    },
    quitClick() {
      alert("确定要退出吗？");
      this.username = "";
    },
    resetComponent() {
      eventBus.$emit("reset-component");
    }
  }
};
</script>

<style>
/* http://meyerweb.com/eric/tools/css/reset/ 
	   v2.0 | 20110126
	   License: none (public domain)
	*/

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */

article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}

body {
  line-height: 1;
}

ol,
ul {
  list-style: none;
}

blockquote,
q {
  quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

a {
  color: inherit;
  cursor: pointer;
  text-decoration: none;
}

body {
  background: #f0f2f5;
  font-family: "Helvetica Neue", Helvetica, Arial, "Hiragino Sans GB",
    "Hiragino Sans GB W3", "Microsoft YaHei UI", "Microsoft YaHei",
    "WenQuanYi Micro Hei", sans-serif;
  font-size: 14px;
  color: #444;
}

.app-head {
  background: #363636;
  color: #b2b2b2;
  height: 80px;
  line-height: 80px;
  width: 100%;
}

.app-head-inner {
  width: 1200px;
  margin: 0 auto;
}

.head-logo {
  float: left;
}

.app-head-inner img {
  width: 50px;
  margin-top: 20px;
}

.head-nav {
  float: right;
  margin-right: 20px;
}

.head-nav ul {
  overflow: hidden;
}

.head-nav li {
  cursor: pointer;
  float: left;
}

.nav-pile {
  padding: 0 10px;
}

.app-foot {
  text-align: center;
  height: 80px;
  width: 100%;
  line-height: 80px;
  background: #e3e4e8;
  clear: both;
  margin-top: 30px;
}

.container {
  width: 1200px;
  margin: 0 auto;
}

.hr {
  height: 1px;
  width: 100%;
  background: #ddd;
}

.button {
  background: #4fc08d;
  color: #fff;
  display: inline-block;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.4s ease;
  border: 1px solid #4fc08d;
}
.button-hover:hover {
  transition: all 0.4s ease;
  background: #fff;
  color: #444;
  border: 1px solid #4fc08d;
}

.g-form-line {
  padding: 15px 0;
}

.g-form-label {
  width: 100px;
  font-size: 16px;
  display: inline-block;
}

.g-form-input {
  display: inline-block;
}

.g-form-input input {
  height: 30px;
  width: 200px;
  line-height: 30px;
  vertical-align: middle;
  padding: 0 10px;
  border: 1px solid #ccc;
}

.g-form-btn {
  padding-left: 100px;
}

.g-form-error {
  color: red;
  padding-left: 15px;
}

.div {
  float: left;
  width: 84px;
  height: 80px;
  margin-left: 20px;
  background: url(http://www.uc.cn/images1_4/sprite_uc_android.png);
}

.div:hover {
  animation: myMove steps(11) 0.6s forwards;
}

@keyframes myMove {
  100% {
    background-position: -1100px;
  }
}
.build-page {
  width: 100%;
  height: calc(100vh - 190px);
  position: relative;
  margin: 0 auto;
  padding: 100px 0;
  box-sizing: border-box;
  text-align: center;
}
.back {
  margin: 20px;
}
.back:hover {
  color: rgb(79, 192, 141);
}
</style>