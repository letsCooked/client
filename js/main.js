
const baseURL = 'http://localhost:3000'

$(document).ready(function () {
  islogin()

  $('#btn-register').on('click', function (e) {
    e.preventDefault()
    getRegister()
  })

  $('#btn-login').on('click', function (e) {
    e.preventDefault()
    getLogin()
  })

})

function islogin() {
  if (localStorage.getItem('token')) {
    $('#notlogin').hide()
    $('#home').show()
    $('.recipe').hide()
    $('#weather').show()
    getWeather()
    welcome()
  } else {
    $('#notlogin').show()
    $('#home').hide()
    $('#weather').hide()


  }
}

$('#selectCity').change(() => {
  let city = $('#selectCity').val()
  getWeather(city)
  // genRecipe()
})

function getWeather(city) {
  $.ajax({
    method: 'get',
    url: `https://api.weatherbit.io/v2.0/current?city=${city}&key=82ff47dc6ed4480ea25799d00911aa63`
  })
    .done(weather => {
      console.log(weather);
      console.log(weather.data[0])
      let data = weather.data[0]
      $(`#weatherData`).html(`
      <img src = "https://www.weatherbit.io/static/img/icons/${data.weather.icon}.png" alt = "" style = "width: 150px; margin:0" >
      <div id=weather-content class=basic>
        <h4>${data.weather.description}</h4>
        <p>${data.city_name} ${data.country_code}<p>
          <p>${data.timezone}</p>
          <p><strong>${data.datetime}</strong></p>
          <p>temperature : ${data.temp}°C</p>
        </div>
          `)
      genRecipe()
      $('.recipe').show()


    })
    .fail(err => {
      console.log(err)
    })
}

function edamam(keyword) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      method: "get",
      url: `${baseURL}/recipe/${keyword}`
    })
      .done(recipes => {
        resolve(recipes.hits[0].recipe)
      })
      .fail(error => {
        reject(error)
      });
  })
}
function genRecipe() {
  Swal.showLoading();
  let activity;
  bored()
    .then(data => {
      activity = data;
      return edamam(data);
    })
    .then(recipe => {

      $('#recipe-ingredients').empty()
      $('#recipe-vitamins').empty()
      $('#bored-activity').html(`------ ${activity} ------`)
      $("#recipe-from-edamam").html(`${recipe.label}`);
      $("#recipe-image").html(
        `<img src=${recipe.image} alt="" class="mx-auto d-block">`
      );
      for (let i = 0; i < recipe.ingredientLines.length; i++) {
        $("#recipe-ingredients")
          .append(`<div class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input" id="customCheck${i}">
            <label class="custom-control-label" for="customCheck${i}">${recipe.ingredientLines[i]}</label>
            </div>`);
      }
      for (let i = 0; i < Object.keys(recipe.totalNutrients).length; i++) {
        if (
          recipe.totalNutrients[
            Object.keys(recipe.totalNutrients)[i]
          ].label.includes("Vitamin")
        ) {
          $("#recipe-vitamins").append(`
                  <button class="btn-sm">${
            recipe.totalNutrients[Object.keys(recipe.totalNutrients)[i]]
              .label
            }</button>
                `);
        }
      }
      Swal.close()

    });
  // });
}

