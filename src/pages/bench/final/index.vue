<template>
  <element-table
    ref="table"
    :url=url
    :options=options
    :columnOptions=columnOptions
  >
  </element-table>
</template>

<script>
import { mapState } from 'vuex'
import { cropAgeFormatter } from '@/pages/bench/initial/common/formatter'
import { ApproveStatusMap } from '@/pages/bench/initial/common/map'
export default {
  data () {
    return {
      url: this.$urls._('bench.detection.getfinallist'),
      columnOptions: [
        {
          type: 'expand',
          render: (h, row) => {
            return h(
              'el-form',
              {
                slot: 'default',
                class: 'demo-table-expand',
                props: {
                  labelPosition: 'left',
                  inline: true
                }
              },
              [
                { label: '作物位置', prop: 'CropPlace' },
                row.ExpertAdvice && {
                  label: '专家点评',
                  prop: 'ExpertAdvice'
                },
                { label: '初检人员', prop: 'FirstApprover' },
                { label: '终检人员', prop: 'FinalApprover' }
              ].map(({ label, prop }) =>
                h(
                  'el-form-item',
                  {
                    props: {
                      label
                    }
                  },
                  [h('span', row[prop])]
                )
              )
            )
          }
        },
        { label: 'Id', prop: 'Id', hidden: true },
        { label: '检测单号', prop: 'DetectionOrderNumber' },
        { label: '作物名称', prop: 'CropName' },
        { label: '作物年龄', prop: 'CropAge', formatter: cropAgeFormatter },
        { label: '提交人', prop: 'CreateBy' },
        { label: '提交时间', prop: 'CreateTime', type: 'date' }
      ]
    }
  },
  computed: {
    ...mapState('d2admin/user', ['info']),
    ...mapState('common', {
      /**
       * @description 植物分类
       * @type 植物分为
       * 界（Category）、门 Divisio或（Phylum）、 纲 Classis （class）、
       * 目Ordo （order）、 科Familia （Family）、族Tribus（Tribe）、
       * 属 Genus （Genus）、组Sectio（Section）、系Series（Series）、种Species（Species）、
       * 变种Varietas（Variety）、变形Forma（Form）
       * @this 这里的命名取"组（Section）"和"系（Series）"
       */
      section: state => state.crops.category,
      provinces: state => state.provinces.provinces
    }),
    options () {
      return {
        type: 'POST',
        filters: [
          {
            canClearSearch: true,
            components: [
              {
                label: '检测单号',
                prop: 'DetectionOrderNumber',
                type: 'input'
              },
              // {
              //   label: '检测状态',
              //   prop: 'ApproveStatus',
              //   type: 'select',
              //   optionAttributes: [
              //     {value: '0', label: '全部'},
              //     {value: '1', label: '未终检'},
              //     {value: '2', label: '已终检'}
              //   ]
              // },
              {
                label: '作物分类',
                prop: 'CropTypeId',
                type: 'cascader',
                attributes: {
                  options: this.section,
                  value: [this.$route.query.CropBigType, this.$route.query.CropType]
                }
              },
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
                Object.entries(requestData).forEach(([key, value]) => {
                  if (['CropPlace'].includes(key)) {
                    requestData[key] = value.join('')
                  }
                  if (['CropTypeId'].includes(key)) {
                    if (value.length === 1) {
                      requestData.CropBigTypeId = value[0]
                      delete requestData[key]
                    }
                    if (value.length === 2) {
                      requestData[key] = value[1]
                    }
                  }
                })
                return requestData
              }
            }
          }
        ],
        extraParams: {
          ApproveStatus: this.info.UserType === 1 ? '2' : '1',
          ExpertId: this.info.UserType === 1 ? this.$route.query.ExpertId : '',
          OpenId: this.info.UserType === 1 ? this.$route.query.OpenId : '',
          CropBigTypeId: this.info.UserType === 1 ? this.$route.query.CropBigType : '',
          CropTypeId: this.info.UserType === 1 ? this.$route.query.CropType : ''
        },
        nav: {
          add: false
        },
        actionColumn: {
          delete: false,
          edit: false,
          extraButtons: [
            {
              name: 'view',
              hidden: ({ ApproveStatus }) => ApproveStatus >= 5,
              click: ({ Id }) => {
                this.$router.push({
                  name: 'bench-final-info',
                  query: {
                    Id
                  }
                })
              }
            },
            {
              name: 'test',
              icon: '邀请医生注册',
              title: '体检',
              hidden: ({ ApproveStatus }) => ApproveStatus < 5,
              click: ({ Id }) => {
                this.$router.push({
                  name: 'bench-final-detection',
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
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .demo-table-expand {
  font-size: 0;
  label {
    width: 90px;
    color: #99a9bf;
  }
  .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
    label,
    span {
      font-size: 16px;
    }
  }
}
</style>
