const app = Vue.createApp({
    el: '#app',
    data() {
        Data = JSON.parse(document.getElementById('data').textContent);
        document.getElementById('data').innerHTML='';
        return {
            data: Data
        }
    }
})