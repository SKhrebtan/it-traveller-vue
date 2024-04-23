<script setup>
import FavoritePlaces from '../components/FavoritePlaces/FavoritePlaces.vue'
import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import 'dotenv'
import { mapSettings } from '../map/mapSettings'
import { ref, onMounted } from 'vue'
import { getFavoritePlaces } from '../api/places/index.js'
import MarkerIcon from '../assets/imgs/MarkerIcon.vue'
const favoritePlaces = ref([])
// const favoritePlaces = [
//   {
//     id: 1,
//     location: 'Location 1',
//     description: 'Description 1',
//     img: '',
//     lngLat: [30.523333, 50.4900001]
//   },
//   {
//     id: 2,
//     location: 'Location 2',
//     description: 'Description 2',
//     img: '',
//     lngLat: [30.523333, 50.4300001]
//   }
// ]

const activeId = ref(null)
const map = ref(null)
const changeActiveId = (id) => {
  activeId.value = id
}
// eslint-disable-next-line no-undef
const mapApiToken = process.env.VUE_APP_ENV_MAPBOX_API_TOKEN

const changePlace = (id) => {
  const { lngLat } = favoritePlaces.value.find((place) => place.id === id)
  changeActiveId(id)
  map.value.flyTo({ center: lngLat, zoom: 13, speed: 2 })
}

onMounted(async () => {
  const { data } = await getFavoritePlaces()
  favoritePlaces.value = data
})
</script>

<template>
  <main class="flex h-screen">
    <div class="bg-white h-full w-[400px] shrink-0 overflow-auto pb-10">
      <FavoritePlaces :items="favoritePlaces" :active-id="activeId" @place-clicked="changePlace" />
    </div>
    <div class="w-full h-full flex items-center justify-center text-6xl">
      <MapboxMap
        :center="[30.523333, 50.4500001]"
        :zoom="10"
        class="w-full h-full"
        :access-token="mapApiToken"
        :map-style="mapSettings.style"
        @mb-created="(mapInstance) => (map = mapInstance)"
      >
        <MapboxMarker v-for="place in favoritePlaces" :key="place.id" :lngLat="place.lngLat">
          <button type="button" @click="changeActiveId(place.id)">
            <MarkerIcon class="h-8 w-8" />
          </button>
        </MapboxMarker>
      </MapboxMap>
    </div>
  </main>
</template>
