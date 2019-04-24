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
                                icon="mdi-magnify"
                                color="primary"
                                @click.prevent="getForecastOfCity()"
                            />
                            </template>
                    </q-input>
                </form>
            </div>
        </div> <!-- end of .page-banner -->
        <div class="forecast-list-container">
            <q-inner-loading :showing="weathers_loader">
                <q-spinner-oval size="50px" color="primary" />
            </q-inner-loading>
            <div class="container q-pt-xl q-pb-xl">
                <template v-if="weather_forecast_show">
                    <h2 class="text-center q-mb-lg">{{ weather_city_name }}</h2>
                    <div class="forecast-list row q-col-gutter-x-lg">
                        <template v-for="( list, index ) in lists">
                            <div class="forecast-item col-12 col-sm-6 col-md-3" :key="index">
                                <q-card square>
                                    <q-img :src="'statics/images/banners/forecast.jpg'">
                                        <div class="absolute-bottom">
                                            <div class="date h3 q-mb-none">{{ dateFormat( list.dt_txt, 'MMM DD' ) }}</div>
                                            <div class="time">{{ dateFormat( list.dt_txt, 'hh:ss A' ) }}</div>
                                        </div>
                                    </q-img>
                                    <q-card-section>
                                        <template v-for="( weather, index_weather ) in list.weather">
                                            <div class="weather row items-center" :key="index_weather">
                                                <div class="icon-container q-mr-sm">
                                                    <q-icon
                                                        name="mdi-weather-cloudy"
                                                        size="24px"
                                                    />
                                                </div>
                                                <div class="label">{{ weather.main }}</div>
                                            </div>
                                        </template>
                                        <template v-for="( wind, index_wind ) in list.wind">
                                            <div class="wind row items-center" :key="index_wind">
                                                <div class="icon-container q-mr-sm">
                                                    <q-icon
                                                        name="mdi-weather-windy"
                                                        size="24px"
                                                    />
                                                </div>
                                                <div class="label">{{ wind }} {{ index_wind }}</div>
                                            </div>
                                        </template>
                                    </q-card-section>
                                </q-card>
                            </div>
                        </template>
                    </div>
                </template>
                <template v-else>
                    <q-banner class="bg-negative text-white" dense>
                        <template v-slot:avatar>
                            <q-icon name="mdi-exclamation" />
                        </template>
                        Please search a city first
                    </q-banner>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
    import { date } from 'quasar'

    export default {
        data() {
            return {
                search_city: '',
                weather_forecast_show: false,
                weather_city_name: '',
                weather_city_country: '',
                lists: {},
                weathers_loader: false,
            }
        },
        methods: {
            getForecastOfCity() {
                this.weathers_loader = true

                axios({
                    method: 'post',
                    url: 'http://api.openweathermap.org/data/2.5/forecast?appid=eb40821d8c92b4b87ba9b0de3b525ae5&q=' + this.search_city
                })
                .then( response => {
                    this.weather_forecast_show = true
                    this.weather_city_name = response.data.city.name
                    this.lists = response.data.list
                    this.weathers_loader = false
                    console.log( this.lists )
                })
                .catch( error => {
                    this.$q.notify({
                        message: 'Please enter a city to search.',
                        color: 'negative',
                        position: 'top',
                        icon: 'close'
                    })
                    this.weathers_loader = false
                })
            },
            dateFormat( getDate, setFormat ) {
                let formattedDate = date.formatDate( getDate, setFormat )
                return formattedDate
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
            background-attachment: fixed;
            background-position: center;
        }

        .forecast-list-container {
            position: relative;
            min-height: calc( 100vh - 500px );

            .forecast-list {
                .forecast-item {
                    margin-bottom: 30px;
                }
            }
        }
    }
</style>