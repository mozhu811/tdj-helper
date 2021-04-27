<template>
  <div>
    <v-container>
      <v-row class='text-center'>
        <v-col
          class='mb-5'
          cols='12'>
          <v-container>
            <v-row justify='center' align='center'>
              <v-radio-group
                v-model='position'
                @change='handlePositionChange'
                row
                prepend-icon='fal fa-dice-d10'
                label='魂石位置'
              >
                <v-radio
                  label='天'
                  value='tian'
                ></v-radio>
                <v-radio
                  label='地'
                  value='di'
                ></v-radio>
                <v-radio
                  label='荒'
                  value='huang'
                ></v-radio>
              </v-radio-group>
            </v-row>
          </v-container>
          <v-form v-model='model' ref='form'>
            <v-container>
              <v-row justify='center' align='center'>
                <v-col cols='8' xs='4' md='4'>
                  <v-select
                    v-model='stone.first.index'
                    :items='properties'
                    :rules='indexRule'
                    item-text='name'
                    item-value='index'
                    no-data-text='魂石词条'
                    label='魂石词条'
                  >
                    <template v-slot:selection='{item}'>
                      <v-icon small left>{{ item.icon }}</v-icon>
                      {{ item.name }}
                    </template>
                    <template v-slot:item='{ item }'>
                      <v-icon small left>{{ item.icon }}</v-icon>
                      {{ item.name }}
                    </template>
                  </v-select>
                </v-col>
                <v-col cols='4' xs='2' md='2'>
                  <v-select
                    v-model='stone.first.value'
                    :items='range.first'
                    :rules='valueRule'
                    no-data-text='请选择魂石词条'
                    label='词条数值'
                  ></v-select>
                </v-col>
              </v-row>

              <v-row justify='center' align='center'>
                <v-col cols='8' xs='4' md='4'>
                  <v-select
                    v-model='stone.second.index'
                    :items='properties'
                    :rules='indexRule'
                    item-text='name'
                    item-value='index'
                    label='魂石词条'
                  >
                    <template v-slot:selection='{item}'>
                      <v-icon small left>{{ item.icon }}</v-icon>
                      {{ item.name }}
                    </template>
                    <template v-slot:item='{ item }'>
                      <span style='width: 20px'><v-icon small left>{{ item.icon }}</v-icon></span>
                      {{ item.name }}
                    </template>
                  </v-select>
                </v-col>
                <v-col cols='4' xs='2' md='2'>
                  <v-select
                    v-model='stone.second.value'
                    :items='range.second'
                    :rules='valueRule'
                    no-data-text='请选择魂石词条'
                    label='词条数值'
                  ></v-select>
                </v-col>
              </v-row>

              <v-row justify='center' align='center'>
                <v-col cols='8' xs='4' md='4'>
                  <v-select
                    v-model='stone.third.index'
                    :items='properties'
                    :rules='indexRule'
                    item-text='name'
                    item-value='index'
                    label='魂石词条'
                  >
                    <template v-slot:selection='{item}'>
                      <v-icon small left>{{ item.icon }}</v-icon>
                      {{ item.name }}
                    </template>
                    <template v-slot:item='{ item }'>
                      <span style='width: 20px'><v-icon small left>{{ item.icon }}</v-icon></span>
                      {{ item.name }}
                    </template>
                  </v-select>
                </v-col>
                <v-col cols='4' xs='2' md='2'>
                  <v-select
                    v-model='stone.third.value'
                    :items='range.third'
                    :rules='valueRule'
                    no-data-text='请选择魂石词条'
                    label='词条数值'
                  ></v-select>
                </v-col>
              </v-row>
              <v-row justify='center' align='center'>
                <v-col cols='8' xs='4' md='4'>
                  <v-select
                    v-model='stone.fourth.index'
                    :items='properties'
                    :rules='indexRule'
                    item-text='name'
                    item-value='index'
                    label='魂石词条'
                  >
                    <template v-slot:selection='{item}'>
                      <v-icon small left>{{ item.icon }}</v-icon>
                      {{ item.name }}
                    </template>
                    <template v-slot:item='{ item }'>
                      <span style='width: 20px'><v-icon small left>{{ item.icon }}</v-icon></span>
                      {{ item.name }}
                    </template>
                  </v-select>
                </v-col>
                <v-col cols='4' xs='2' md='2'>
                  <v-select
                    v-model='stone.fourth.value'
                    :items='range.fourth'
                    :rules='valueRule'
                    no-data-text='请选择魂石词条'
                    label='词条数值'
                  ></v-select>
                </v-col>
              </v-row>

              <!-- 移动端显示结果对话框 -->
              <v-dialog
                v-model='dialog'
                width='500'
              >
                <!-- 对话框主体 -->
                <v-card
                  class='mx-auto elevation-20'
                  color='#3166ba'
                  dark>
                  <v-card-title>
                    <div>
                      <div class='headline'>
                        魂石属性：
                      </div>
                    </div>
                  </v-card-title>

                  <v-card-text>
                    <div>
                      <v-row justify='space-between'>
                        <v-col sm='6' xs='6'>
                          <v-icon medium left>{{ showStone.first.icon }}</v-icon>
                          <span style='font-size: 16px;font-weight: bold'>{{ showStone.first.name }} {{ stone.first.value }}%</span>
                        </v-col>
                        <v-col cols='6'>
                          <v-icon medium left>{{ showStone.second.icon }}</v-icon>
                          <span style='font-size: 16px;font-weight: bold'>{{ showStone.second.name }} {{ stone.second.value }}%</span>
                        </v-col>
                      </v-row>
                      <v-row justify='space-between'>
                        <v-col sm='6' xs='6'>
                          <v-icon medium left>{{ showStone.third.icon }}</v-icon>
                          <span style='font-size: 16px;font-weight: bold'>{{ showStone.third.name }} {{ stone.third.value }}%</span>
                        </v-col>
                        <v-col cols='6'>
                          <v-icon medium left>{{ showStone.fourth.icon }}</v-icon>
                          <span style='font-size: 16px;font-weight: bold'>{{ showStone.fourth.name }} {{ stone.fourth.value }}%</span>
                        </v-col>
                      </v-row>
                      <v-row justify='center'>
                        <v-col md='12' xs='4'>
                          <div style='display: flex; align-items: center;'>
                            <span style='font-size: 20px; color: #ffffff'>魂石得分：</span>
                            <span style='font-size: 40px; color: #ffffff'>{{ result }}</span>
                          </div>
                        </v-col>
                      </v-row>
                      <v-row justify='center'>
                        <v-col md='12' xs='4'>
                          <div style='display: flex; align-items: center;'>
                            <span style='font-size: 20px; color: #ffffff'>评估结果：</span>
                            <v-rating dense small readonly half-increments :length='6' v-model='rating'
                                      color='yellow darken-3'
                                      background-color='grey darken-2'></v-rating>
                            <span style='font-size: 10px' class='ml-2'>({{ ratingLabel }})</span>
                          </div>
                        </v-col>
                      </v-row>
                    </div>
                  </v-card-text>

                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      @click='dialog = false'
                    >
                      关闭
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-row justify='center'>
                <v-col cols='12' md='6'>
                  <v-btn color='primary' width='100%' @click.stop='submit' class='mr-4'><v-icon size='medium'>mdi-checkbox-marked-circle</v-icon>立即计算</v-btn>
                </v-col>
              </v-row>
              <v-row justify='center'>
                <v-col cols='12' md='6'>
                  <v-btn @click='resetForm' width='100%'>
                    <v-icon size='medium'>mdi-refresh</v-icon>
                    重置数据
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-col>
      </v-row>
      <!-- 鸣谢纸片 -->
      <v-row justify='center'>
        <v-col cols='12' xs='6'>
          <div style='display: flex; justify-content: center'>
            <v-chip
              class='ma-4'
              color='cyan'
              label
              @click='toUrl(0)'
            >
              <v-icon left color='white'>
                mdi-account-circle-outline
              </v-icon>
              <span style='color: white'>算法提供: @泡椒啊</span>
            </v-chip>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'StoneGrade',

  data: () => ({
    mobile: false,
    model: true,
    result: null,
    dialog: false,
    position: 'tian',
    stone: {
      first: { index: null, value: null },
      second: { index: null, value: null },
      third: { index: null, value: null },
      fourth: { index: null, value: null }
    },
    properties: [
      {
        index: 1,
        name: '物攻',
        score: 11,
        icon: 'fas fa-mace',
        range: { tian: { min: 4, max: 10 }, di: { min: 2, max: 5 }, huang: { min: 3, max: 7 } }
      },
      {
        index: 2,
        name: '法攻',
        score: 11,
        icon: 'fas fa-staff',
        range: { tian: { min: 4, max: 10 }, di: { min: 2, max: 5 }, huang: { min: 3, max: 7 } }
      },
      {
        index: 3,
        name: '物理伤害',
        score: 10,
        icon: 'fas fa-sword',
        range: { tian: { min: 4, max: 10 }, di: { min: 2, max: 5 }, huang: { min: 3, max: 7 } }
      },
      {
        index: 4,
        name: '法术伤害',
        score: 10,
        icon: 'fas fa-hat-wizard',
        range: { tian: { min: 4, max: 10 }, di: { min: 2, max: 5 }, huang: { min: 3, max: 7 } }
      },
      {
        index: 5,
        name: '物理穿透',
        score: 6,
        icon: 'fas fa-axe-battle',
        range: { tian: { min: 4, max: 10 }, di: { min: 2, max: 5 }, huang: { min: 3, max: 7 } }
      },
      {
        index: 6,
        name: '法术穿透',
        score: 6,
        icon: 'fas fa-wand-magic',
        range: { tian: { min: 4, max: 10 }, di: { min: 2, max: 5 }, huang: { min: 3, max: 7 } }
      },
      {
        index: 7,
        name: '气血',
        score: 7,
        icon: 'fas fa-heart',
        range: { tian: { min: 2, max: 5 }, di: { min: 4, max: 10 }, huang: { min: 3, max: 7 } }
      },
      {
        index: 8,
        name: '暴击',
        score: 3,
        icon: 'fas fa-bomb',
        range: { tian: { min: 4, max: 10 }, di: { min: 2, max: 5 }, huang: { min: 3, max: 7 } }
      },
      {
        index: 9,
        name: '物理免伤',
        score: 5,
        icon: 'fas fa-paw-claws',
        range: { tian: { min: 2, max: 5 }, di: { min: 4, max: 10 }, huang: { min: 3, max: 7 } }
      },
      {
        index: 10,
        name: '法术免伤',
        score: 5,
        icon: 'fas fa-sparkles',
        range: { tian: { min: 2, max: 5 }, di: { min: 4, max: 10 }, huang: { min: 3, max: 7 } }
      },
      {
        index: 11,
        name: '物防',
        score: 1,
        icon: 'fas fa-shield',
        range: { tian: { min: 2, max: 5 }, di: { min: 4, max: 10 }, huang: { min: 3, max: 7 } }
      },
      {
        index: 12,
        name: '法防',
        score: 1,
        icon: 'fas fa-dice-d12',
        range: { tian: { min: 2, max: 5 }, di: { min: 4, max: 10 }, huang: { min: 3, max: 7 } }
      },
      {
        index: 13,
        name: '反击伤害',
        score: 0,
        icon: 'fas fa-swords',
        range: { tian: { min: 4, max: 10 }, di: { min: 2, max: 5 }, huang: { min: 3, max: 7 } }
      },
      {
        index: 14,
        name: '暴击抗性',
        score: 0,
        icon: 'fas fa-helmet-battle',
        range: { tian: { min: 2, max: 5 }, di: { min: 4, max: 10 }, huang: { min: 3, max: 7 } }
      }
    ],
    range: {
      first: [],
      second: [],
      third: [],
      fourth: []
    },
    indexRule: [
      v => !!v || '请选择魂石词条'
    ],
    valueRule: [
      v => (v && v >= 2 && v <= 10) || '请选择词条数值'
    ],
    showStone: {
      first: { name: null, icon: null },
      second: { name: null, icon: null },
      third: { name: null, icon: null },
      fourth: { name: null, icon: null }
    }
  }),
  created () {
    const u = navigator.userAgent
    // android终端
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
    // ios终端
    const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    if (isAndroid || isiOS) {
      this.mobile = true
    }
  },
  methods: {
    toUrl (index) {
      if (index === 0) {
        window.open('https://bbs.nga.cn/nuke.php?func=ucp&uid=63080955', '_blank')
      } else if (index === 1) {
        window.open('https://bbs.nga.cn/nuke.php?func=ucp&uid=60775908', '_blank')
      }
    },
    submit () {
      const valid = this.$refs.form.validate()
      if (valid) {
        const firstScore = this.properties.filter(p => p.index === this.stone.first.index).pop().score * this.stone.first.value
        const secondScore = this.properties.filter(p => p.index === this.stone.second.index).pop().score * this.stone.second.value
        const thirdScore = this.properties.filter(p => p.index === this.stone.third.index).pop().score * this.stone.third.value
        const fourthScore = this.properties.filter(p => p.index === this.stone.fourth.index).pop().score * this.stone.fourth.value
        this.result = firstScore + secondScore + thirdScore + fourthScore
        this.dialog = true
      }
    },
    resetForm () {
      this.$refs.form.reset()
      this.result = null
    },
    mobileSubmit () {
      const valid = this.$refs.form.validate()
      if (valid) {
        const firstScore = this.properties.filter(p => p.index === this.stone.first.index).pop().score * this.stone.first.value
        const secondScore = this.properties.filter(p => p.index === this.stone.second.index).pop().score * this.stone.second.value
        const thirdScore = this.properties.filter(p => p.index === this.stone.third.index).pop().score * this.stone.third.value
        const fourthScore = this.properties.filter(p => p.index === this.stone.fourth.index).pop().score * this.stone.fourth.value
        this.result = firstScore + secondScore + thirdScore + fourthScore
        this.dialog = true
      }
    },
    handlePositionChange () {
      this.$refs.form.reset()
      this.result = null
    }
  },
  computed: {
    rating: function () {
      // 归一化到区间[0.5, 5]
      if (this.position === 'tian') {
        if (this.result <= 109) {
          return 2 * this.result / 109
        } else if (this.result <= 164) {
          return 2 * (this.result - 110) / (164 - 110) + 2
        }
        return 2 * (this.result - 165) / (305 - 165) + 4
      } else if (this.position === 'di') {
        if (this.result <= 93) {
          return 2 * this.result / 93
        } else if (this.result <= 144) {
          return 2 * (this.result - 94) / (144 - 94) + 2
        }
        return 2 * (this.result - 144) / (225 - 144) + 4
      } else {
        if (this.result <= 96) {
          return 2 * this.result / 96
        } else if (this.result <= 145) {
          return 2 * (this.result - 97) / (145 - 97) + 2
        }
        return 2 * (this.result - 146) / (238 - 146) + 4
      }
    },
    ratingLabel: function () {
      if (this.position === 'tian') {
        if (this.result > 0 && this.result <= 109) {
          return '一般'
        } else if (this.result <= 164) {
          return '不错'
        } else if (this.result <= 244) {
          return '优质'
        } else {
          return '极品'
        }
      } else if (this.position === 'di') {
        if (this.result > 0 && this.result <= 93) {
          return '一般'
        } else if (this.result <= 144) {
          return '不错'
        } else if (this.result <= 180) {
          return '优质'
        } else {
          return '极品'
        }
      } else {
        if (this.result > 0 && this.result <= 96) {
          return '一般'
        } else if (this.result <= 145) {
          return '不错'
        } else if (this.result < 204) {
          return '优质'
        } else {
          return '极品'
        }
      }
    }
  },
  watch: {
    position: {
      handler () {
        this.$refs.form.reset()
      }
    },
    'stone.first.index': {
      handler (newIndex, oldIndex) {
        this.stone.first.value = 0
        const item = this.properties.filter(p => p.index === newIndex)
        this.showStone.first.name = item[0].name
        this.showStone.first.icon = item[0].icon
        const range = item.map(p => {
          if (this.position === 'tian') {
            return p.range.tian
          }

          if (this.position === 'di') {
            return p.range.di
          }

          if (this.position === 'huang') {
            return p.range.huang
          }
        }).pop()

        if (range) {
          this.range.first = []
          for (let i = range.min; i <= range.max; i++) {
            this.range.first.push(i)
          }
        }
      }
    },
    'stone.second.index': {
      handler (newIndex, oldIndex) {
        this.stone.second.value = 0
        const item = this.properties.filter(p => p.index === newIndex)
        this.showStone.second.name = item[0].name
        this.showStone.second.icon = item[0].icon
        const range = item.map(p => {
          if (this.position === 'tian') {
            return p.range.tian
          }

          if (this.position === 'di') {
            return p.range.di
          }

          if (this.position === 'huang') {
            return p.range.huang
          }
        }).pop()

        if (range) {
          this.range.second = []
          for (let i = range.min; i <= range.max; i++) {
            this.range.second.push(i)
          }
        }
      }
    },
    'stone.third.index': {
      handler (newIndex, oldIndex) {
        this.stone.third.value = 0
        const item = this.properties.filter(p => p.index === newIndex)
        this.showStone.third.name = item[0].name
        this.showStone.third.icon = item[0].icon
        const range = item.map(p => {
          if (this.position === 'tian') {
            return p.range.tian
          }

          if (this.position === 'di') {
            return p.range.di
          }

          if (this.position === 'huang') {
            return p.range.huang
          }
        }).pop()

        if (range) {
          this.range.third = []
          for (let i = range.min; i <= range.max; i++) {
            this.range.third.push(i)
          }
        }
      }
    },
    'stone.fourth.index': {
      handler (newIndex, oldIndex) {
        this.stone.fourth.value = 0
        const item = this.properties.filter(p => p.index === newIndex)
        this.showStone.fourth.name = item[0].name
        this.showStone.fourth.icon = item[0].icon
        const range = item.map(p => {
          if (this.position === 'tian') {
            return p.range.tian
          }

          if (this.position === 'di') {
            return p.range.di
          }

          if (this.position === 'huang') {
            return p.range.huang
          }
        }).pop()

        if (range) {
          this.range.fourth = []
          for (let i = range.min; i <= range.max; i++) {
            this.range.fourth.push(i)
          }
        }
      }
    }
  }
}
</script>
