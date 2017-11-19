var vm = new Vue({
    // 模型监听的范围对象
    el: "#app",
    // 模型数据
    data: {
        // title: "Hello Vue"
        totalMoney: 0,
        productList: [],
        ckeckAllFalg:false
    },
    // 局部过滤器
    filters: {
        // 对金额进行过滤,显示2位小数
        formatMoney: function (value) {
            return "$" + value.toFixed(2)
        }


    },
    // 编译完成后要使用到的某个方法
    mounted: function () {
        // 比如说我编译完成之后我需要去查询购物车的列表, 这个时候就需要使用这个方法
        this.cartView();
    },
    // 事件绑定的时候要使用的某个方法
    methods: {
        cartView: function () {
            //this.title = "zlj";
            var _this = this;
            this.$http.get("data/cartData.json", {"id": 123}).then(function (res) {
                _this.productList = res.data.result.list;
                _this.totalMoney = res.data.totalMoney
            });


            /*this.$ajax.get("data/cartData.json").then(function (res) {
                _this.productList = res.data.result.list;
                _this.totalMoney=res.data.result.totalMoney
            });*/


        },
        changeMoney:function ( product,way) {
            if (way >0) {
                // +
                product.productQuantity++
            }else {
                product.productQuantity--;
                if (product.productQuantity < 1) {
                    product.productQuantity=1
                }
            }
        },
        selectChecked:function (item) {
            if (typeof item.checked == 'undefined') {
                Vue.set(item,"checked",true)
            }else{
                item.checked =!item.checked
            }
            
        },
        checkAll:function (falg) {
            this.ckeckAllFalg=falg;
            var _this=this;
            this.productList.forEach(function (item, index) {
                if (typeof item.checked == 'undefined') {
                    Vue.set(item,"checked",_this.ckeckAllFalg)
                }else{
                    item.checked =_this.ckeckAllFalg;
                }
            })
            
        }

    }
});
// 使用全局过滤器
Vue.filter("money", function (value, type) {
    return "$" + value.toFixed(2) + type;
})


//Vue.prototype.$ajax = axios;