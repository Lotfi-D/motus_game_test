import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseDisplayWords from '../BaseDisplayWords.vue'

describe('test function letterPositionClass', () => {
  it('should return the class yellow because the letter exists in the word but it is put in the wrong position', () => {
    const wrapper = mount(BaseDisplayWords, {
      props: {
        wordToFind: 'MADAME',
        wordToDisplay: ' PLAIRE'
      }
    })
    const instance: any = wrapper.vm
    const result = instance.letterPositionClass('A', 2)

    expect(result).toBe('bg-yellow-500')

  })

  it('should return the class red because the letter exists in the word and it is put in the right position', () => {
    const wrapper = mount(BaseDisplayWords, {
      props: {
        wordToFind: 'MADAME',
        wordToDisplay: 'MARCHE'
      }
    })
    const instance: any = wrapper.vm
    const result = instance.letterPositionClass('A', 1)

    expect(result).toBe('bg-red-500')

  })

  it('should return an empty class because the letter does not exist in the word', () => {
    const wrapper = mount(BaseDisplayWords, {
      props: {
        wordToFind: 'ASSISE',
        wordToDisplay: 'AVIONS'
      }
    })
    const instance: any = wrapper.vm
    const result = instance.letterPositionClass('V', 1)

    expect(result).toBe('')

  })
})
