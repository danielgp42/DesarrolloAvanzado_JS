// Implementa las Solicitudes con Fetch
const fetchBtn = document.getElementById('fetch-btn');
const dataContainer = document.getElementById('data-container');

fetchBtn.addEventListener('click', () => {
  dataContainer.innerHTML = 'Cargando datos con Fetch...'; // Mensaje de carga
  fetch('https://rickandmortyapi.com/api/character')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      // Completado: renderizar datos en el contenedor
      // Pista: Usa `data.results` para iterar sobre los personajes obtenidos.
      renderCharacters(data.results);
    })
    .catch(error => {
      console.error('Error con Fetch:', error);
      dataContainer.innerHTML = '<p style="color: red;">Hubo un error al obtener los datos con Fetch.</p>';
    });
});

const axiosBtn = document.getElementById('axios-btn');

axiosBtn.addEventListener('click', () => {
  dataContainer.innerHTML = 'Cargando datos con Axios...'; // Mensaje de carga
  axios.get('https://rickandmortyapi.com/api/character')
    .then(response => {
      const data = response.data;
      // Completado: renderizar datos en el contenedor
      // Pista: Observa que Axios ya convierte la respuesta JSON, por lo que no necesitas usar `.json()`.
      renderCharacters(data.results);
    })
    .catch(error => {
      console.error('Error con Axios:', error);
      // Axios a menudo tiene un `response` dentro del objeto `error` para más detalles.
      if (error.response) {
        dataContainer.innerHTML = `<p style="color: red;">Hubo un error al obtener los datos con Axios: ${error.response.status} - ${error.response.statusText}</p>`;
      } else {
        dataContainer.innerHTML = '<p style="color: red;">Hubo un error al obtener los datos con Axios.</p>';
      }
    });
});

// Función de renderizado:
// Puedes adecuar este código
function renderCharacters(characters) {
  dataContainer.innerHTML = '';
  if (characters && characters.length > 0) {
    characters.forEach(character => {
      const characterElement = document.createElement('div');
      characterElement.innerHTML = `
        <h3>${character.name}</h3>
        <img src="${character.image}" alt="${character.name}">
      `;
      dataContainer.appendChild(characterElement);
    });
  } else {
    dataContainer.innerHTML = '<p>No se encontraron personajes.</p>';
  }
}