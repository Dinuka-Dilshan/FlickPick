export const searchMovies = async () => {
  fetch("http://localhost:5000/?searchText=Avatar: The Last Airbender")
    .then((res) => res.text())
    .then((data) => console.log(data));
};
