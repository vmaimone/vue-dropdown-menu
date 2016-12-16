<template>
  <div :class="{ open: isOpen, dropdown: true, dropup: false }">
    <button
      type="button"
      @click="toggle($event)"
      :class="{ 'button': true, 'is-small': isSmall, 'is-large': isLarge, 'is-inverted': isInverted }"
      :aria-expanded="isOpen"
      :disabled="disabled">
      <span v-html="text || ''"></span>
      <i v-if="iconClass" :style="{'margin-left': text ? '.5rem': ''}" :class="iconClass"></i>
    </button>
    <ul class="dropdown-menu fa-ul" @click="hide()">
      <slot></slot>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        isOpen: false
      }
    },
    props: {
      text: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      dropup: {
        type: Boolean,
        default: false
      },
      isSmall: {
        type: Boolean,
        default: false
      },
      isLarge: {
        type: Boolean,
        default: false
      },
      isInverted: {
        type: Boolean,
        default: false
      },
      iconClass: {
        type: String,
        default: ''
      }
    },
    
    mounted() {
      if(!LISTENER_IS_ATTACHED) {
        document.addEventListener('click', dropdownListener)
        LISTENER_IS_ATTACHED = true
      }
    },

    methods: {
      toggle(e) {
        if (!this.isOpen) {
          this.show()
          e.stopPropagation()
        } else {
          this.hide()
        }
      },
      show() {
        if (!this.isOpen) {
          this.isOpen = true
          this.$emit('show', this.$data)
        }
      },
      hide() {
        if (this.isOpen) {
          this.isOpen = false
          this.$emit('hide', this.$data)
        }
      }
    }
  }
  var LISTENER_IS_ATTACHED = false
  function dropdownListener(event) {
    let el = document.querySelector('.dropdown.open')
    if (el && el.__vue__ ) {
      if(el.__vue__.isOpen) el.__vue__.isOpen = false
    }
  }
</script>
<style>
  .dropdown {
    position: relative;
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    display: none;
    padding: 0;
    margin: 0;
    color: #373a3c;
    text-align: left;
    list-style: none;
    background-color: #fff;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, .12);
    border-radius: 1px;
    box-shadow: 1px 2px 1px 0 rgba(0, 0, 0, 0.10);
    font-size: 1rem;
  }

  .dropdown-menu>li {
    display: block;
    padding: .25rem 1rem;
    clear: both;
    font-weight: normal;
    line-height: 1.5;
    color: #373a3c;
    text-align: inherit;
    white-space: nowrap;
    background: none;
    border: 0;
    cursor: default;
  }

  .dropdown-menu>li:focus,
  .dropdown-menu>li:hover {
    color: #2b2d2f;
    text-decoration: none;
    background-color: #f5f5f5;
    cursor: normal;
  }

  .dropdown-menu>li.active,
  .dropdown-menu>li.active:focus,
  .dropdown-menu>li.active:hover {
    color: #fff;
    text-decoration: none;
    background-color: #0275d8;
    outline: 0;
  }

  .dropdown-menu>li.disabled,
  .dropdown-menu>li.disabled:focus,
  .dropdown-menu>li.disabled:hover {
    color: #818a91;
  }

  .dropdown-menu>li.disabled:focus,
  .dropdown-menu>li.disabled:hover {
    text-decoration: none;
    cursor: not-allowed;
    background-color: transparent;
    background-image: none;
    filter: "progid:DXImageTransform.Microsoft.gradient(enabled = false)";
  }

  .open > .dropdown-menu {
    display: block;
  }

  .open > a {
    outline: 0;
  }

  .dropdown-menu>li.dropdown-header {
    display: block;
    font-size: 1rem;
    line-height: 1.5;
    color: #818a91;
    white-space: nowrap;
    /*font-weight: lighter;*/
  }
  .dropdown-menu>li.dropdown-header:hover {
    background: inherit;
  }

  .dropdown-menu>li.dropdown-divider {
    height: 1px;
    padding: 1px 0;
    margin: .25rem 0;
    overflow: hidden;
    background-color: #e5e5e5;
  }

  .dropdown-header + .dropdown-divider {
    margin-top: 0 !important;
  }

  .pull-right > .dropdown-menu,
  .menu-right > .dropdown-menu,
  .dropdown-menu-right {
    right: 0;
    left: auto;
  }

  .pull-left > .dropdown-menu,
  .menu-left > .dropdown-menu,
  .dropdown-menu-left {
    right: auto;
    left: 0;
  }
</style>
