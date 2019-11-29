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
  <h1 style="text-align: center; display: flex; justify-content: center; align-items: center;"> Hi&nbsp<strong style=color:#4bb592; text-align: center; display: flex; justify-content: center; align-items: center;>${localStorage.getItem("name")}</strong> , lets cook!</h1>
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
