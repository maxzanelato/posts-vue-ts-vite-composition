import { DateTime } from 'luxon';
import { defineStore } from 'pinia';

import { Period } from '@/constants';
import { Post, TimelinePost } from '@/interfaces/posts';

interface PostsState {
  ids: string[];
  all: Map<string, Post>;
  selectedPeriod: Period;
}

function delay() {
  return new Promise<void>((res) => setTimeout(res, 1500));
}

export const usePosts = defineStore('posts', {
  state: (): PostsState => ({
    ids: [],
    all: new Map(),
    selectedPeriod: 'Today',
  }),

  actions: {
    setSelectedPeriod(period: Period) {
      this.selectedPeriod = period;
    },
    async fetchPosts() {
      const res = await window.fetch('/api/posts');

      const data = (await res.json()) as Post[];
      // await delay();

      const ids = new Array<string>();
      const all = new Map<string, Post>();

      for (const post of data) {
        ids.push(post.id);
        all.set(post.id, post);
      }

      this.ids = ids;
      this.all = all;
    },
    createPost: async (post: TimelinePost) => {
      const body = JSON.stringify({
        ...post,
        created: post.created.toISO(),
      });

      return await window.fetch('http://localhost:8000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });
    },
  },

  getters: {
    filteredPosts: (state): TimelinePost[] => {
      return state.ids
        .map((id) => {
          const post = state.all.get(id);

          if (!post) {
            throw Error(
              `post with id of ${id} was expected but not found`
            );
          }

          return {
            ...post,
            created: DateTime.fromISO(post.created),
          };
        })
        .filter((post) => {
          if (state.selectedPeriod === 'Today') {
            return post.created >= DateTime.now().minus({ day: 1 });
          }

          if (state.selectedPeriod === 'This week') {
            return post.created >= DateTime.now().minus({ week: 1 });
          }

          return post;
        });
    },
  },
});
