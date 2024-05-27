<script setup lang="ts">
import { onMounted, ref } from 'vue';
import wordServices from '../services/wordsServices'

const initListWords = async () => {
  try {
      const result = await wordServices.fetchListOfWords()
      const data = result.data
      const dataArray = data.split('\r' + '\n')
      console.log('dataArray', dataArray)
  } catch (error) {
    console.log(error)
  } //finally ?
}

onMounted(async () => {
  await initListWords()
})
</script>

<template>
  <main>
    <div>test</div>
  </main>
</template>
