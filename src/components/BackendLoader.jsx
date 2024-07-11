

const backendLoader = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    console.log('response', response)
    return data;
  }