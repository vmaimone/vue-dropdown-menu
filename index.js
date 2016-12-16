var dropdown = require('./dropdown-menu.vue')
dropdown.install = function(Vue, options) {
  options = options || { name: 'dropdown' }
  Vue.component(options.name, dropdown)
}
module.exports = dropdown
