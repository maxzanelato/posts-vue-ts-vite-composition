<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">
          {{ post.title }}
        </div>
        <input type="text" class="input" v-model="title" />
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <div class="columns is-mobile">
        <div class="column is-half">
          <div
            contenteditable
            ref="contentEditable"
            @input="handleInput"
          />
        </div>
        <div class="column">
          <div v-html="html" />
        </div>
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <button class="button is-primary is-pulled-right">
        Save post
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

import { marked } from 'marked';
import debounce from 'lodash/debounce';
import highlightjs from 'highlight.js';

import { TimelinePost } from '@/interfaces/posts';

const props = defineProps<{
  post: TimelinePost;
}>();

const html = ref('');
const title = ref(props.post.title);
const content = ref(props.post.markdown);
const contentEditable = ref<HTMLDivElement>();

const handleInput = () => {
  if (!contentEditable.value) {
    throw Error('ContentEditable DOM node was not found');
  }
  content.value = contentEditable.value?.innerText;
};

const parseHtml = (markdown: string) => {
  marked.parse(
    markdown,
    {
      gfm: true,
      breaks: true,
      highlight: (code) => highlightjs.highlightAuto(code).value,
    },
    (err, parseResult) => {
      html.value = parseResult;
    }
  );
};

watch(
  content,
  debounce((newContent) => {
    parseHtml(newContent);
  }, 250),
  {
    immediate: true,
  }
);

onMounted(() => {
  if (!contentEditable.value) {
    throw Error('ContentEditable DOM node was not found');
  }

  contentEditable.value.innerText = content.value;
});
</script>

<style lang="" scoped></style>
