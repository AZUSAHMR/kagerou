'use strict'

window.addEventListener('load', function(e) {

  [].map.call($('.menu li[data-page]'), _ => {
    let target = _.getAttribute('data-page')
    _.addEventListener('click', function() {
      $('section.active', 0).classList.remove('active')
      $(`section[data-page='${target}']`, 0).classList.add('active')

      $('header h2', 0).textContent = _.textContent
    })
  })

  ;[].map.call($('input[data-config-key]'), _ => {
    let placeholder = _.getAttribute('placeholder')
    _.value = config.get(_.getAttribute('data-config-key')) || ''
    // placeholder glitch workaround
    _.setAttribute('placeholder', '')
    _.setAttribute('placeholder', placeholder)
  })

  ;[].map.call($('.input-value'), _ => {
    let target = $('#' + _.getAttribute('for'))
    _.textContent = config.get(target.getAttribute('data-config-key'))

    target.addEventListener('input', function(e) {
      _.textContent = this.value
    })
  })

  ;[].map.call($('.input-value-color'), _ => {
    let target = $('#' + _.getAttribute('for'))
    _.style.backgroundColor = config.get(target.getAttribute('data-config-key'))

    target.addEventListener('input', function(e) {
      _.style.backgroundColor = this.value
    })
  })

  $('#save').addEventListener('click', _ => {
    [].map.call($('input[data-config-key]'), o => {
      config.set(o.getAttribute('data-config-key'), o.value)
    })

    config.save()
  })
})
