<script setup lang="ts">
const props = defineProps<{
  wordToDisplay: string,
  wordToFind?: string,
  indexLetterToDisplay?: number[],
  activateLetterPositionClass?: boolean,
  activateLetterVisibilityClass?: boolean
}>()

const emits = defineEmits(['findLetter'])

const letterVisibilityClass = (index: number) => {
  if (props.indexLetterToDisplay) {
    return (props.indexLetterToDisplay.includes(index)) ? '' : 'hidden'
  }
}

const letterPositionClass = (letter: string, index: number) => {
  if (props?.wordToFind?.includes(letter)) {
    if (props?.wordToFind[index] === letter) {
      // I hesitated between using emits or provide inject because we have to send the information to the parent of the parent
      // I chose to make 2 emits, one here and one in the parents because it is only a 2 level parents components 
      emits('findLetter', index)
      return 'bg-red-500'
    } else {
      return 'bg-yellow-500'
    }
  }
  
  return ''
}
</script>

<template>
  <div
    v-for="(letter, index) in wordToDisplay"
    :key="index"
    class="w-12 h-12 border border-gray-500 flex items-center justify-center text-2xl font-bold"
    :class="[activateLetterPositionClass ? letterPositionClass(letter, index) : '']"
  >
    <span :class="letterVisibilityClass(index)">{{ letter }}</span>
  </div>
</template>
