function random (min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

module.exports = function (range) {
    let stringArray = [];
    let string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
    for (let i = 0; i < range; i++) stringArray.push(string[random(0, string.length - 1)]);
    return stringArray.join('')
}

