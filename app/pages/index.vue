<template>
  <div>
    <div class="flex w-full justify-end mb-4">
      <UInput v-model="globalFilter" class="w-sm" placeholder="Buscar tickets..." />
    </div>

    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="text-center">
        <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"/>
        <p class="mt-2 text-sm text-gray-500">Cargando tickets...</p>
      </div>
    </div>

    <UTable
      v-else
      ref="table"
      v-model:global-filter="globalFilter"
      :data="tickets"
      :columns="columns"
      class="flex-1"
    />
  </div>

</template>

<script setup lang="ts">
import { columns } from '~/constants/ticketsColumns';
import { fetchTickets } from '~/mocks/tickets';
import type { Ticket } from '~/types/tickets';

const globalFilter = ref('')
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