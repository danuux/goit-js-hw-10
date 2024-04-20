import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";

const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfoDiv = document.querySelector(".cat-info");

function showLoader() {
  loader.style.display = "block";
}

function hideLoader() {
  loader.style.display = "none";
}

function showError() {
  error.style.display = "block";
}

function hideError() {
  error.style.display = "none";
}

async function initBreedSelector() {
  showLoader(); 

  try {
    const breeds = await fetchBreeds();

    breeds.forEach(breed => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });

    hideLoader(); 
  } catch (error) {
    showError(); 
    console.error(error.message);
  }
}

initBreedSelector();

breedSelect.addEventListener("change", async (event) => {
  const selectedBreedId = event.target.value;

  showLoader(); 
  hideError(); 

  try {
    const catInfo = await fetchCatByBreed(selectedBreedId);

    catInfoDiv.innerHTML = `
      <img src="${catInfo.imageUrl}" alt="Cat Image">
      <h3>${catInfo.breedName}</h3>
      <p><strong>Description:</strong> ${catInfo.description}</p>
      <p><strong>Temperament:</strong> ${catInfo.temperament}</p>
    `;

    hideLoader();
  } catch (error) {
    showError(); 
    console.error(error.message);
  }
});
