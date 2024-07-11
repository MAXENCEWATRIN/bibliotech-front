<template>
    <div class="book-card">
        <img :src="bookCoverUrl" alt="Book Cover" class="book-cover" />
        <div class="book-details">
            <h2>{{ book.title }}</h2>
            <p>{{ book.authorName || 'Unknown Author' }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from 'vue';
import { BookResponse } from '../model/BookResponse';
import defaultCover from '../assets/404_temp.jpg';

export default defineComponent({
    props: {
        book: {
            type: Object as PropType<BookResponse>,
            required: true
        }
    },
    setup(props) {
        const bookCoverUrl = computed(() => {
            return props.book.coverPageUrl || defaultCover;
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
}

.book-cover {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
}

.book-details {
    margin-top: 10px;
}
</style>