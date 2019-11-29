function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  Swal.fire({
    title: `Connecting to server...`,
    allowOutsideClick: () => !Swal.isLoading()
  });
  Swal.showLoading();
  $.ajax({
    url: `${baseURL}/user/google`,
    method: 'post',
    data: {
      token: id_token
    }
  })
    .done(({ token, name }) => {
      localStorage.setItem('token', token)
      localStorage.setItem('name', name)
      islogin()
      Swal.close()
      Swal.fire('Success!', "Your Account is Logged in!", 'success')
    })
    .fail(err => {
      let msg = "Fail to Login";
      Swal.fire("Error!", msg, "error");
    })
}

function getRegister() {
  let name = $('#nameRegister').val()
  let email = $('#emailRegister').val()
  let password = $('#passwordRegister').val()

  Swal.fire({
    title: `Creating Your Account...`,
    allowOutsideClick: () => !Swal.isLoading()
  });
  Swal.showLoading();

  $.ajax({
    url: `${baseURL}/user/register`,
    method: `post`,
    data: {
      name, email, password
    }
  })
    .done(({ token, name }) => {
      islogin()
      Swal.close()
      Swal.fire('Success!', "Your Account is Created!", 'success')
      $wrap.addClass('loginActive');
      $wrap.removeClass('singUpActive');
    })
    .fail(err => {
      let error = err.responseJSON
      Swal.fire("Error!", `${error.message}`, "error");
    })
    .always(() => {
      $('#nameRegister').val('')
      $('#emailRegister').val('')
      $('#passwordRegister').val('')
    })
}


function getLogin() {
  let email = $('#emailLogin').val()
  let password = $('#passwordLogin').val()

  Swal.fire({
    title: `Connecting to Server...`,
    allowOutsideClick: () => !Swal.isLoading()
  });
  Swal.showLoading();

  $.ajax({
    url: `${baseURL}/user/login`,
    method: `post`,
    data: {
      email, password
    }
  })
    .done(({ token, name }) => {
      localStorage.setItem('token', token)
      localStorage.setItem('name', name)
      islogin()
      Swal.close()
      Swal.fire('Success!', "Your Account is Logged in!", 'success')
    })
    .fail(err => {
      Swal.fire("Error!", err.responseJSON.message, "error");
    })
    .always(() => {
      $('#emailLogin').val('')
      $('#passwordLogin').val('')
    })
}

function signOut() {
  if (gapi.auth2) {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    });
  }
  localStorage.clear()
  sessionStorage.clear()

  islogin()
  Swal.fire('Success!', "Your Account is Logged out!", 'success')
}

function welcome() {
  $('#note').empty()
  $('#note').append(`
  <h1 style="text-align: center; display: flex; justify-content: center; align-items: center;"> Hi&nbsp<strong style=color:rgb(248,164,27); text-align: center; display: flex; justify-content: center; align-items: center;>${localStorage.getItem("name")}</strong> , lets cook!</h1>
  `)
}

function setAvatar() {
  $('#ava').empty()
  let name = localStorage.getItem('name')
  $('#ava').append(`
  <img src="https://ui-avatars.com/api/?name=${name}&rounded=true" 
  style="border-radius: 50%; border: 1px solid #2b2b28; width:40px;"> <br> <br>
  <a href=# onclick="signOut()" class="btnbasic ui tiny button" style="width: 100px; padding: 5px;"> Logout </a>
  `)
}

// function getWeather() {
//   $.ajax({
//     method: 'get',
//     url: `https://api.weatherbit.io/v2.0/current?lat=-6.258407&lon=106.781166&key=82ff47dc6ed4480ea25799d00911aa63`
//     // url: `https://api.weatherbit.io/v2.0/current?city=Bandung,ID&key=82ff47dc6ed4480ea25799d00911aa63`
//   })
//     .done(weather => {
//       console.log(weather);
//       console.log(weather.data[0])
//       let data = weather.data[0]
//       $(`#weather`).html(`
//     <img src = "https://www.weatherbit.io/static/img/icons/${data.weather.icon}.png" alt = "" style = "width: 90px; margin:0" >
//     <div id=weather-content class=basic>
//       <h4>${data.weather.description}</h4>
//       <p>${data.city_name} ${data.country_code}<p>
//         <p>${data.timezone}</p>
//         <p><strong>${data.datetime}</strong></p>
//         <p>temperature : ${data.temp}°C</p>
//       </div>
//         `)
//     })
//     .fail(err => {
//       console.log(err)
//     })
// }

var $wrap = $('#main');
var $signUpBtn = $wrap.find('#signUpBtn');
var $loginBtn = $wrap.find("#loginBtn");

$signUpBtn.on('click', function () {
  $wrap.addClass('singUpActive');
  $wrap.removeClass('loginActive');
});

$loginBtn.on('click', function () {
  $wrap.addClass('loginActive');
  $wrap.removeClass('singUpActive');
});
