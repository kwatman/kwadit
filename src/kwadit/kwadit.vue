<script setup lang="ts">
import { ref, shallowRef, defineAsyncComponent } from 'vue'
import actionLoader from './actionLoader'
const props = defineProps({
  msg: String
})

const editor = ref(null)
const actions = shallowRef([])
actionLoader().then((res) => {
  console.log(res)
  actions.value = res
})

const insertH1 = () => {
  const heading = document.createElement('h1')
  heading.contentEditable = true
  heading.innerText = 'Heading'

  const selection = window.getSelection()
  const range = selection.getRangeAt(0)

  const currentNode = range.startContainer.parentNode
  if (currentNode.tagName === 'H1') {
    editor.value.focus()
    return // Do nothing if caret is already within an <h1> element
  }

  if (range.toString().length > 0) {
    // If text is selected, wrap it with <h1>
    const heading = document.createElement('h1')
    range.surroundContents(heading)
  } else {
    // If no text is selected, insert an <h1> element
    const heading = document.createElement('h1')
    heading.contentEditable = true
    heading.innerText = 'Your Heading'
    range.insertNode(heading)
    range.collapse(false)
    selection.removeAllRanges()
    selection.addRange(range)
  }

  editor.value.focus()
}

const addContentEditableButton = () => {
  const button = document.createElement('button')
  button.contentEditable = true
  button.innerText = 'Button Text'

  const selection = window.getSelection()
  const range = selection.getRangeAt(0)
  range.insertNode(button)
  range.collapse(false)
  selection.removeAllRanges()
  selection.addRange(range)

  editor.value.focus()
}
</script>

<template>
  <div class="editor">
    <div class="actions">
      <button @click="insertH1">h1</button>
      <button @click="addContentEditableButton">Add Content Editable Button</button>
      <template v-for="(action, index) in actions" :key="index">
        <component :is="action?.component"></component>
      </template>
    </div>
    <div class="editablearea" ref="editor" contenteditable="true"></div>
  </div>
</template>

<style>
.editablearea {
  width: 100%;
  min-height: 100px;
  font-family: Arial, Helvetica, sans-serif;
  border: 1px solid black;
}
.editor {
  border: 2px solid black;
  padding: 10px;
}
.actions {
  display: flex;
  margin-bottom: 10px;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
