import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

import { url, path } from "./config.js"

createApp({
    data(){
        return {
            loginUser: {
                username: "",
                password: ""
            }
        }
    },
    methods: {
        loginAdmin(loginUser){
            axios.post(`${url}/admin/signin`, loginUser)
            .then(res => {
                const { expired, token} = res.data;
                document.cookie = `vtoken=${token}; expires=${new Date(expired)};`;
                // console.log(res);
                window.location.href = "products.html";
            })
            .catch(err => {
                confirm("登入失敗!請輪入有效用戶名稱及密碼")
            })
        }
    }

}).mount("#app");