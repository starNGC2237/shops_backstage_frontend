<template>
  <div class="app-container">
    <el-input
      v-model="filterText"
      placeholder="输入关键词进行筛选"
      style="margin-bottom:30px;"
    />
    <el-tree
      ref="tree2"
      accordion
      :data="categoryData"
      :props="defaultProps"
      :filter-node-method="filterNode"
    >
      <span slot-scope="{ node, data }" style="width: 100%;">
        <div style="display: flex;justify-content: space-between;width: 100%;">
          <span>{{ node.label }}</span>
          <span>
            <el-button
              type="text"
              size="mini"
              @click.stop="a(data,'添加')"
            >
              添加
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click.stop="a(data,'编辑')"
            >
              编辑
            </el-button>
            <el-button
              type="text"
              size="mini"
              @click.stop="a(data,'删除')"
            >
              删除
            </el-button>
          </span>
        </div>
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {

  data() {
    return {
      filterText: '',
      categoryData: [
        {
          'categoryName': '根目录',
          'categoryId': 0,
          'categoryChild': [
            {
              'categoryChild': [
                {
                  'categoryChild': [
                    {
                      'categoryName': '电子书',
                      'categoryId': 1
                    },
                    {
                      'categoryName': '网络原创',
                      'categoryId': 2
                    },
                    {
                      'categoryName': '数字杂志',
                      'categoryId': 3
                    },
                    {
                      'categoryName': '多媒体图书',
                      'categoryId': 4
                    }
                  ],
                  'categoryName': '电子书刊',
                  'categoryId': 1
                },
                {
                  'categoryChild': [
                    {
                      'categoryName': '音乐',
                      'categoryId': 5
                    },
                    {
                      'categoryName': '影视',
                      'categoryId': 6
                    },
                    {
                      'categoryName': '教育音像',
                      'categoryId': 7
                    }
                  ],
                  'categoryName': '音像',
                  'categoryId': 2
                },
                {
                  'categoryChild': [
                    {
                      'categoryName': '少儿',
                      'categoryId': 8
                    },
                    {
                      'categoryName': '商务投资',
                      'categoryId': 9
                    },
                    {
                      'categoryName': '英语学习与考试',
                      'categoryId': 10
                    },
                    {
                      'categoryName': '文学',
                      'categoryId': 11
                    },
                    {
                      'categoryName': '传记',
                      'categoryId': 12
                    },
                    {
                      'categoryName': '励志',
                      'categoryId': 13
                    }
                  ],
                  'categoryName': '英文原版',
                  'categoryId': 3
                },
                {
                  'categoryChild': [
                    {
                      'categoryName': '小说',
                      'categoryId': 14
                    },
                    {
                      'categoryName': '文学',
                      'categoryId': 15
                    },
                    {
                      'categoryName': '青春文学',
                      'categoryId': 16
                    },
                    {
                      'categoryName': '传记',
                      'categoryId': 17
                    },
                    {
                      'categoryName': '艺术',
                      'categoryId': 18
                    }
                  ],
                  'categoryName': '文艺',
                  'categoryId': 4
                },
                {
                  'categoryChild': [
                    {
                      'categoryName': '少儿',
                      'categoryId': 19
                    },
                    {
                      'categoryName': '0-2岁',
                      'categoryId': 20
                    },
                    {
                      'categoryName': '3-6岁',
                      'categoryId': 21
                    },
                    {
                      'categoryName': '7-10岁',
                      'categoryId': 22
                    },
                    {
                      'categoryName': '11-14岁',
                      'categoryId': 23
                    }
                  ],
                  'categoryName': '少儿',
                  'categoryId': 5
                },
                {
                  'categoryChild': [
                    {
                      'categoryName': '历史',
                      'categoryId': 24
                    },
                    {
                      'categoryName': '哲学',
                      'categoryId': 25
                    },
                    {
                      'categoryName': '国学',
                      'categoryId': 26
                    },
                    {
                      'categoryName': '政治/军事',
                      'categoryId': 27
                    },
                    {
                      'categoryName': '法律',
                      'categoryId': 28
                    },
                    {
                      'categoryName': '人文社科',
                      'categoryId': 29
                    },
                    {
                      'categoryName': '心理学',
                      'categoryId': 30
                    },
                    {
                      'categoryName': '文化',
                      'categoryId': 31
                    },
                    {
                      'categoryName': '社会科学',
                      'categoryId': 32
                    }
                  ],
                  'categoryName': '人文社科',
                  'categoryId': 6
                },
                {
                  'categoryChild': [
                    {
                      'categoryName': '经济',
                      'categoryId': 33
                    },
                    {
                      'categoryName': '金融与投资',
                      'categoryId': 34
                    },
                    {
                      'categoryName': '管理',
                      'categoryId': 35
                    },
                    {
                      'categoryName': '励志与成功',
                      'categoryId': 36
                    }
                  ],
                  'categoryName': '经管励志',
                  'categoryId': 7
                },
                {
                  'categoryChild': [
                    {
                      'categoryName': '生活',
                      'categoryId': 37
                    },
                    {
                      'categoryName': '健身与保健',
                      'categoryId': 38
                    },
                    {
                      'categoryName': '家庭与育儿',
                      'categoryId': 39
                    },
                    {
                      'categoryName': '旅游',
                      'categoryId': 40
                    },
                    {
                      'categoryName': '烹饪美食',
                      'categoryId': 41
                    }
                  ],
                  'categoryName': '生活',
                  'categoryId': 8
                },
                {
                  'categoryChild': [
                    {
                      'categoryName': '工业技术',
                      'categoryId': 42
                    },
                    {
                      'categoryName': '科普读物',
                      'categoryId': 43
                    },
                    {
                      'categoryName': '建筑',
                      'categoryId': 44
                    },
                    {
                      'categoryName': '医学',
                      'categoryId': 45
                    },
                    {
                      'categoryName': '科学与自然',
                      'categoryId': 46
                    },
                    {
                      'categoryName': '计算机与互联网',
                      'categoryId': 47
                    },
                    {
                      'categoryName': '电子通信',
                      'categoryId': 48
                    }
                  ],
                  'categoryName': '科技',
                  'categoryId': 9
                },
                {
                  'categoryChild': [
                    {
                      'categoryName': '中小学教辅',
                      'categoryId': 49
                    },
                    {
                      'categoryName': '教育与考试',
                      'categoryId': 50
                    },
                    {
                      'categoryName': '外语学习',
                      'categoryId': 51
                    },
                    {
                      'categoryName': '大中专教材',
                      'categoryId': 52
                    },
                    {
                      'categoryName': '字典词典',
                      'categoryId': 53
                    }
                  ],
                  'categoryName': '教育',
                  'categoryId': 10
                },
                {
                  'categoryChild': [
                    {
                      'categoryName': '艺术/设计/收藏',
                      'categoryId': 54
                    },
                    {
                      'categoryName': '经济管理',
                      'categoryId': 55
                    },
                    {
                      'categoryName': '文化/学术',
                      'categoryId': 56
                    },
                    {
                      'categoryName': '少儿',
                      'categoryId': 57
                    }
                  ],
                  'categoryName': '港台图书',
                  'categoryId': 11
                },
                {
                  'categoryChild': [
                    {
                      'categoryName': '工具书',
                      'categoryId': 58
                    },
                    {
                      'categoryName': '杂志/期刊',
                      'categoryId': 59
                    },
                    {
                      'categoryName': '套装书',
                      'categoryId': 60
                    }
                  ],
                  'categoryName': '其他',
                  'categoryId': 12
                }
              ],
              'categoryName': '图书、音像、电子书刊',
              'categoryId': 1
            },
            {
              'categoryChild': [
                {
                  'categoryChild': [
                    {
                      'categoryName': '手机',
                      'categoryId': 61
                    },
                    {
                      'categoryName': '对讲机',
                      'categoryId': 62
                    },
                    {
                      'categoryName': '移动电话',
                      'categoryId': 1114
                    }
                  ],
                  'categoryName': '手机通讯',
                  'categoryId': 13
                },
                {
                  'categoryChild': [
                    {
                      'categoryName': '合约机',
                      'categoryId': 63
                    },
                    {
                      'categoryName': '选号中心',
                      'categoryId': 64
                    },
                    {
                      'categoryName': '装宽带',
                      'categoryId': 65
                    },
                    {
                      'categoryName': '办套餐',
                      'categoryId': 66
                    }
                  ],
                  'categoryName': '运营商',
                  'categoryId': 14
                },
                {
                  'categoryChild': [
                    {
                      'categoryName': '移动电源',
                      'categoryId': 67
                    },
                    {
                      'categoryName': '电池/移动电源',
                      'categoryId': 68
                    },
                    {
                      'categoryName': '蓝牙耳机',
                      'categoryId': 69
                    },
                    {
                      'categoryName': '充电器/数据线',
                      'categoryId': 70
                    },
                    {
                      'categoryName': '苹果周边',
                      'categoryId': 71
                    },
                    {
                      'categoryName': '手机耳机',
                      'categoryId': 72
                    },
                    {
                      'categoryName': '手机贴膜',
                      'categoryId': 73
                    },
                    {
                      'categoryName': '手机存储卡',
                      'categoryId': 74
                    },
                    {
                      'categoryName': '充电器',
                      'categoryId': 75
                    },
                    {
                      'categoryName': '数据线',
                      'categoryId': 76
                    },
                    {
                      'categoryName': '手机保护套',
                      'categoryId': 77
                    },
                    {
                      'categoryName': '车载配件',
                      'categoryId': 78
                    },
                    {
                      'categoryName': 'iPhone 配件',
                      'categoryId': 79
                    },
                    {
                      'categoryName': '手机电池',
                      'categoryId': 80
                    },
                    {
                      'categoryName': '创意配件',
                      'categoryId': 81
                    },
                    {
                      'categoryName': '便携/无线音响',
                      'categoryId': 82
                    },
                    {
                      'categoryName': '手机饰品',
                      'categoryId': 83
                    },
                    {
                      'categoryName': '拍照配件',
                      'categoryId': 84
                    },
                    {
                      'categoryName': '手机支架',
                      'categoryId': 85
                    }
                  ],
                  'categoryName': '手机配件',
                  'categoryId': 15
                }
              ],
              'categoryName': '手机',
              'categoryId': 2
            }
          ]
        }
      ],
      defaultProps: {
        children: 'categoryChild',
        label: 'categoryName'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },

  methods: {
    a(data, msg) {
      if (data.categoryId === 0 && data.categoryName === '根目录' && (msg === '删除' || msg === '编辑')) {
        this.$message(`根目录无法${msg}`)
      } else {
        console.log(data)
      }
    },
    filterNode(value, data) {
      if (!value) return true
      return data.categoryName.indexOf(value) !== -1
    }
  }
}
</script>

