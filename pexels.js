const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const imageResults = document.getElementById('imageResults');
const showmore = document.getElementById('more');

const apiKey = 'Add your api key here';

searchButton.addEventListener('click', searchImages);
showmore.addEventListener('click',show);
function show(){
  searchImages();
}
async function searchImages() {
  const query = searchInput.value.trim();
  if (query === '') 
  {
    alert("Enter something")
  }
  const url = `https://pexelsdimasv1.p.rapidapi.com/v1/search?query=${encodeURIComponent(query)}&locale=en-US&per_page=15&page=1`;

  const options = {
    method: 'GET',
    headers: {
      Authorization: apiKey,
      'X-RapidAPI-Key': 'e15732b88amsh5da955e4d55a72bp1f8478jsn8a216880b248',
      'X-RapidAPI-Host': 'PexelsdimasV1.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data)
    displayImages(data);
  } catch (error) {
    console.error(error);
  }
}

function displayImages(data) {
  imageResults.innerHTML = '';

  
  data.photos.forEach(photo => {
    const imageCard = document.createElement('div');
    imageCard.className = 'imageCard';

    const image = document.createElement('img');
    image.src = photo.src.large2x;
    image.alt = photo.photographer;
    imageCard.appendChild(image);

    const photographer = document.createElement('p');
    photographer.textContent = `Photographer: ${photo.photographer}`;
    imageCard.appendChild(photographer);

    imageResults.appendChild(imageCard);
  });
}
