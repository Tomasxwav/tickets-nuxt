<template>
  <UPage class="w-screen min-h-screen overflow-x-hidden max-w-screen">
    <UPageHeader 
      title="Titulo"
      description="Subtitulo"
      :ui="{
        container: 'mx-10 md:px-20 lg:px-40 2xl:px-80'
      }"
    >
      <template #links>
        <ColorModeButton />
        <TicketForm />
      </template>
    </UPageHeader>

    <UPageBody 
      class="mx-10 md:px-20 lg:px-40 2xl:px-80"
    >
      <slot/>
    </UPageBody >
  </UPage>
</template>