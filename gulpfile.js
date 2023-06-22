/*################################################################################*/

/*Variáveis*/

// Pacote de funções do Gulp
const gulp = require("gulp")

// Pacote que minimiza o JavaScript
const uglify = require("gulp-uglify")
// Pacote que deixa o código JavaScript ilegível
const obfuscate = require("gulp-obfuscate")

// Pacote que liga o sass com gulp e o outro que compila
const sass = require("gulp-sass")(require("sass"))
// Pacote que cria um mapa que direciona o local do código no sass
const sourcemaps = require("gulp-sourcemaps")

// Pacote que comprime imagens sem perder a qualidade
const imagemin = require("gulp-imagemin")

/*################################################################################*/

/*Função que comprime/minimiza o JavaScript*/
function minimizaJavascript()
{
    // Dizendo o local onde está o arquivo
    return gulp.src("./source/scripts/*.js")
    // Minimizando o arquivo
    .pipe(uglify())
    // Deixa o código ilegível
    .pipe(obfuscate())
    // Dizendo o local para onde ele deve ir após o processo
    .pipe(gulp.dest("./build/scripts/"))
}

/*################################################################################*/

/*Função que compila o arquivo Sass*/
function compilaSass()
{
    // Dizendo o local onde está o arquivo
    return gulp.src("./source/styles/main.scss")
    // Iniciando a coleta de dados para o mapa
    .pipe(sourcemaps.init())
    // Compitlando o arquivo sass
    .pipe(sass(
        {
            outputStyle: "compressed"
        }
    ))
    // Criando mapa a partir dos dados coletados
    .pipe(sourcemaps.write("./maps"))
    // Dizendo o local para onde ele deve ir após o processo
    .pipe(gulp.dest("./build/styles/"))
}

/*################################################################################*/

/*Função que comprime as Imagens*/
function comprimeImagem()
{
    // Dizendo o local onde estão os arquivos
    return gulp.src("./source/images/*")
    // Comprime as imagens
    .pipe(imagemin())
    // Dizendo o local para onde ele deve ir após o processo
    .pipe(gulp.dest("./build/images"))
}

exports.default = function ()
{
    gulp.watch("./source/scripts/*.js", {ignoreInitial: false}, gulp.series(minimizaJavascript))
    gulp.watch("./source/styles/main.scss", {ignoreInitial: false}, gulp.series(compilaSass))
    gulp.watch("./source/images/", {ignoreInitial: false}, gulp.series(comprimeImagem))
}