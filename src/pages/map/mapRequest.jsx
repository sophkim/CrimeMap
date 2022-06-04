const options = {
  method: "POST",
  headers: {
    Accept: "application/json",
    appKey: "l7xxfdc75c1509a74ecdba02bf5e024ee9d5",
  },
};

fetch("https://apis.openapi.sk.com/tmap/routes/routeOptimization20", options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
