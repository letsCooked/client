function bored() {
  return new Promise(function(resolve, reject) {
    $.ajax({
      method: "get",
      url: "http://localhost:3000/bored"
    })
      .done(data => {
        resolve(data.activity);
      })
      .fail(err => {
        reject(err);
      });
  });
}
