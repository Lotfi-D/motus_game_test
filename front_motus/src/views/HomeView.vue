<script setup lang="ts">
import { onMounted, computed, ref, reactive } from 'vue';
import wordServices from '../services/wordsServices'
import { storeToRefs } from 'pinia'
import { useWordsStore } from '@/stores/words'
import BaseDisplayWords from '@/components/BaseDisplayWords.vue'
import BaseGridWords from '@/components/BaseGridWords.vue'
import type { TStats } from '@/types/words';

const store = useWordsStore()
const { getWordList } = storeToRefs(store)
const { addWordsList } = store

const wordToFind = ref<string>('')
let attempt = ref<number>(7)
const indexLetterToDisplay = ref<number[]>([0])
const wordToPush = ref<string>('')
const listWordPushed = ref<string[]>([])

const stats = reactive<TStats>({
  gameNumbers: 0,
  gameWon: 0,
  gameLost: 0,
})

const wordToPushUpperCase = computed(() => wordToPush.value.toUpperCase())

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

const submit = () => {
  listWordPushed.value.push(wordToPushUpperCase.value)
  attempt.value--

  if (wordToFind.value === wordToPushUpperCase.value) {
    endGame('won')
  } else {
    // I decide to transform the array in set because searching in a set is more performant than in an array which contains lots of data
    const getWordListSet = new Set(getWordList.value)
    const isExist = getWordListSet.has(wordToPushUpperCase.value)

    if (!isExist || attempt.value === 0) {
      endGame('lost')
    }
  }

  wordToPush.value = ''
}

const endGame = (type: string) => {
  console.log('end')
  stats.gameNumbers++
  if (type === 'won') {
    stats.gameWon++
  } else {
    stats.gameLost++
  }
  setTimeout(() => {
    alert(`You ${type} this game`)
    restartGame()
  }, 100)
}

const restartGame = async () => {
  await initListWords()
  attempt.value = 7
  listWordPushed.value = []
  indexLetterToDisplay.value = [0]
}

const addDisplayedLetter = (letterIndex: number) => {
  indexLetterToDisplay.value.push(letterIndex)
}

onMounted(async () => {
  await initListWords()
})
</script>

<template>
  <main>
    <div class="flex justify-between">
      <div class="pl-5">
        Il vous reste {{ attempt }} tentatives
      </div>
      <div class="flex">
        <span class="mr-5">Essayez de trouver le mot suivant:</span>
        <BaseDisplayWords 
          :word-to-display="wordToFind" 
          :index-letter-to-display="indexLetterToDisplay" 
        />
      </div>
      <div class="flex flex-col pr-5">
        <span>nb de parties : {{ stats.gameNumbers }}</span>
        <span>Parties gagnées : {{ stats.gameWon }}</span>
        <span>Parties perdues : {{ stats.gameLost }}</span>
      </div>
    </div>
    <div class="flex justify-center mt-6 mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2 mr-2">
        Entrez votre proposition
      </label>
      <input 
        v-model.trim="wordToPush"
        class="border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        @keyup.enter="submit"
      />
    </div>
    <div class="flex justify-center">
      <BaseGridWords 
        :list-word-validated="listWordPushed"
        :word-to-find="wordToFind"
        @findLetter="addDisplayedLetter"
      />
    </div>
  </main>
</template>
