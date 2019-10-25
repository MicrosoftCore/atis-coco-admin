<template>
  <element-table
    ref="multipleTable"
    :url=url
    :options=options
    :columnOptions=columnOptions
    @selection-change="handleSelectionChange">
  </element-table>
</template>

<script>
import { mapState } from 'vuex'
import { cropAgeFormatter } from '@/pages/bench/initial/common/formatter'
import { ApproveStatusMap } from '@/pages/bench/initial/common/map'
export default {
  data () {
    return {
      url: this.$urls._('bench.detection.getlist'),
      columnOptions: [
        { type: 'selection', width: '55' },
        { label: 'Id', prop: 'Id', hidden: true },
        { label: '作物年龄', prop: 'CropAge', formatter: cropAgeFormatter },
        { label: '作物位置', prop: 'CropPlace', minWidth: '200', showOverflowTooltip: true },
        { label: '提交人', prop: 'FarmerName' },
        { label: '提交时间', prop: 'CreateTime', type: 'date', minWidth: '100' },
        { label: '手机号', prop: 'Cellphone' }
        // { label: '检测状态', prop: 'ApproveStatus', formatter: this.approveStatusFormatter }
      ],
      multipleSelection: []
    }
  },
  computed: {
    ...mapState('common', {
      provinces: state => state.provinces.provinces
    }),
    options () {
      return {
        type: 'POST',
        filters: [{
          canClearSearch: true,
          components: [
            {
              label: '作物位置',
              prop: 'CropPlace',
              type: 'cascader',
              attributes: {
                options: this.provinces,
                props: {
                  value: 'RegionName'
                }
              }
            }
          ],
          searchButton: {
            text: '搜索',
            onSearch (requestData) {
              Object.keys(requestData)
                .forEach(key => {
                  if (['CropPlace'].includes(key)) {
                    requestData[key] = requestData[key].join('')
                  }
                })
              return requestData
            }
          }
        }],
        nav: {
          add: false,
          extraButtons: [
            {
              name: 'merge',
              icon: '合并',
              title: '合并',
              hidden: false,
              click: () => {
                let ids = []
                const array = this.multipleSelection
                array.forEach((item) => {
                  ids.push(item.Id)
                })
                if (array.length < 1) {
                  this.$notify({
                    title: '提示',
                    message: '请先选择要合并的单',
                    type: 'error'
                  })
                  return
                }
                this.$router.push({
                  name: 'bench-initial-merge',
                  query: {
                    Ids: ids
                  }
                })
              }
            }
          ]
        },
        actionColumn: {
          delete: false,
          edit: false,
          view: false,
          extraButtons: [
            { name: 'test',
              icon: '作物',
              title: '体检',
              hidden: ({ApproveStatus}) => ['1', '2'].includes(ApproveStatus),
              click: ({ Id }) => {
                this.$router.push({
                  name: 'bench-initial-detection',
                  query: {
                    Id
                  }
                })
              }
            }
          ]
        }
      }
    }
  },
  methods: {
    approveStatusFormatter (row, column, cellValue, index) {
      return ApproveStatusMap[cellValue]
    },
    handleSelectionChange (val) {
      if (val.length > 1) {
        if (val[0].FarmerId !== val[val.length - 1].FarmerId) {
          this.$refs.multipleTable.toggleRowSelection(val[val.length - 1])
        }
      }
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
