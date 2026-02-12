<template>
  <div>
    <div class="flex w-full justify-end mb-4">
      <UInput v-model="globalFilter" class="w-sm" placeholder="Buscar tickets..." />
    </div>

    <div class="grid grid-cols-3 gap-4">
      <div class="bg-white rounded shadow p-4">
        <h2 class="text-lg font-semibold mb-4">
          Por Hacer
          <span class="text-sm text-gray-500 ml-2">({{ openTickets.length }})</span>
        </h2>
        <div v-if="openTickets.length > 0">
          <TicketCard 
            v-for="ticket in openTickets" 
            :key="ticket.id" 
            :ticket="ticket" 
          />
        </div>
        <p v-else class="text-gray-500 text-sm">No hay tickets por hacer</p>
      </div>

      <div class="bg-white rounded shadow p-4">
        <h2 class="text-lg font-semibold mb-4">
          En Progreso
          <span class="text-sm text-gray-500 ml-2">({{ inProgressTickets.length }})</span>
        </h2>
        <div v-if="inProgressTickets.length > 0">
          <TicketCard 
            v-for="ticket in inProgressTickets" 
            :key="ticket.id" 
            :ticket="ticket" 
          />
        </div>
        <p v-else class="text-gray-500 text-sm">No hay tickets en progreso</p>
      </div>

      <div class="bg-white rounded shadow p-4">
        <h2 class="text-lg font-semibold mb-4">
          Hecho
          <span class="text-sm text-gray-500 ml-2">({{ completedTickets.length }})</span>
        </h2>
        <div v-if="completedTickets.length > 0">
          <TicketCard 
            v-for="ticket in completedTickets" 
            :key="ticket.id" 
            :ticket="ticket" 
          />
        </div>
        <p v-else class="text-gray-500 text-sm">No hay tickets completados</p>
      </div>
    </div>
    
  </div>

</template>

<script setup lang="ts">
import type { Ticket } from '~/types/tickets';

const props = defineProps<{
  initialTickets: Ticket[]
}>()

const globalFilter = ref('')
const tickets = ref<Ticket[]>(props.initialTickets)

const filteredTickets = computed(() => {
  if (!globalFilter.value) return tickets.value
  
  const search = globalFilter.value.toLowerCase()
  return tickets.value.filter(ticket => 
    ticket.description.toLowerCase().includes(search) ||
    ticket.id.toString().includes(search)
  )
})

const openTickets = computed(() => 
  filteredTickets.value.filter(ticket => ticket.status === 'open')
)

const inProgressTickets = computed(() => 
  filteredTickets.value.filter(ticket => ticket.status === 'in_progress')
)

const completedTickets = computed(() => 
  filteredTickets.value.filter(ticket => 
    ticket.status === 'resolved' || ticket.status === 'closed'
  )
)
</script>