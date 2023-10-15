const app = Vue.createApp({
    el: '#app',
    data() {
        return {
            myData: JSON.parse('<%- data %>')
        }
    }
})