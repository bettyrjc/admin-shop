<template>
  <div class="px-5 py-2 bg-white rounded">
    <h1 class="text-3xl">
      Producto: <small class="text-blue-500">{{ title }}</small>
    </h1>
    <hr class="my-4" />
  </div>

  <form @submit="onSubmit" class="grid grid-cols-1 gap-5 px-5 bg-white sm:grid-cols-2">
    <div class="first-col">
      <!-- Primera parte del formulario -->

      <CustomInput
        :id="'title'"
        :name="'Título'"
        v-model="title"
        v-bind="titleAttrs"
        :error="errors.title"
      />

      <CustomInput
        :id="'slug'"
        :name="'Slug'"
        v-model="slug"
        v-bind="slugAttrs"
        :error="errors.slug"
      />

      <CustomTexarea
        :id="'description'"
        :name="'Description'"
        v-model="description"
        v-bind="descriptionAttrs"
        :error="errors.description"
      />

      <div class="flex flex-row gap-3">
        <CustomInput
          :id="'price'"
          :name="'Price'"
          v-model="price"
          v-bind="priceAttrs"
          :error="errors.price"
          :type="'number'"
        />

        <CustomInput
          :id="'stock'"
          :name="'Stock'"
          v-model="stock"
          v-bind="stockAttrs"
          :error="errors.stock"
          :type="'number'"
        />
      </div>

      <div class="mb-4">
        <label for="sizes" class="form-label">Tallas</label>
        <button
          v-for="size in allSizes"
          :key="size"
          @click="toggleSize(size)"
          type="button"
          :class="[
            'flex-1 p-2 mr-2  rounded w-14',
            {
              'bg-blue-500 text-white': hasSize(size),
              'bg-blue-100': !hasSize(size),
            },
          ]"
        >
          {{ size }}
        </button>
      </div>
    </div>

    <!-- Segunda columna -->
    <div class="first-col">
      <label for="images" class="form-label">Imágenes</label>
      <!-- Row with scrollable horizontal -->
      <div class="flex p-2 overflow-x-auto space-x-8 w-full h-[265px] bg-gray-200 rounded">
        <div class="flex-shrink-0" v-for="image of images" :key="image.value">
          <img :src="image.value" :alt="title" class="w-[250px] h-[250px]" />
        </div>
      </div>
      <!-- Upload image -->
      <div class="col-span-2 my-2">
        <label for="image" class="form-label">Subir imagen</label>

        <input multiple type="file" id="image" class="form-control" />
      </div>

      <div class="mb-4">
        <label for="gender" class="form-label">Género</label>
        <select
          :class="[
            'form-control',
            {
              'border-red-500': errors.gender,
            },
          ]"
          v-model="gender"
          v-bind="genderAttrs"
        >
          <option value="">Seleccione</option>
          <option value="kid">Niño</option>
          <option value="women">Mujer</option>
          <option value="men">Hombre</option>
        </select>
        <span v-if="errors.gender" class="text-sm text-red-500">{{ errors.gender }}</span>
      </div>

      <!-- Botón para guardar -->
      <div class="my-4 text-right">
        <button
          type="submit"
          class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Guardar
        </button>
      </div>
    </div>
  </form>
  <div class="grid grid-cols-3 p-4 mt-2">
    <pre class="bg-blue-200">
      {{ JSON.stringify(values, null, 2) }}
    </pre>
    <pre class="bg-red-200">
      {{ JSON.stringify(errors, null, 2) }}
    </pre>
    <pre class="bg-green-200">
      {{ JSON.stringify(meta, null, 2) }}
    </pre>
  </div>
</template>

<style scoped>
.form-label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}

.form-control {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none;
}
</style>

<script lang="ts" src="./ProductView.ts"></script>
