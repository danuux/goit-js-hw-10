const apiKey =
   "live_aPWI84XAvJDjzrEFd0dhGKc23WfvHoI2Ylxf7YjGCy8y9AS7gk0dHGuGRC4juexw";

export async function fetchBreeds() {
  const url = "https://api.thecatapi.com/v1/breeds";

  try {
    const response = await fetch(url, {
      headers: {
        "x-api-key": apiKey
      }
    });

    if (!response.ok) {
      throw new Error("Request failed: " + response.status);
    }

    const data = await response.json();
    return data.map(breed => ({
      id: breed.id,
      name: breed.name
    }));
  } catch (error) {
    throw new Error("Error fetching breeds: " + error.message);
  }
}

export async function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  try {
    const response = await fetch(url, {
      headers: {
        "x-api-key": apiKey
      }
    });

    if (!response.ok) {
      throw new Error("Request failed: " + response.status);
    }

    const data = await response.json();
    const catInfo = {
      imageUrl: data[0].url,
      breedName: data[0].breeds[0].name,
      description: data[0].breeds[0].description,
      temperament: data[0].breeds[0].temperament
    };

    return catInfo;
  } catch (error) {
    throw new Error("Error fetching cat information: " + error.message);
  }
}



