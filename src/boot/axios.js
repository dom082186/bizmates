import axios from 'axios'

export default async ({ Vue }) => {
    Vue.prototype.$axios = axios
    window.axios = axios

    /* dev */
    // axios.defaults.baseURL = 'http://api.openweathermap.org/data/2.5/forecast?appid=eb40821d8c92b4b87ba9b0de3b525ae5'
}
