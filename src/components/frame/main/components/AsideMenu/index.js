import { mapState, mapActions } from 'vuex'
export default {
  name: 'ElAsideMenu',
  props: {
    collapse: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      defaultActive: [],
      defaultOpeneds: []
    }
  },
  computed: {
    ...mapState('d2admin/user', [ 'info' ]),
    ...mapState('d2admin/menu', [ 'asideMenus' ])
  },
  methods: {
    ...mapActions('d2admin/account', [ 'logout' ]),
    /**
     * @description 登出
     */
    createMenu (h, menus, rootPath = null) {
      let createTitle = ({ title, icon }) => [
        icon &&
          h('IconSvg', {
            class: 'el-submenu__icon',
            props: {
              name: icon
            }
          }),
        title &&
          h(
            'span',
            {
              slot: 'title'
            },
            title
          )
      ]

      let createMenuItem = (meta, index) => {
        if (!this.defaultActive.includes(index)) {
          this.defaultActive.push(index)
        }

        return h(
          'el-menu-item',
          {
            props: {
              index
            }
          },
          createTitle(meta)
        )
      }

      return menus.filter(({ path, meta }) => path && meta && meta.title).map(menu => {
        let { path, meta, children } = menu
        let { expand = true } = meta
        let index = rootPath ? `${rootPath}/${path}` : path
        let hasChildren = children && children.length && children.some(({ path }) => path)

        if (hasChildren && children.some(({ meta }) => meta && meta.title)) {
          if (!this.defaultOpeneds.includes(index)) {
            expand && this.defaultOpeneds.push(index)
          }

          return h(
            'el-submenu',
            {
              props: {
                index
              }
            },
            [
              h(
                'template',
                {
                  slot: 'title'
                },
                createTitle(meta)
              ),
              this.createMenu(h, children, index)
            ]
          )
        } else {
          if (hasChildren || !children) {
            return createMenuItem(meta, index)
          }
        }
      })
    }
  },
  render (h) {
    let ElDropdown = h(
      'el-dropdown',
      {
        style: {
          width: '100%',
          margin: '25px 0 15px'
        },
        props: {
          placement: 'bottom',
          trigger: 'click'
        }
      },
      [
        h(
          'div',
          {
            style: [
              {
                height: '50px',
                display: 'flex',
                'align-items': 'center'
              },
              this.collapse && {
                'justify-content': 'center'
              },
              !this.collapse && {
                'margin-left': '20px'
              }
            ]
          },
          [
            h(
              'div',
              {
                style: {
                  float: 'left'
                }
              },
              [
                h('IconSvg', {
                  style: {
                    width: '40px',
                    height: '40px'
                  },
                  props: {
                    name: '灰色头像'
                  }
                })
              ]
            ),
            !this.collapse &&
              h(
                'div',
                {
                  style: {
                    float: 'left',
                    color: '#c0c0c0',
                    'line-height': '22px',
                    'padding-left': '7px',
                    'font-family': '微软雅黑'
                  }
                },
                [
                  h('strong', this.info.UserName),
                  h(
                    'div',
                    {
                      style: {
                        'font-size': '13px',
                        overflow: 'hidden',
                        'text-overflow': 'ellipsis',
                        'white-space': 'nowrap'
                      }
                    },
                    'cipchk@qq.com'
                  )
                ]
              )
          ]
        ),
        h(
          'el-dropdown-menu',
          {
            slot: 'dropdown',
            style: {
              width: '152px',
              padding: '0'
            }
          },
          [
            h('el-dropdown-item', '个人资料'),
            h('el-dropdown-item', '设置'),
            h(
              'el-dropdown-item',
              {
                nativeOn: {
                  click: () => {
                    this.logout({
                      confirm: true
                    })
                  }
                }
              },
              '退出登录'
            )
          ]
        )
      ]
    )

    let ElMenu = h(
      'el-menu',
      {
        class: 'dd-side-menu',
        props: {
          router: true,
          uniqueOpened: false,
          collapse: this.collapse,
          defaultOpeneds: this.defaultOpeneds,
          defaultActive: this.defaultActive.find(index => this.$route.path.includes(index)),
          textColor: '#C0C0C0',
          activeTextColor: '#ffd04b',
          backgroundColor: '#404040'
        }
      },
      this.createMenu(h, this.asideMenus)
    )

    return h(
      'div',
      {
        style: {
          width: '100%',
          height: '100%',
          overflow: 'hidden'
        }
      },
      [ ElDropdown, ElMenu ]
    )
  }
}
