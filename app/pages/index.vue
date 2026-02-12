<template>
  <div>
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="text-center">
        <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"/>
        <p class="mt-2 text-sm text-gray-500">Cargando tickets...</p>
      </div>
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
        <p>pa ahorita </p>
      </template>

      <template #list>
        <TicketTable :initial-tickets="tickets" class="my-8"/>
      </template>
    </UTabs>
  </div>
</template>

<script setup lang="ts">
import { fetchTickets } from '~/mocks/tickets';
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

const loading = ref(true)
const tickets = ref<Ticket[]>([])

onMounted(async () => {
  try {
    loading.value = true
    tickets.value = await fetchTickets()
  } catch (error) {
    console.error('Error al cargar tickets:', error)
  } finally {
    loading.value = false
  }
})
</script>