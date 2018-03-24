<template>
	<div class="order-wrap">
		<div class="order-list-choose">
			<div class="order-list-option">
				选择产品：
				<v-selection :selections="products" @on-change="productChange"></v-selection>
			</div>
			<div class="order-list-option">
				开始日期：
				<input type="text" name="" id="" value="" />
				<!--<v-date-picker></v-date-picker>-->
			</div>
			<div class="order-list-option">
				结束日期：
				<input type="text" name="" id="" value="" />
			</div>
			<div class="order-list-option">
				关键词：
				<input type="text" name="" v-model="query" id="" value="" />
			</div>
		</div>
		<div class="order-list-table">
			<table>
				<tr>
					<th v-for="head in tableHeads" @click="changeOrder(head)" :class="{active:head.active}">{{head.label}}</th>
				</tr>
				<tr v-for="item in tableData">
					<td v-for="head in tableHeads">
						<!--先循环表格数据，在循环表头数据，表头数据有个key字段，赋给表格数据-->
						{{item[head.key]}}
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import lodash from "lodash";
import vSelection from "../components/base/selection";
import { mapGetters, mapState } from "vuex";
//	import vDatePicker from '../components/base/datepicker'
export default {
  components: {
    vSelection
  },
  data() {
    return {
      query: "",
      productId: 0,
      currentOrder: "desc",
      tableData: [],
      products: [
        {
          label: "数据统计",
          value: 0
        },
        {
          label: "数据预测",
          value: 1
        },
        {
          label: "流量分析",
          value: 2
        },
        {
          label: "广告发布",
          value: 3
        }
      ],
      tableHeads: [
        {
          label: "订单号",
          key: "orderId"
        },
        {
          label: "购买产品",
          key: "product"
        },
        {
          label: "版本类型",
          key: "version"
        },
        {
          label: "有效时间",
          key: "period"
        },
        {
          label: "购买日期",
          key: "date"
        },
        {
          label: "数量",
          key: "buyNum"
        },
        {
          label: "总价",
          key: "amount"
        }
      ]
    };
  },
  watch: {
    query() {
      this.getTableData();
    }
  },
  methods: {
    productChange(obj) {
      //同步的数据通过commit
      this.$store.commit("updateParams", {
        key: "productId",
        val: obj.value
      });
      //异步的数据通过dispatch
      this.$store.dispatch("fetchOrderList");
      //				this.productId = obj.value;
      //				this.getTableData()
    },
    getTableData() {
      let reqParams = {
        query: this.query,
        productId: this.productId
      };
      axios.get("/static/db.json", reqParams).then(
        res => {
          this.tableData = res.data.getOrderList.list;
        },
        error => {}
      );
    },
    changeOrder(headItem) {
      //				.map将对象转为真正的Map结构。
      this.tableHeads.map(item => {
        //					vue自带的一个active属性，点击当前这个，把其他的active属性去掉
        item.active = false;
        return item;
      });
      //				给当前点击的这个添加active
      headItem.active = true;
      //				lodash自带的排序方法
      if (this.currentOrder === "asc") {
        this.currentOrder = "desc";
      } else if (this.currentOrder === "desc") {
        this.currentOrder = "asc";
      }
      //				lodash自带的排序方法，第一个参数是要排序的数组，第二个参数是根据哪一个列排序，第三个是排序的方式， 正序或倒序的方法
      this.tableData = _.orderBy(
        this.tableData,
        headItem.key,
        this.currentOrder
      );
    }
  },
  mounted() {
    this.$store.dispatch("fetchOrderList");
    //一进入页面就调用列表数据，不然则是空的
    this.getTableData();
  },
  computed: {
    ...mapState({
      language: state => state.orderList.language
    })
  }
};
</script>

<style scoped>
.order-wrap {
  width: 1200px;
  min-height: 800px;
  margin: 20px auto;
  overflow: hidden;
}

.order-wrap h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}

.order-query {
  height: 25px;
  line-height: 25px;
  border: 1px solid #e3e3e3;
  outline: none;
  text-indent: 10px;
}

.order-list-option {
  display: inline-block;
  padding-left: 15px;
}

.order-list-option:first-child {
  padding-left: 0;
}

.order-list-table {
  margin-top: 20px;
}

.order-list-table table {
  width: 100%;
  background: #fff;
}

.order-list-table td,
.order-list-table th {
  border: 1px solid #e3e3e3;
  text-align: center;
  padding: 10px 0;
}

.order-list-table th {
  background: #4fc08d;
  color: #fff;
  border: 1px solid #4fc08d;
  cursor: pointer;
}

.order-list-table th.active {
  background: #35495e;
}
</style>