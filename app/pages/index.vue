<template>
  <div>
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="text-center">
        <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"/>
        <p class="mt-2 text-sm text-gray-500">Cargando tickets...</p>
      </div>
    </div>

    <div v-else-if="error" class="flex items-center justify-center py-12">
      <UAlert
        color="error"
        variant="soft"
        title="Error al cargar tickets"
        :description="error"
        icon="i-heroicons-exclamation-triangle"
      />
    </div>

    <UTabs 
      v-else
      color="neutral"
      variant="link"
      :items="tabItems"
      :ui="{
        label: 'cursor-pointer'
      }"
    >
      <template #board>
        <TicketBoard :initial-tickets="tickets || []" class="my-2 2xl:my-8"/>
      </template>

      <template #list>
        <TicketTable :initial-tickets="tickets || []" class="my-2 2xl:my-8"/>
      </template>
    </UTabs>
  </div>
</template>

<script setup lang="ts">
import type { Ticket } from '~/types/tickets';
import type { TabsItem } from '@nuxt/ui'

const tabItems = ref<TabsItem[]>([
  {
    label: 'Tablero',
    slot: 'board'
  },
  {
    label: 'Lista',
    slot: 'list'
  }
])

const { data: tickets, pending: loading, error: fetchError } = await useFetch<Ticket[]>('/api/tickets', {
  key: 'tickets-list'
})

const error = computed(() => fetchError.value ? 'Error al cargar los tickets' : null)
</script>