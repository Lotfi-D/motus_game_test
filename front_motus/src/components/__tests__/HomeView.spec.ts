import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '../../views/HomeView.vue'
import { createPinia, setActivePinia } from 'pinia';

describe('test submit function', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should decrement attempt ', () => {
    const wrapper = mount(HomeView)
    const instance: any = wrapper.vm

    instance. attempt = 7    
    instance.submit()

    expect(instance. attempt).toBe(6)    
  })

  it('should return wordToPush to uppercase ', () => {
    const wrapper = mount(HomeView)
    const instance: any = wrapper.vm

    instance.wordToPush = 'plaire'

    expect(instance.wordToPushUpperCase).toBe('PLAIRE') 
  })
})

describe('test restartGame function', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });


  it('should reinitialize attempt, listWordPushed and indexLetterToDisplay', async () => {
    const wrapper = mount(HomeView)
    const instance: any = wrapper.vm

    instance.attempt = 2
    instance.listWordPushed = ['AVIONS', 'PAPIER']
    instance.indexLetterToDisplay = [0, 3, 5]

    await instance.restartGame()

    expect(instance.attempt).toBe(7)   
    expect(instance.listWordPushed.length).toBe(0)
    expect(instance.indexLetterToDisplay).toEqual([0])
  })
})
