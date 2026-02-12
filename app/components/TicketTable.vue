<template>
  <div>
    <div class="flex w-full justify-end mb-4">
      <UInput v-model="globalFilter" class="w-sm" placeholder="Buscar tickets..." />
    </div>
    <UTable
      ref="table"
      v-model:global-filter="globalFilter"
      :data="tickets"
      :columns="columns"
      class="flex-1"
    >
      <template #actions-cell="{ row }">
        <UDropdownMenu
          :items="[
            [{
              label: 'Ver detalles',
              icon: 'i-lucide-eye',
              class: 'cursor-pointer',
              onSelect: () => openModal(row.original)
            }],
            [{
              label: 'Cambiar a Pendiente',
              class: 'cursor-pointer',
              icon: 'i-lucide-circle-dot',
              onSelect: () => changeStatus(row.original.id, 'open')
            },
            {
              label: 'Cambiar a En Progreso',
              class: 'cursor-pointer',
              icon: 'i-lucide-loader',
              onSelect: () => changeStatus(row.original.id, 'in_progress')
            },
            {
              label: 'Cambiar a Resuelto',
              class: 'cursor-pointer',
              icon: 'i-lucide-check-circle',
              onSelect: () => changeStatus(row.original.id, 'resolved')
            },
            {
              label: 'Cambiar a Cerrado',
              class: 'cursor-pointer',
              icon: 'i-lucide-x-circle',
              onSelect: () => changeStatus(row.original.id, 'closed')
            }]
          ]"
        >
          <UButton
            icon="i-lucide-more-vertical"
            color="neutral"
            variant="ghost"
            class="cursor-pointer"
            square
          />
        </UDropdownMenu>
      </template>
    </UTable>

    <UModal v-model:open="isModalOpen" title="Detalles del ticket" description="Información completa del ticket seleccionado">
      <template #content>
        <TicketModal v-if="selectedTicket" :ticket="selectedTicket" />
      </template>
    </UModal>
  </div>

</template>

<script setup lang="ts">
import { columns } from '~/constants/ticketsColumns';
import type { Ticket } from '~/types/tickets';

const props = defineProps<{
  initialTickets: Ticket[]
}>()

const globalFilter = ref('')
const tickets = ref<Ticket[]>(props.initialTickets)

const isModalOpen = ref(false)
const selectedTicket = ref<Ticket | null>(null)

const openModal = (ticket: Ticket) => {
  selectedTicket.value = ticket
  isModalOpen.value = true
}

const changeStatus = async (ticketId: number, status: string) => {
  try {
    await $fetch(`/api/tickets/${ticketId}`, {
      method: 'PATCH',
      body: {
        status
      }
    })

    const ticketIndex = tickets.value.findIndex(t => t.id === ticketId)
    if (ticketIndex !== -1) {
      const currentTicket = tickets.value[ticketIndex]
      if (currentTicket) {
        tickets.value[ticketIndex] = {
          ...currentTicket,
          status: status as Ticket['status']
        }
      }
    }

    console.log('Estado actualizado exitosamente:', ticketId, status)
  } catch (error) {
    console.error('Error actualizando el estado del ticket:', error)
  }
}


</script>