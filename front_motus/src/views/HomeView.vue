<script setup lang="ts">
import { onMounted, ref } from 'vue';
import wordServices from '../services/wordsServices'
import { storeToRefs } from 'pinia'
import { useWordsStore } from '@/stores/words'

const store = useWordsStore()
const { getWordList } = storeToRefs(store)
const { addWordsList } = store

const wordToFind = ref<string>('')

const initListWords = async () => {
  try {
    // if the getter is not empty it means that the list already exists so we don't launch the API call
    // we use the persisted plugin with pinia to save the list of words in the local storage
    if (getWordList.value.length === 0) {
      const result = await wordServices.fetchListOfWords()
      const data = result.data
      const dataArray = data.split('\r' + '\n')
      console.log('dataArray', dataArray)

      addWordsList(dataArray)
    }

  } catch (error) {
    console.log(error)
  } finally {
    initWordToFind()
  }
}

const initWordToFind = () => {
  const randomNumber = Math.floor(Math.random() * getWordList.value.length)
  wordToFind.value = getWordList.value[randomNumber]
}

onMounted(async () => {
  await initListWords()
})
</script>

<template>
  <main>
    <div>Mot à trouver {{ wordToFind }}</div>
  </main>
</template>
