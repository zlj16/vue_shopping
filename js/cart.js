var vm = new Vue({
    // 模型监听的范围对象
    el: "#app",
    // 模型数据
    data: {
        // title: "Hello Vue"
        totalMoney: 0,
        productList: [],
        // 全选标记
        ckeckAllFalg: false,
        // 删除标记
        delFlag: false,
        // 保存要删除的商品的对象
        cutProuct: ""
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
                // _this.totalMoney = res.data.totalMoney
            });


            /*this.$ajax.get("data/cartData.json").then(function (res) {
                _this.productList = res.data.result.list;
                _this.totalMoney=res.data.result.totalMoney
            });*/


        },
        changeMoney: function (product, way) {
            if (way > 0) {
                // +
                product.productQuantity++
            } else {
                product.productQuantity--;
                if (product.productQuantity < 1) {
                    product.productQuantity = 1
                }
            }
            this.calTotalPrice();
        },
        selectChecked: function (item) {
            if (typeof item.checked == 'undefined') {
                Vue.set(item, "checked", true)
            } else {
                item.checked = !item.checked
            }
            this.calTotalPrice();
        },
        checkAll: function (falg) {
            this.ckeckAllFalg = falg;
            var _this = this;
            this.productList.forEach(function (item, index) {
                if (typeof item.checked == 'undefined') {
                    Vue.set(item, "checked", _this.ckeckAllFalg)
                } else {
                    item.checked = _this.ckeckAllFalg;
                }
            })
            this.calTotalPrice();

        },
        calTotalPrice: function () {
            var _this = this;
            _this.totalMoney = 0;
            this.productList.forEach(function (item, index) {
                if (item.checked) {
                    _this.totalMoney += item.productPrice * item.productQuantity;
                }
            })
        },
        // 当前要删除的是哪一个商品
        delConfirm: function (item) {
            this.delFlag = true;
            // 要删除的对象
            this.cutProuct = item;

        },
        // 删除方法
        delProduct: function () {
            // 这边应该让后台去删除
            var index = this.productList.indexOf(this.cutProuct);
            this.productList.splice(index, 1);
            // 把标记设置为false
            this.delFlag = false;


        }

    }
});
// 使用全局过滤器
Vue.filter("money", function (value, type) {
    return "$" + value.toFixed(2) + type;
})


//Vue.prototype.$ajax = axios;