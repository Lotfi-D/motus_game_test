import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useWordsStore = defineStore('words', () => {
  const wordsList = ref<string[]>([])

  const getWordList = computed(() => wordsList.value)

  const addWordsList = (wordsListParams: string[]) => {
    wordsList.value = wordsListParams
  }

  return {
    wordsList,
    addWordsList,
    getWordList 
  }
}, { persist: true})
