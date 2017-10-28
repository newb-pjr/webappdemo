<template>
	<div class="order-wrap">
    <h3>您的产品</h3>
    <div class="order-list-choose">
      <div class="order-list-option">
        选择产品：
        <v-selection :dataList="products" @on-select="getProductId"></v-selection>
      </div>

      <div class="order-list-option">
        开始日期：
        <v-date-picker @on-change="startDateChange"></v-date-picker>
      </div>

      <div class="order-list-option">
        结束日期：
        <v-date-picker @on-change="endDateChange"></v-date-picker>
      </div>

      <div class="order-list-option">
        关键词：
        <input type="text" v-model.lazy="query" class="order-query">
      </div>
    </div>
    <div class="order-list-table">
     <table>
        <tr>
          <th v-for="item in tableHeads">{{item.label}}</th>
        </tr>
        <tr v-for="list in dataTable">
          <td v-for="item in tableHeads">{{list[item.key]}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import vSelection from '../components/base/selection'
import vDatePicker from '../components/base/datepicker'
export default {
	components: {
		vSelection,
    vDatePicker
	},
	data () {
		return {
      productId: 0,
      dataTable: [],
      query: '',
      startDate: '',
      endDate: '',
			products: [
		        {
		          label: '数据统计',
		          value: 0
		        },
		        {
		          label: '数据预测',
		          value: 1
		        },
		        {
		          label: '流量分析',
		          value: 2
		        },
		        {
		          label: '广告发布',
		          value: 3
		        }
		    ],
        tableHeads: [
          {
            label: '订单号',
            key: 'orderId'
          },
           {
            label: '版本类型',
            key: 'version'
          },
          {
            label: '购买产品',
            key: 'product'
          },
          {
            label: '有效时间',
            key: 'period'
          },
          {
            label: '购买日期',
            key: 'date'
          },
          {
            label: '数量',
            key: 'buyNum'
          },
          {
            label: '总价',
            key: 'amount'
          }
        ],
		}
	},
  watch: {
    query () {
      this.getTableData()
    }
  },
  methods: {
    startDateChange (date) {
      this.startDate = date
      this.getTableData()
    },
    endDateChange (date) {
      this.endDate = date
      this.getTableData()
    },
    getProductId (data) {
      this.productId = data.value
      this.getTableData()
    },
    getTableData () {
      this.$http.post('../api/getOrderList',{
        product: this.productId,
        startDate: this.startDate,
        endDate: this.endDate,
        query: this.query
      }).then((resp)=>{
        this.dataTable = resp.data.list
      },(err)=>{
        console.log(err)
      })
    }
  },
  mounted () {
    this.getTableData()
    console.log(this.$store)
  }
}
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