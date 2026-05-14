process.on("message",(message) => {
    console.log(message)
        let suma = 0;
    for(let i = 0; i < 5e10; i++) {
        suma += i;
    }
    process.send(`Suma realizada: ${suma}`)
})