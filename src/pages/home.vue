<template>
    <div class="page-content">
        <div class="page-banner row justify-center items-center" style="background-image: url( 'statics/images/banners/banner01.jpg' );">
            <div class="container">
                <form action="#" autocomplete="off" @submit.prevent="">
                    <q-input
                        placeholder="Search City..."
                        v-model="search_city"
                        bg-color="white"
                        filled
                        dense
                        square
                        @keyup.enter="getForecastOfCity()"
                    >
                        <template v-slot:after>
                            <q-btn
                                class="no-border-radius q-py-sm"
                                icon="search"
                                color="primary"
                                @click.prevent="getForecastOfCity()"
                            />
                            </template>
                    </q-input>
                </form>
            </div>
        </div> <!-- end of .page-banner -->
        <div class="container q-pt-xl q-pb-xl">
            <template v-if="weather_forecast_show">
                <h2 class="text-center q-mb-lg">{{ weather_city_name }}</h2>
                <div class="forecast-list row q-col-gutter-x-lg">
                    <template v-for="( weather, index ) in weathers">
                        <div class="forecast-item col-md-3" :key="index">
                            <q-card square>
                                <q-card-section>

                                </q-card-section>
                            </q-card>
                        </div>
                    </template>
                </div>
            </template>
            <template v-else>
                <q-banner class="bg-negative text-white" dense>
                    <template v-slot:avatar>
                        <q-icon name="warning" />
                    </template>
                    Please search a city first
                </q-banner>
            </template>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                search_city: '',
                weather_forecast_show: false,
                weather_city_name: '',
                weather_city_country: '',
                weathers: {},
            }
        },
        methods: {
            getForecastOfCity() {
                axios({
                    method: 'post',
                    url: 'http://api.openweathermap.org/data/2.5/forecast?appid=eb40821d8c92b4b87ba9b0de3b525ae5&q=' + this.search_city
                })
                .then( response => {
                    this.weather_forecast_show = true
                    this.weather_city_name = response.data.city.name
                    this.weathers = response.data.list
                })
                .catch( error => {
                    this.$q.notify({
                        message: 'Please enter a city to search.',
                        color: 'negative',
                        position: 'top',
                        icon: 'close'
                    })
                })
            }
        },
    }
</script>
<style lang="stylus" scoped>
    .page-content {
        .page-banner {
            width: 100%;
            height: 500px;
            background-size: cover;
            background-repeat: no-repeat;
        }

        .forecast-list {
            .forecast-item {
                margin-bottom: 30px;
            }
        }
    }
</style>