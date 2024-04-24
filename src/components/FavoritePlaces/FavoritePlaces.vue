<script setup>
import FavoritePlace from '../FavoritePlace/FavoritePlace.vue'
import IButton from '../IButton/IButton.vue'
import { useModal } from '@/composables/useModal'
import EditPlaceModal from '../EditPlaceModal/EditPlaceModal.vue'
import { computed, ref } from 'vue'
import { useMutation } from '@/composables/useMutations'
import { updateFavoritePlaces } from '@/api/places'
const props = defineProps({
  items: {
    required: true,
    type: Array
  },
  activeId: {
    required: true,
    type: [String, null]
  },
  isUpdating: {
    type: Boolean
  }
})

const {
  isOpen: isEditOpen,
  openModal: openEditOpen,
  closeModal: closeEditOpen
} = useModal()
const { mutation: updatePlace, isLoading } = useMutation({
  mutationFn: (data) => updateFavoritePlaces(data),
  onSuccess: () => {
    closeEditOpen()
    emit('updated')
  }
})
const handleSumbit = (body) => {
  updatePlace(body)
}
const emit = defineEmits(['place-clicked', 'create', 'updated'])

const selectedId = ref(null)
const selectedItem = computed(() =>
  props.items.find((place) => place.id === selectedId.value)
)
const handleEditOpen = (id) => {
  selectedId.value = id
  openEditOpen()
}
</script>

<template>
  <div class="px-6 text-black">
    <div class="text-gray mb-4">Додані маркери</div>
    <div v-if="props.items.length === 0">List is empty</div>
    <FavoritePlace
      v-for="place in props.items"
      :key="place.id"
      :title="place.title"
      :description="place.description"
      :img="place.img"
      :is-active="place.id === props.activeId"
      @click="emit('place-clicked', place.id)"
      @edit="handleEditOpen(place.id)"
    />
    <EditPlaceModal
      @submit="handleSumbit"
      :is-open="isEditOpen"
      @close="closeEditOpen"
      :place="selectedItem"
      :is-loading="isLoading"
    />
    <div v-if="props.isUpdating">Updating list...</div>
    <IButton class="w-full mt-10" variant="gradient" @click="emit('create')">
      Додати маркер</IButton
    >
  </div>
</template>
