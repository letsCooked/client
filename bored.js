function bored() {   
    $.ajax({
        method: 'get',
        url: 'http://localhost:3000/bored'
    })
    .done(data => {
        return data.activity
    })
    .fail(err => {
        console.log(err)
    })
}