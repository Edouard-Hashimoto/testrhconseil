<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Link.configure({
      openOnClick: false,
      autolink: true,
    }),
    Image.configure({
      inline: false,
      allowBase64: false,
    }),
  ],
  onUpdate({ editor }) {
    emit('update:modelValue', editor.getHTML())
  },
})

// Synchroniser quand modelValue change depuis l'extÃ©rieur (ex: reset du formulaire)
watch(() => props.modelValue, (val) => {
  if (editor.value && editor.value.getHTML() !== val) {
    editor.value.commands.setContent(val || '', false)
  }
})

const addLink = () => {
  const previousUrl = editor.value.getAttributes('link').href
  let url = window.prompt('URL du lien :', previousUrl || 'https://')
  
  if (url === null) return
  
  if (url === '') {
    editor.value.chain().focus().unsetLink().run()
    return
  }

  // Add https:// if missing and not relative
  if (!url.includes('://') && !url.startsWith('/') && !url.startsWith('#')) {
    url = 'https://' + url
  }

  const { from, to } = editor.value.state.selection
  if (from === to) {
    // No selection: insert the URL as clickable text
    editor.value.chain().focus().insertContent(`<a href="${url}">${url}</a>`).run()
  } else {
    // Selection: apply link to selection
    editor.value.chain().focus().setLink({ href: url }).run()
  }
}

const addImage = () => {
  const url = window.prompt('URL de l\'image :')
  if (url) {
    editor.value.chain().focus().setImage({ src: url }).run()
  }
}
</script>

<template>
  <div class="rich-editor">
    
    <div class="toolbar" v-if="editor">
      <button
        type="button"
        @click="editor.chain().focus().toggleBold().run()"
        :class="{ active: editor.isActive('bold') }"
        title="Gras"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M8 11h4.5a2.5 2.5 0 000-5H8v5zm10 4.5a4.5 4.5 0 01-4.5 4.5H6V4h6.5a4.5 4.5 0 013.256 7.606A4.498 4.498 0 0118 15.5zM8 13v5h5.5a2.5 2.5 0 000-5H8z"/></svg>
      </button>

      <button
        type="button"
        @click="editor.chain().focus().toggleItalic().run()"
        :class="{ active: editor.isActive('italic') }"
        title="Italique"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M15 20H7v-2h2.927l2.116-12H9V4h8v2h-2.927l-2.116 12H15z"/></svg>
      </button>

      <div class="toolbar-sep"></div>

      <button
        type="button"
        @click="addLink"
        :class="{ active: editor.isActive('link') }"
        title="InsÃ©rer un lien"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M18.364 15.536L16.95 14.12l1.414-1.414a5 5 0 00-7.071-7.071L9.879 7.05 8.464 5.636 9.88 4.222a7 7 0 019.9 9.9l-1.415 1.414zm-2.828 2.828l-1.415 1.414a7 7 0 01-9.9-9.9l1.415-1.414L7.05 9.88l-1.414 1.414a5 5 0 007.071 7.071l1.414-1.414 1.415 1.414zm-.708-10.607l1.415 1.415-7.071 7.07-1.415-1.414 7.071-7.071z"/></svg>
      </button>

      <button
        type="button"
        @click="editor.chain().focus().unsetLink().run()"
        :disabled="!editor.isActive('link')"
        title="Retirer le lien"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M17 17h5v2h-5v-2zm-8-2H4v-2h5v2zM9.879 7.05l1.414 1.414L9.88 9.878 8.464 8.464 9.88 7.05zM3.515 20.485a9.004 9.004 0 010-12.728L6.343 4.93l1.415 1.414L4.93 9.17a7 7 0 009.9 9.9l2.828-2.828 1.414 1.414-2.828 2.828a9.004 9.004 0 01-12.728 0zm13.435-7.778l-1.414-1.414 1.414-1.414 1.414 1.414-1.414 1.414z"/></svg>
      </button>

      <div class="toolbar-sep"></div>

      <button
        type="button"
        @click="addImage"
        title="InsÃ©rer une image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M5 11.1l2-2 5.5 5.5 3.5-3.5 3 3V5H5v6.1zm0 2.829V19h3.1l2.986-2.985L7 11.929l-2 2zM10.929 19H19v-2.071l-3-3L10.929 19zM4 3h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1zm11.5 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/></svg>
      </button>

      <div class="toolbar-sep"></div>

      <button
        type="button"
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ active: editor.isActive('bulletList') }"
        title="Liste Ã  puces"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M8 4h13v2H8V4zM4.5 6.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 6.9a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM8 11h13v2H8v-2zm0 7h13v2H8v-2z"/></svg>
      </button>
    </div>

    
    <EditorContent :editor="editor" class="editor-content" />
  </div>
</template>

<style scoped>
.rich-editor {
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  background: #f8fafc;
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.rich-editor:focus-within {
  border-color: #e91e8c;
  box-shadow: 0 0 0 3px rgba(233,30,140,0.08);
  background: #fff;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 0.4rem 0.5rem;
  border-bottom: 1.5px solid #e2e8f0;
  background: #fff;
  flex-wrap: wrap;
}

.toolbar button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.3rem 0.45rem;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  color: #475569;
  transition: background 0.15s, color 0.15s;
  line-height: 1;
}

.toolbar button:hover {
  background: #f1f5f9;
  color: #1e293b;
}

.toolbar button.active {
  background: rgba(233,30,140,0.1);
  color: #e91e8c;
}

.toolbar button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.toolbar-sep {
  width: 1px;
  height: 18px;
  background: #e2e8f0;
  margin: 0 4px;
}

.editor-content {
  min-height: 150px;
  padding: 0.7rem 0.9rem;
  font-size: 0.9rem;
  color: #1e293b;
  line-height: 1.6;
  cursor: text;
}

.editor-content :deep(.ProseMirror) {
  outline: none;
  min-height: 130px;
}

.editor-content :deep(.ProseMirror p) {
  margin: 0 0 0.5em;
}

.editor-content :deep(.ProseMirror p:last-child) {
  margin-bottom: 0;
}

.editor-content :deep(.ProseMirror strong) {
  font-weight: 700;
}

.editor-content :deep(.ProseMirror a) {
  color: #e91e8c;
  text-decoration: underline;
}

.editor-content :deep(.ProseMirror img) {
  max-width: 100%;
  border-radius: 8px;
  margin: 0.5rem 0;
}

.editor-content :deep(.ProseMirror ul) {
  padding-left: 1.5rem;
  margin: 0.4rem 0;
  list-style: disc;
}

.editor-content :deep(.ProseMirror p.is-editor-empty:first-child::before) {
  content: attr(data-placeholder);
  color: #94a3b8;
  pointer-events: none;
  float: left;
  height: 0;
}
</style>
