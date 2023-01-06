import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

import { url, path } from "./config.js"


createApp({
    data(){
        return {
            productData: [],
            numOfProduct: "",
            temp: {
                
            }
        }
    },
    methods: {
        checkUser(){
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)vtoken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            axios.defaults.headers.common['Authorization'] = token;
            axios.post(`${url}/api/user/check`)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                confirm("請先登入")
            })
        },
        getProducts(){
            axios.get(`${url}/api/${path}/admin/products`)
            .then(res => {
                this.productData = res.data.products;
                console.log(this.productData);
                this.numOfProduct = this.productData.length;
            })
            .catch(err => {
                return err.response.data.success? "": window.location = "index.html";
            })
        },
        checkItem(productId){
            this.productData.forEach(item => {
                if (item.id === productId){
                    this.temp = item
                }
            })
        }
    },
    mounted() {
        this.checkUser();
        this.getProducts();
        
    }

}

).mount("#app")