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
    />
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


</script>