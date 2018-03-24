<template>
	<div class="login-form">
		<div class="g-form">
			<div class="g-form-line">
				<span class="g-form-label">用户名：</span>
				<div class="g-form-input">
					<input type="text" v-model="usernameModel" placeholder="请输入用户名" name="" id="" value="" />
				</div>
				<span class="g-form-error">{{userErrors.errorText}}</span>
			</div>
			<div class="g-form-line">
				<span class="g-form-label">密码：</span>
				<div class="g-form-input">
					<input type="password" v-model="passwordModel" placeholder="请输入密码" name="" id="" value="" />
				</div>
				<span class="g-form-error">{{passwordErrors.errorText}}</span>
			</div>
			<div class="g-form-line">
				<div class="g-form-btn">
					<a class="button" @click="onLogin">登录</a>
				</div>
			</div>
			<span>{{errorText}}</span>
		</div>
	</div>
</template>

<script>
import axios from "axios";
export default {
  props: {},
  data() {
    return {
      usernameModel: "",
      passwordModel: "",
      errorText: ""
    };
  },
  computed: {
    userErrors() {
      //				定义局部状态及验证错误提示信息
      let errorText, status;
      console.log(status);
      if (!/@/g.test(this.usernameModel)) {
        status = false;
        errorText = "包含@";
      } else {
        status = true;
        errorText = "";
      }
      if (!this.userFlag) {
        (errorText = ""), (this.userFlag = true);
      }
      //局部定义变量返回值
      return {
        errorText,
        status
      };
    },
    passwordErrors() {
      let errorText, status;
      if (!/^\w{1,6}$/g.test(this.passwordModel)) {
        status = false;
        errorText = "密碼不是1-6位";
      } else {
        status = true;
        errorText = "";
      }
      if (!this.passwordFlag) {
        (errorText = ""), (this.passwordFlag = true);
      }
      return {
        errorText,
        status
      };
    }
  },
  methods: {
    onLogin() {
      if (!this.userErrors.status || !this.passwordErrors.status) {
        this.errorText = "格式不正确,请输入正确格式";
      } else {
        this.errorText = "";
        axios.get("/static/db.json").then(
          response => {
            //后台返回的用户信息
            this.$emit("has-log", response.data.login);
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  }
};
</script>

<style scoped>

</style>