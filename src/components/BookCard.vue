<template>
    <div class="book-card">
        <img :src="book.coverPageUrl" alt="Book Cover" class="book-cover" />
        <div class="book-details">
            <h2>{{ book.title }}</h2>
            <p>{{ book.authorName || 'Unknown Author' }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { BookResponse } from '../model/BookResponse';

export default defineComponent({
    props: {
        book: {
            type: Object as PropType<BookResponse>,
            required: true
        }
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