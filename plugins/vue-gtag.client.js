import { defineNuxtPlugin } from '#app'
import VueGtag from 'vue-gtag-next'

export default defineNuxtPlugin((nuxtApp) => {
    const getGDPR = localStorage.getItem('GDPR:accepted');
    nuxtApp.vueApp.use(VueGtag, {
        property: {
            id: 'G-GB4SG361HD'
        },
        appName: 'recipes.gonzalohirsch.com',
        enabled: getGDPR === 'true',
        pageTrackerScreenviewEnabled: true
    }, nuxtApp.vueApp.router);
});