<script setup>
import FavoritePlace from '../FavoritePlace/FavoritePlace.vue'
import IButton from '../IButton/IButton.vue'
import { useModal } from '@/composables/useModal'
import EditPlaceModal from '../EditPlaceModal/EditPlaceModal.vue'
import { computed, ref } from 'vue'
import { useMutation } from '@/composables/useMutations'
import { updateFavoritePlaces, deleteFavoritePlaces } from '@/api/places'
import ConfirmModal from '../ConfirmModal/ConfirmModal.vue'
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
  },
  isPlacesLoading: {
    type: Boolean
  },
  isDisabled: {
    type: [Array, null]
  }
})
const isBtnDisabled = computed(() => {
  return props.isDisabled === null ? true : false
})
const {
  isOpen: isEditOpen,
  openModal: openEditModal,
  closeModal: closeEditModal
} = useModal()

const {
  isOpen: isDeleteOpen,
  openModal: openDeleteModal,
  closeModal: closeDeleteModal
} = useModal()
const { mutation: updatePlace, isLoading } = useMutation({
  mutationFn: (data) => updateFavoritePlaces(data),
  onSuccess: () => {
    closeEditModal()
    emit('updated')
  }
})

const {
  mutation: deletePlace,
  isLoading: isDeleting,
  error: deletingError
} = useMutation({
  mutationFn: (data) => deleteFavoritePlaces(data),
  onSuccess: () => {
    closeDeleteModal()
    emit('updated')
  }
})
const selectedId = ref(null)
const selectedItem = computed(() =>
  props.items.find((place) => place.id === selectedId.value)
)
const handleDeletePlace = () => {
  deletePlace(selectedId.value)
}
const handleSumbit = (body) => {
  updatePlace(body)
}
const emit = defineEmits(['place-clicked', 'create', 'updated'])

const handleEditOpen = (id) => {
  selectedId.value = id
  openEditModal()
}

const handleDeleteOpen = (id) => {
  selectedId.value = id
  openDeleteModal()
}
</script>

<template>
  <div class="px-6 text-black">
    <div class="text-gray mb-4">Додані маркери</div>
    <div v-if="props.items.length === 0 && !isUpdating">List is empty</div>
    <FavoritePlace
      v-for="place in props.items"
      :key="place.id"
      :title="place.title"
      :description="place.description"
      :img="place.img"
      :is-active="place.id === props.activeId"
      @click="emit('place-clicked', place.id)"
      @edit="handleEditOpen(place.id)"
      @delete="handleDeleteOpen(place.id)"
    />
    <EditPlaceModal
      @submit="handleSumbit"
      :is-open="isEditOpen"
      @close="closeEditModal"
      :place="selectedItem"
      :is-loading="isLoading"
    />
    <ConfirmModal
      :is-open="isDeleteOpen"
      :is-loading="isDeleting"
      :has-error="deletingError"
      title="Are you sure you wanna delete you favorite place?"
      @cancel="closeDeleteModal"
      @confirm="handleDeletePlace"
    />
    <div v-if="props.isUpdating">Updating list...</div>
    <IButton
      class="w-full mt-10"
      variant="gradient"
      @click="emit('create')"
      :disabled="isBtnDisabled"
      :is-disabled="isBtnDisabled"
      >Add marker</IButton
    >
  </div>
</template>
