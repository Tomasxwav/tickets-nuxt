<script setup lang="ts">
import type { Ticket } from '~/types/tickets'

defineProps<{
  ticket: Ticket
}>()

const statusColors = {
  open: 'info',
  in_progress: 'warning',
  resolved: 'success',
  closed: 'neutral'
} as const

const priorityColors = {
  low: 'success',
  medium: 'info',
  high: 'warning',
  urgent: 'error'
} as const

const statusLabels = {
  open: 'Abierto',
  in_progress: 'En Progreso',
  resolved: 'Resuelto',
  closed: 'Cerrado'
}

const priorityLabels = {
  low: 'Baja',
  medium: 'Media',
  high: 'Alta',
  urgent: 'Urgente'
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-start justify-between">
        <div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            {{ ticket.title }}
          </h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Ticket #{{ ticket.id }}
          </p>
        </div>
        <div class="flex gap-2">
          <UBadge 
            :color="priorityColors[ticket.priority]" 
            variant="subtle"
            size="lg"
          >
            {{ priorityLabels[ticket.priority] }}
          </UBadge>
          <UBadge 
            :color="statusColors[ticket.status]" 
            variant="subtle"
            size="lg"
          >
            {{ statusLabels[ticket.status] }}
          </UBadge>
        </div>
      </div>
    </template>

    <div class="space-y-6">
      <div>
        <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Descripción
        </h4>
        <p class="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
          {{ ticket.description }}
        </p>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Solicitante
          </h4>
          <p class="text-gray-600 dark:text-gray-400">
            {{ ticket.requestor }}
          </p>
        </div>
        <div>
          <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Departamento
          </h4>
          <p class="text-gray-600 dark:text-gray-400">
            {{ ticket.department }}
          </p>
        </div>
      </div>

      <div>
        <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Fecha de Creación
        </h4>
        <p class="text-gray-600 dark:text-gray-400">
          {{ formatDate(ticket.createdAt) }}
        </p>
      </div>
    </div>
  </UCard>
</template>