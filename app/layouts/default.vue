<template>
  <UPage class="w-screen min-h-screen">
    <UPageHeader 
      title="Titulo"
      description="Subtitulo"
      :ui="{
        container: 'mx-10 md:px-20 lg:px-40 2xl:px-80'
      }"
    />

    <UPageBody 
      class="mx-10 md:px-20 lg:px-40 2xl:px-80"
    >
      <slot/>
    </UPageBody >
  </UPage>
</template>