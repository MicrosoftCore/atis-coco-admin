<template>
  <element-table
    ref="table"
    :url="url"
    :options="options"
    :columnOptions="columnOptions"
  ></element-table>
</template>

<script>
export default {
  props: ['farmerid', 'openid'],
  data () {
    return {
      url: this.$urls._('manage.farmer.getuserorderlist'),
      columnOptions: [
        { label: '购药地点', prop: 'ShopName' },
        {
          label: '时间',
          prop: 'CreateTime',
          type: 'date',
          outputFormat: 'YYYY-MM-DD'
        },
        { label: '商品数', prop: 'Qty' },
        { label: '金额', prop: 'TotalMoney' }
      ]
    }
  },
  computed: {
    options () {
      return {
        type: 'POST',
        extraParams: {
          FarmerId: this.farmerid
        },
        nav: {
          add: false,
          refresh: false
        },
        actionColumn: {
          edit: false,
          delete: false,
          extraButtons: [
            {
              name: 'view',
              title: '详情',
              click: ({ Id }) => {
                this.$router.push({
                  name: 'manage-farmer-orderdetail',
                  query: {
                    OrderId: Id,
                    OpenId: this.openid
                  }
                })
              }
            }
          ]
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
