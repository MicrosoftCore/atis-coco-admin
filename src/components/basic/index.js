import Vue from 'vue'

Vue.component('CardFull', resolve => { require(['@/components/basic/CardFull'], resolve) })
Vue.component('Container', resolve => { require(['@/components/basic/Container'], resolve) })
Vue.component('CountUp', resolve => { require(['@/components/basic/CountUp'], resolve) })
Vue.component('Highlight', resolve => { require(['@/components/basic/Highlight'], resolve) })
Vue.component('Icon', resolve => { require(['@/components/basic/Icon'], resolve) })
Vue.component('IconSelect', resolve => { require(['@/components/basic/IconSelect/index.vue'], resolve) })
Vue.component('IconSvg', resolve => { require(['@/components/basic/IconSvg/index.vue'], resolve) })
Vue.component('Markdown', resolve => { require(['@/components/basic/Markdown'], resolve) })
Vue.component('QuillEditor', resolve => { require(['@/components/basic/QuillEditor'], resolve) })
Vue.component('SimpleMDE', resolve => { require(['@/components/basic/SimpleMDE'], resolve) })
Vue.component('FroalaEditor', resolve => { require(['@/components/basic/FroalaEditor'], resolve) })
Vue.component('AzureMp', resolve => { require(['@/components/basic/AzureMp'], resolve) })
