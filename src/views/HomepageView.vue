<script setup>
import FavoritePlaces from '../components/FavoritePlaces/FavoritePlaces.vue'
import { MapboxMap, MapboxMarker } from '@studiometa/vue-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import 'dotenv'
import { mapSettings } from '../map/mapSettings'
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { getFavoritePlaces, addFavoritePlaces } from '../api/places/index.js'
import MarkerIcon from '../assets/imgs/MarkerIcon.vue'
import { useModal } from '../composables/useModal'
import CreateNewPlace from '@/components/CreateNewPlaceModal/CreateNewPlace.vue'
import { useMutation } from '@/composables/useMutations'
import UserInfo from '../components/UserInfo/UserInfo.vue'
import LogoutButton from '../components/LogoutButton/LogoutButton.vue'
import BurgerIcon from '../assets/imgs/BurgerIcon.vue'

const { isOpen, closeModal, openModal } = useModal()

const activeId = ref(null)
const map = ref(null)
const mapMarkerLngLat = ref(null)
const changeActiveId = (id) => {
  activeId.value = id
}
const {
  data,
  mutation: getPlaces,
  isLoading: updatingPlaces
} = useMutation({
  mutationFn: () => getFavoritePlaces()
})
const favoritePlaces = computed(() => data.value ?? [])
// eslint-disable-next-line no-undef
const mapApiToken = process.env.VUE_APP_ENV_MAPBOX_API_TOKEN
const {
  mutation: addPlace,
  isLoading: isAddingPlace,
  error
} = useMutation({
  mutationFn: (data) => addFavoritePlaces(data),
  onSuccess: () => {
    closeModal()
    mapMarkerLngLat.value = null
    getPlaces()
  }
})

const handleAddPlace = async (formData, resetForm) => {
  const body = {
    ...formData,
    coordinates: mapMarkerLngLat.value
  }
  await addPlace(body)
  resetForm()
}

const changePlace = (id) => {
  const { coordinates } = favoritePlaces.value.find((place) => place.id === id)
  changeActiveId(id)
  map.value.flyTo({ center: coordinates, zoom: 13, speed: 2 })
}
const isMobile = ref(false)
onMounted(() => {
  getPlaces()
  isMobile.value = window.innerWidth < 768

  window.addEventListener('resize', () => {
    isMobile.value = window.innerWidth < 768
  })
})
onUnmounted(() => {
  window.removeEventListener('resize', () => {
    isMobile.value = window.innerWidth < 768
  })
})
const handleMapClick = ({ lngLat }) => {
  mapMarkerLngLat.value = [lngLat.lng, lngLat.lat]
}

const showMobile = ref(false)

const toggleNav = () => {
  showMobile.value = !showMobile.value
}
</script>

<template>
  <main class="flex h-screen relative">
    <button
      v-if="!showMobile"
      class="fixed top-0 left-0 w-[40px] h-[40px] bg-[#ffe6dc] z-50 flex items-center justify-center"
      @click="toggleNav"
    >
      <BurgerIcon />
    </button>
    <transition name="fade">
      <div
        v-if="showMobile"
        class="fixed top-0 left-0 h-full bg-white w-[260px] tablet:w-[400px] shrink-0 overflow-auto z-20"
      >
        <UserInfo
          @fade="toggleNav"
          :is-mobile="isMobile"
          class="flex flex-row justify-between align-middle"
          ><LogoutButton class="" v-if="!isMobile"
        /></UserInfo>

        <FavoritePlaces
          :items="favoritePlaces"
          :active-id="activeId"
          :is-updating="updatingPlaces"
          @place-clicked="changePlace"
          @create="openModal"
          @updated="getPlaces"
          :is-disabled="mapMarkerLngLat"
        />
        <LogoutButton v-if="isMobile" class="mt-6 pl-6" />
        <CreateNewPlace
          :is-open="isOpen"
          @close="closeModal"
          @submit="handleAddPlace"
          :is-loading="isAddingPlace"
          :has-error="error"
        />
      </div>
    </transition>

    <div class="w-full h-full flex items-center justify-center text-6xl">
      <MapboxMap
        :center="[30.523333, 50.4500001]"
        :zoom="10"
        class="w-full h-full"
        :access-token="mapApiToken"
        :map-style="mapSettings.style"
        @mb-click="handleMapClick"
        @mb-created="(mapInstance) => (map = mapInstance)"
      >
        <MapboxMarker
          v-if="mapMarkerLngLat"
          :lngLat="mapMarkerLngLat"
          anchor="bottom"
        >
          <MarkerIcon class="h-8 w-8" is-active />
        </MapboxMarker>
        <MapboxMarker
          v-for="place in favoritePlaces"
          :key="place.id"
          :lngLat="place.coordinates"
          anchor="bottom"
        >
          <button type="button" @click.stop="changeActiveId(place.id)">
            <MarkerIcon class="h-8 w-8" />
          </button>
        </MapboxMarker>
      </MapboxMap>
    </div>
  </main>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
