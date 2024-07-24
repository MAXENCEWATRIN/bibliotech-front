import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useBookStore } from '../store/bookStore';
import type { GetOneBookResponse } from '../model/GetOneBookResponse';
import router from '@/router';

const URL = 'http://localhost:8080/bibliotech/ws';
let stompClient: Stomp.Client | null = null;

export function connectWebSocket() {
    const socket = new SockJS(URL);
    stompClient = Stomp.over(socket);
    const bookStore = useBookStore();

    stompClient.connect({}, () => {
        stompClient?.subscribe('/topic/books', (message: { body: string; }) => {
            const response: GetOneBookResponse = JSON.parse(message.body);
            if (response.success) {
                bookStore.setBook(response.data);
            } else {
                console.error('Failed to receive a valid book response');
            }
            router.push({ name: 'Home' }).then(() => {
                router.push({ name: 'BookForm'})
              })
        });
    });
}

export function disconnectWebSocket() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
}