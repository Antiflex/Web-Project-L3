import {fetchLeaderboard} from "./commons.js";

const app = Vue.createApp({
    el:'#app',
    data() {
        return {
            data: [],
        };
    },
    methods: {
        fetchData() {
            fetchLeaderboard('ttt')
                .then((response) => {
                    response.json().then((data) => {
                        this.data = data;
                        /*for(let i = 0; i< data.length; i++){
                            data.id_place = 0;
                        }*/
                    });
                })
                .catch((err) => {
                    console.error(err);
                });
        },
    },
    beforeMount() {
        this.fetchData()
    },
});

const mountedApp = app.mount('#app');
