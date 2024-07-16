import axios from 'axios';

// Créez une instance Axios avec une configuration par défaut
const apiBibliotoClient = axios.create({
  baseURL: 'http://localhost:8080/biblioto', // Remplacez par l'URL de votre API
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiBibliotoClient;