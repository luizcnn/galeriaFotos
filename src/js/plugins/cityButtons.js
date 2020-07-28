import $ from 'jquery'
import { onLoadHtmlSuccess } from '../core/includes'

const duration = 400 // duração do fadeIn/Out em milisegundos

function filterByCity(city) {
    $('[wm-city]').each(function(i, e) {
        // Em isTarget, iremos verificar se o elemento que captamos e o parâmetro da função são os mesmos
        // Se passado null, isso quer dizer que o filtro irá exibir todas as cidades.
        const isTarget = $(this).attr('wm-city') === city || city === null

        if(isTarget){
            // Se for um target, removemos a classe bootstrap d-none e fazemos um fadeIn
            $(this).parent().removeClass('d-none')
            $(this).fadeIn(duration)
        } else {
            // se não, fazemos um fadeOut no elemento, e adicionamos no seu parent a classe bootstrap d-none
            $(this).fadeOut(duration, () => {
                $(this).parent().addClass('d-none')
            })
        }
    })
}

function desactiveElements(btnSelected){
    $('button').each(function (i, e){
        if(e !== btnSelected){
            $(e).removeClass('active')
        }
    })
}

$.fn.cityButtons = function() {
    // const cityButtons = $('[wm-city-buttons]')
    // Critamos as cidades como um Set, para que não venham repetições!
    const cities = new Set
    $('[wm-city]').each(function(i,e){
        cities.add($(e).attr('wm-city'))
    })
    // Convertemos o set em um Array, para podermos usar as funcionalidades dos Arrays.
    const buttons = Array.from(cities).map(city => {
        // No map, estamos criando os botões, com o label do botão sendo o nome da cidade
        const btn = $('<button>').addClass('btn btn-info').html(city)
        // Interceptando o evento do click do botão, chamando a função filterByCity passando a cidade que
        // o botão está representando
        btn.click(function(e) {
            filterByCity(city)
            $(this).addClass('active')
            desactiveElements(this)
        })
        return btn
    })
    // Criando o botão para exibir todas as cidades
    const btnAll = $('<button>').addClass('btn btn-info active').html('Todas')

    btnAll.click(function(e) {
        filterByCity(null)
        $(this).addClass('active')
        desactiveElements(this)
    })
    // Adicionando aos botoões o btnAll
    buttons.push(btnAll)
    // Criando uma div com a classe bootstrap btn-group
    const btnGroup = $('<div>').addClass('btn-group')
    // Adicionando os botões ao btnGroup
    btnGroup.append(buttons)

    // Adicionando no html o btnGroup aos elementos que possuirão o atributo ['wm-city-buttons']
    $(this).html(btnGroup)

    return this
}

onLoadHtmlSuccess( function() {
    $('[wm-city-buttons]').cityButtons()
})

