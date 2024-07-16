import axios from 'axios';

// Créez une instance Axios avec une configuration par défaut
const apiBibliotechClient = axios.create({
  baseURL: 'http://localhost:8080/bibliotech', // Remplacez par l'URL de votre API
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiBibliotechClient;