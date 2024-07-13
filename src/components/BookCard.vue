<template>
    <div class="book-card">
        <router-link :to="{ name: 'BookForm', params: { id: book.id } }">
            <img :src="bookCoverUrl" alt="Book Cover" class="book-cover" />
            <div class="book-details">
                {{ book.title }}
                <p>{{ book.authorName || 'Unknown Author' }}</p>
            </div>
        </router-link>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from 'vue';
import type { BookResponse } from '../model/BookResponse';
import defaultCover from '../assets/cover_page_1.jpg';

export default defineComponent({
    props: {
        book: {
            type: Object as PropType<BookResponse>,
            required: true
        }
    },
    setup(props) {
        const bookCoverUrl = computed(() => {
            return props.book.cover || defaultCover;
        });

        return {
            bookCoverUrl
        };
    }
});
</script>

<style>
.book-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background-color: #1f2937;
}

.book-cover {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
}

.book-details {
    margin-top: 10px;
    background-color: #1f2937;
}
</style>