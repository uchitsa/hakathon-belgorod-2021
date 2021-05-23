import axios from "axios";

export async function getData(type = "events") {
  var config = {
    method: "GET",
    url: "https://elpodzayv.000webhostapp.com/proxy.php?type=" + type,
  };
  var data;
  await axios(config)
    .then(function (response) {
      // console.log(response.data[Object.keys(response.data)[0]]);
      if (response === "false") {
        data = false;
      } else {
        data = response.data[Object.keys(response.data)[0]];
      }
    })
    .catch(function (error) {
      data = false;
    });
  return data;
}
