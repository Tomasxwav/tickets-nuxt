<template>
  <UModal
    v-model:open="isOpen"
    title="Agregar ticket"
    description="Complete el formulario para agregar una nueva ticket"
  >
    <UButton
      label="Agregar ticket"
      color="primary"
      variant="solid"
      icon="i-lucide-plus"
      class="cursor-pointer"
    />

    <template #content>
      <UCard class="w-full">
        <template #header>
          <div class="space-y-1">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              Nueva solicitud
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Ingresa los datos de la solicitud
            </p>
          </div>
        </template>
        <UForm
          :schema="ticketSchema"
          class="space-y-4 w-full"
          :state="state"
          @submit="onSubmit"
        >
          <UFormField
            name="title"
            label="Título"
            help="Ingrese un título descriptivo del problema"
            required
          >
            <UInput
              v-model="state.title"
              placeholder="Ej: Error en el sistema de login"
              class="w-full"
            />
          </UFormField>

          <UFormField
            name="description"
            label="Descripción"
            help="Describa el problema en detalle"
            required
          >
            <UTextarea
              v-model="state.description"
              placeholder="Describa el problema..."
              class="w-full"
              :rows="4"
            />
          </UFormField>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormField
              name="requestor"
              label="Solicitante"
              help="Nombre de quien reporta el problema"
              required
            >
              <UInput
                v-model="state.requestor"
                placeholder="Nombre completo"
                class="w-full"
              />
            </UFormField>

            <UFormField
              name="department"
              label="Departamento"
              help="Departamento del solicitante"
              required
            >
              <USelect
                v-model="state.department"
                :items="departments"
                placeholder="Selecciona un departamento"
                class="w-full"
              />
            </UFormField>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">


            <UFormField
              name="priority"
              label="Prioridad"
              help="Nivel de urgencia del ticket"
              required
            >
              <USelect
                v-model="state.priority"
                :items="priorities"
                placeholder="Selecciona la prioridad"
                class="w-full"
              />
            </UFormField>
          </div>

          <div class="pt-4 flex w-full gap-2 md:gap-4 justify-end">
            <UButton
              type="button"
              label="Cancelar"
              color="primary"
              variant="ghost"
              class="w-fit min-w-20 justify-center cursor-pointer"
              @click="onCancel"
            />
            <UButton
              type="submit"
              label="Crear Ticket"
              color="primary"
              variant="solid"
              :disabled="isSubmitting"
              :loading="isSubmitting"
              class="w-fit min-w-20 justify-center cursor-pointer"
            />
          </div>
        </UForm>
      </UCard>
    </template>
  </UModal>
</template>

<script lang="ts" setup>
import z from 'zod'
import type { FormSubmitEvent } from '#ui/types'
import type { TicketFormData } from '~/types/tickets'



const toast = useToast()
const isSubmitting = ref(false)
const isOpen = ref(false)

const state = reactive<TicketFormData>({
  title: '',
  description: '',
  requestor: '',
  department: '',
  priority: 'medium',
})

const departments = [
  { label: 'Soporte Técnico', value: 'soporte' },
  { label: 'Desarrollo', value: 'desarrollo' },
  { label: 'Recursos Humanos', value: 'rrhh' },
  { label: 'Ventas', value: 'ventas' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Administración', value: 'administracion' },
  { label: 'Finanzas', value: 'finanzas' },
  { label: 'Operaciones', value: 'operaciones' },
]

const priorities = [
  { label: 'Baja', value: 'low' },
  { label: 'Media', value: 'medium' },
  { label: 'Alta', value: 'high' },
  { label: 'Urgente', value: 'urgent' },
]

const ticketSchema = z.object({
  title: z
    .string({ error: 'El título es obligatorio' })
    .min(3, 'El título debe tener al menos 3 caracteres'),
  description: z
    .string({ error: 'La descripción es obligatoria' })
    .min(10, 'La descripción debe tener al menos 10 caracteres'),
  requestor: z
    .string({ error: 'El solicitante es obligatorio' })
    .min(2, 'Ingrese un nombre válido'),
  department: z
    .string({ error: 'El departamento es obligatorio' })
    .min(1, 'Seleccione un departamento'),
  priority: z.enum(['low', 'medium', 'high', 'urgent'], {
    error: 'La prioridad es obligatoria',
  }),
})

type TicketForm = z.output<typeof ticketSchema>

const onSubmit = async (_event: FormSubmitEvent<TicketForm>) => {
  isSubmitting.value = true

  try {
    await $fetch('/api/tickets/create', {
      method: 'POST',
      body: {
        title: state.title,
        description: state.description,
        requestor: state.requestor,
        department: state.department,
        priority: state.priority,
        status: 'open'
      }
    })

    toast.add({
      title: 'Ticket creado',
      description: `El ticket "${state.title}" ha sido creado exitosamente.`,
      color: 'success',
    })

    Object.assign(state, {
      title: '',
      description: '',
      requestor: '',
      department: '',
      priority: 'medium',
    })

    isOpen.value = false
    
    await refreshNuxtData('tickets-list')
  } catch (error) {
    console.error('Error creating ticket:', error)
    toast.add({
      title: 'Error',
      description: 'No se pudo crear el ticket. Por favor, intente de nuevo.',
      color: 'error',
    })
  } finally {
    isSubmitting.value = false
  }
}

const onCancel = () => {
  Object.assign(state, {
    title: '',
    description: '',
    requestor: '',
    department: '',
    priority: 'medium',
  })
  isOpen.value = false
}
</script>
