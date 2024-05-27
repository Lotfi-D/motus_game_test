<script lang="ts" setup>
import BaseDisplayWords from '@/components/BaseDisplayWords.vue'

const props = defineProps<{
  listWordValidated?: string[],
  wordToFind: string
}>()

const emits = defineEmits(['findLetter'])

const sendIndexValue = (letterIndex: number) => {
  emits('findLetter', letterIndex)
}
</script>

<template>
  <div class="grid gap-4">
    <div v-for="(word, i) in listWordValidated" :key="i" class="flex">
      <BaseDisplayWords 
        :word-to-display="word" 
        :word-to-find="wordToFind" 
        activateLetterPositionClass
        @findLetter="sendIndexValue"
      />
    </div>
  </div>
</template>
