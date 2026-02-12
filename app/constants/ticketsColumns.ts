import type { BadgeProps, TableColumn } from '@nuxt/ui'
import type { Ticket } from '~/types/tickets'
import { UBadge, UButton, UDropdownMenu } from '#components'

export const columns: TableColumn<Ticket>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()

      return h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label: 'ID',
        icon: isSorted
          ? isSorted === 'asc'
            ? 'i-lucide-arrow-up-narrow-wide'
            : 'i-lucide-arrow-down-wide-narrow'
          : 'i-lucide-arrow-up-down',
        class: '-mx-2.5 cursor-pointer',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
      })
    },
    cell: ({ row }) => `#${row.getValue('id')}`
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()

      return h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label: 'Fecha',
        icon: isSorted
          ? isSorted === 'asc'
            ? 'i-lucide-arrow-up-narrow-wide'
            : 'i-lucide-arrow-down-wide-narrow'
          : 'i-lucide-arrow-up-down',
        class: '-mx-2.5 cursor-pointer',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
      })
    },
    cell: ({ row }) => {
      return new Date(row.getValue('createdAt')).toLocaleString('es-ES', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    }
  },
  {
    accessorKey: 'description',
    header: 'Descripción'
  },
  {
    accessorKey: 'status',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()

      return h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label: 'Estado',
        icon: isSorted
          ? isSorted === 'asc'
            ? 'i-lucide-arrow-up-narrow-wide'
            : 'i-lucide-arrow-down-wide-narrow'
          : 'i-lucide-arrow-up-down',
        class: '-mx-2.5 cursor-pointer',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
      })
    },
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      const statusMap: Record<string, string> = {
        open: 'Pendiente',
        in_progress: 'En Progreso',
        resolved: 'Resuelto',
        closed: 'Cerrado'
      }
      const colorMap: Record<string, BadgeProps['color']> = {
        open: 'primary',
        in_progress: 'warning',
        resolved: 'success',
        closed: 'error'
      }
      return h(UBadge, {
        label: statusMap[status] || status,
        color: colorMap[status] || 'neutral',
        variant: "subtle"
      })
    }
  },
  {
    accessorKey: 'priority',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()

      return h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label: 'Prioridad',
        icon: isSorted
          ? isSorted === 'asc'
            ? 'i-lucide-arrow-up-narrow-wide'
            : 'i-lucide-arrow-down-wide-narrow'
          : 'i-lucide-arrow-up-down',
        class: '-mx-2.5 cursor-pointer',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
      })
    },
    cell: ({ row }) => {
      const priority = row.getValue('priority') as string
      const priorityMap: Record<string, string> = {
        low: 'Baja',
        medium: 'Media',
        high: 'Alta',
        urgent: 'Urgente'
      }
      const colorMap: Record<string, BadgeProps['color']> = {
        low: 'success',
        medium: 'warning',
        high: 'error',
        urgent: 'neutral'
      }
      return h(UBadge, {
        label: priorityMap[priority] || priority,
        color: colorMap[priority] || 'neutral',
        variant: "solid"
      })
    }
  },
  {
    accessorKey: 'actions',
    header: 'Acciones',
    enableSorting: false,
    cell: ({ row }) => {
      const ticket = row.original
      
      return h(UDropdownMenu as any, {
        items: [
          [{
            label: 'Ver detalles',
            icon: 'i-lucide-eye',
            class: 'cursor-pointer',
            click: () => {
              console.log('Ver detalles del ticket:', ticket)
            }
          }],
          [{
            label: 'Cambiar a Pendiente',
            icon: 'i-lucide-circle-dot',
            class: 'cursor-pointer',
            click: () => {
              console.log('Cambiar estado a pendiente:', ticket.id)
            }
          },
          {
            label: 'Cambiar a En Progreso',
            icon: 'i-lucide-loader',
            class: 'cursor-pointer',
            click: () => {
              console.log('Cambiar estado a en progreso:', ticket.id)
            }
          },
          {
            label: 'Cambiar a Resuelto',
            icon: 'i-lucide-check-circle',
            class: 'cursor-pointer',
            click: () => {
              console.log('Cambiar estado a resuelto:', ticket.id)
            }
          },
          {
            label: 'Cambiar a Cerrado',
            icon: 'i-lucide-x-circle',
            class: 'cursor-pointer',
            click: () => {
              console.log('Cambiar estado a cerrado:', ticket.id)
            }
          }]
        ]
      }, {
        default: () => h(UButton, {
          icon: 'i-lucide-more-vertical',
          color: 'neutral',
          variant: 'ghost',
          class: 'cursor-pointer',
          square: true
        })
      })
    }
  }
]