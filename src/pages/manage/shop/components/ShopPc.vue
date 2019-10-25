<template>
  <element-table
    ref="table"
    class="member-promoter"
    :url=url
    :options=options
    :columnOptions=columnOptions
  >
  </element-table>
</template>

<script>
export default {
  data () {
    return {
      url: this.$urls._('manage.shop.getshopbaseinfolist')
    }
  },

  computed: {
    options () {
      return {
        type: 'POST',
        filters: [
          {
            canClearSearch: true,
            components: [
              {
                label: '商户名',
                prop: 'ShopName',
                type: 'input'
              }
            ]
          }
        ],
        nav: {
          add: false
        },
        actionColumn: {
          hidden: true
        }
      }
    },
    columnOptions () {
      return [
        { label: '商户名', prop: 'ShopName' },
        { label: '商户地址', prop: 'ShopAddress' },
        { label: '视频id', prop: 'PhoneNo' },
        { label: 'PC版本', prop: 'VersionNo' },
        {
          label: '最近登录时间',
          prop: 'LastLoginTime',
          type: 'date',
          outputFormat: 'YYYY-MM-DD hh:mm:ss'
        }
      ]
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
