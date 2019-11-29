function bored() {
    $.ajax({
        method: 'get',
        url: 'http://localhost:3000/cook'
    })
        .done(data => {
            return data.activity
        })
        .fail(err => {
            console.log(err)
        })
}
