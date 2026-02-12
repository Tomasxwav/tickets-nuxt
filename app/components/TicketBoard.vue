<template>
  <div>
    <div class="flex w-full justify-end mb-4">
      <UInput v-model="globalFilter" class="w-sm" placeholder="Buscar tickets..." />
    </div>

    <div class="grid grid-cols-3 gap-4">
      <div 
        class="bg-white dark:bg-gray-900 rounded shadow dark:shadow-gray-800 p-4 min-h-100"
        :class="{ 'ring-2 ring-blue-500': dragOverColumn === 'open' }"
        @drop.prevent="onDrop($event, 'open')"
        @dragover.prevent
        @dragenter.prevent="onDragEnter($event, 'open')"
        @dragleave="onDragLeave"
      >
        <h2 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Por Hacer
          <span class="text-sm text-gray-500 dark:text-gray-400 ml-2">({{ openTickets.length }})</span>
        </h2>
        <div v-if="openTickets.length > 0">
          <TicketCard 
            v-for="ticket in openTickets" 
            :key="ticket.id" 
            :ticket="ticket"
            @drag-start="onTicketDragStart"
            @drag-end="onTicketDragEnd"
          />
        </div>
        <p v-else class="text-gray-500 dark:text-gray-400 text-sm">No hay tickets por hacer</p>
      </div>

      <div 
        class="bg-white dark:bg-gray-900 rounded shadow dark:shadow-gray-800 p-4 min-h-100 z-100"
        :class="{ 'ring-2 ring-blue-500': dragOverColumn === 'in_progress' }"
        @drop.prevent="onDrop($event, 'in_progress')"
        @dragover.prevent
        @dragenter.prevent="onDragEnter($event, 'in_progress')"
        @dragleave="onDragLeave"
      >
        <h2 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          En Progreso
          <span class="text-sm text-gray-500 dark:text-gray-400 ml-2">({{ inProgressTickets.length }})</span>
        </h2>
        <div v-if="inProgressTickets.length > 0" class="z-0">
          <TicketCard 
            v-for="ticket in inProgressTickets" 
            :key="ticket.id" 
            :ticket="ticket"
            @drag-start="onTicketDragStart"
            @drag-end="onTicketDragEnd"
          />
        </div>
        <p v-else class="text-gray-500 dark:text-gray-400 text-sm">No hay tickets en progreso</p>
      </div>

      <div 
        class="bg-white dark:bg-gray-900 rounded shadow dark:shadow-gray-800 p-4 min-h-100"
        :class="{ 'ring-2 ring-blue-500': dragOverColumn === 'resolved' }"
        @drop.prevent="onDrop($event, 'resolved')"
        @dragover.prevent
        @dragenter.prevent="onDragEnter($event, 'resolved')"
        @dragleave="onDragLeave"
      >
        <h2 class="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Hecho
          <span class="text-sm text-gray-500 dark:text-gray-400 ml-2">({{ completedTickets.length }})</span>
        </h2>
        <div v-if="completedTickets.length > 0">
          <TicketCard 
            v-for="ticket in completedTickets" 
            :key="ticket.id" 
            :ticket="ticket"
            @drag-start="onTicketDragStart"
            @drag-end="onTicketDragEnd"
          />
        </div>
        <p v-else class="text-gray-500 dark:text-gray-400 text-sm">No hay tickets completados</p>
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
const draggedTicket = ref<Ticket | null>(null)
const dragOverColumn = ref<string | null>(null)

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

const onTicketDragStart = (ticket: Ticket) => {
  draggedTicket.value = ticket
}

const onTicketDragEnd = () => {
  draggedTicket.value = null
  dragOverColumn.value = null
}

const onDragEnter = (event: DragEvent, status: string) => {
  dragOverColumn.value = status
}

const onDragLeave = (event: DragEvent) => {
  const target = event.currentTarget as HTMLElement
  const relatedTarget = event.relatedTarget as HTMLElement
  
  if (!target.contains(relatedTarget)) {
    dragOverColumn.value = null
  }
}

const onDrop = async (_event: DragEvent, newStatus: Ticket['status']) => {
  dragOverColumn.value = null
  
  if (!draggedTicket.value) return
  
  const ticket = draggedTicket.value
  const oldStatus = ticket.status
  
  if (oldStatus === newStatus) {
    console.log(`El ticket #${ticket.id} ya está en el estado: ${newStatus}`)
    draggedTicket.value = null
    return
  }
  
  const targetStatus = newStatus === 'resolved' && (oldStatus === 'resolved' || oldStatus === 'closed')
    ? oldStatus
    : newStatus
  
  try {
    await $fetch(`/api/tickets/${ticket.id}`, {
      method: 'PATCH',
      body: {
        status: targetStatus
      }
    })

    const ticketIndex = tickets.value.findIndex(t => t.id === ticket.id)
    if (ticketIndex !== -1) {
      const currentTicket = tickets.value[ticketIndex]
      if (currentTicket) {
        tickets.value[ticketIndex] = {
          id: currentTicket.id,
          title: currentTicket.title,
          description: currentTicket.description,
          requestor: currentTicket.requestor,
          department: currentTicket.department,
          createdAt: currentTicket.createdAt,
          priority: currentTicket.priority,
          status: targetStatus
        }
      }
    }
  } catch (error) {
    console.error('Error actualizando el ticket:', error)
  } finally {
    draggedTicket.value = null
  }
}

</script>