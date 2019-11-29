function edamam(keyword) {
  return new Promise(function(resolve,reject){
    $.ajax({
      method: "get",
      url: `http://localhost:3000/edamam/${keyword}`
    })
      .done(recipes => {
        resolve(recipes.hits[0].recipe)
      })
      .fail(error => {
        reject(error)
      });
  })
}
