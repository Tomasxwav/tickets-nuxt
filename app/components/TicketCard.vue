<template>
  <UModal>
    <div 
      draggable="true"
      class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 mb-3 hover:shadow-md transition-shadow cursor-move"
      :class="{ 'opacity-50': isDragging }"
      @dragstart="onDragStart"
      @dragend="onDragEnd"
    >
      <div class="flex justify-between items-start mb-2">
        <span class="text-xs font-semibold text-gray-500 dark:text-gray-400">#{{ ticket.id }}</span>
        <UBadge 
          :color="priorityColor" 
          variant="soft"
          size="xs"
        >
          {{ priorityLabel }}
        </UBadge>
      </div>
      <p class="text-sm text-gray-800 dark:text-gray-200 mb-2">{{ ticket.title }}</p>
      <div class="text-xs text-gray-500 dark:text-gray-400">
        {{ formattedDate }}
      </div>
    </div>

    <template #content>
      <TicketModal :ticket="ticket" />
    </template>
  </UModal>

</template>

<script setup lang="ts">
import type { BadgeProps } from '@nuxt/ui';
import type { Ticket } from '~/types/tickets';

const props = defineProps<{
  ticket: Ticket
}>()

const emit = defineEmits<{
  dragStart: [ticket: Ticket]
  dragEnd: []
}>()

const isDragging = ref(false)

const onDragStart = (_event: DragEvent) => {
  isDragging.value = true
  emit('dragStart', props.ticket)
}

const onDragEnd = () => {
  isDragging.value = false
  emit('dragEnd')
}

const priorityColor  = computed<BadgeProps['color']>(() => {
  switch (props.ticket.priority) {
    case 'urgent': return 'error'
    case 'high': return 'warning'
    case 'medium': return 'info'
    case 'low': return 'success'
    default: return 'info'
  }
})

const priorityLabel = computed(() => {
  switch (props.ticket.priority) {
    case 'urgent': return 'Urgente'
    case 'high': return 'Alta'
    case 'medium': return 'Media'
    case 'low': return 'Baja'
    default: return props.ticket.priority
  }
})

const formattedDate = computed(() => {
  const date = new Date(props.ticket.createdAt)
  return date.toLocaleDateString('es-ES', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  })
})
</script>