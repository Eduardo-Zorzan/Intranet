const path = require('path') //CommonJS

module.exports = { //module.exports serve como um return para o arquivo js, sem o module.exports
                   //não é possivel acessar nada desse arquivo em outros arquivos.
                   //OBS: apenas o que está dentro desse objeto será exportado
    mode: 'production',//há duas opções para mode 'production' (gera o codigo em uma linha somente)
                       //e 'development' que abre mais o código para maior facilidade de interpreta-lo
    entry: './frontend/main.js',
    output: {
       path: path.resolve(__dirname, 'public', 'assets', 'js'),
       filename: 'bundle.js'
    },
    module: {
        rules: [{
            exclude: /node_modules/,
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/env']
                }
            }
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    },
    devtool: 'source-map'
}