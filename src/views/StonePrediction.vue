<template>
  <v-container>
    <v-row class='text-center'>
      <v-spacer/>
      <v-col
        class='mb-5'
        cols='12'>
        <v-row justify='center'>
          <v-col cols='12'>
            <div style='display: flex; align-items: center; justify-content: center'>
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
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-spacer/>
    </v-row>
    <v-row>
      <v-form v-model='model' ref='form'>
        <v-container>
          <v-row justify='center'>
            <v-col :cols='12' :md='8'>
              <v-row justify='space-between' no-gutters>
                <v-col v-for='(item) in properties' :key='item.index' :cols='5' :md='3'>
                  <div style='display: flex; justify-content: end;' :class="mobile? '' : 'ml-10'">
                    <v-checkbox v-model='items' :value='item.index'>
                      <template v-slot:label>
                        <div>
                          <v-icon small left>{{ item.icon }}</v-icon>
                          {{ item.name }}
                        </div>
                      </template>
                    </v-checkbox>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row justify='center'>
              <v-col cols='12' md='8'>
                <v-btn color='primary' width='100%' @click.stop='submit' class='mr-4'>
                  <v-icon size='medium'>mdi-checkbox-marked-circle</v-icon>立即预测</v-btn>
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
            <template v-if='stone'>
              <v-row justify='space-between'>
                <v-col sm='6' xs='6'>
                  <v-icon medium left>{{ stone[0].icon }}</v-icon>
                  <span style='font-size: 1rem;font-weight: bold'>{{ stone[0].name }} {{ predictResult[0] }}%</span>
                </v-col>
                <v-col cols='6'>
                  <v-icon medium left>{{ stone[1].icon }}</v-icon>
                  <span style='font-size: 16px;font-weight: bold'>{{ stone[1].name }} {{ predictResult[1] }}%</span>
                </v-col>
              </v-row>
              <v-row justify='space-between'>
                <v-col sm='6' xs='6'>
                  <v-icon medium left>{{ stone[2].icon }}</v-icon>
                  <span style='font-size: 16px;font-weight: bold'>{{ stone[2].name }} {{ predictResult[2] }}%</span>
                </v-col>
                <v-col cols='6'>
                  <v-icon medium left>{{ stone[3].icon }}</v-icon>
                  <span style='font-size: 16px;font-weight: bold'>{{ stone[3].name }} {{ predictResult[3] }}%</span>
                </v-col>
              </v-row>
            </template>
            <v-row justify='center'>
              <v-col cols='4' xs='4'>
                <div style='display: flex; align-items: center;'>
                  <span class='item-size' style='color: #ffffff'>最高分：</span>
                  <span class='item-size' style='color: #ffffff'>{{ maxScore }}</span>
                </div>
              </v-col>
              <v-col cols='4'>
                <span class='item-size' style='color: #ffffff'>平均分：</span>
                <span class='item-size' style='color: #ffffff'>{{ avgScore }}</span>
              </v-col>
              <v-col cols='4'>
                <span class='item-size' style='color: #ffffff'>最低分：</span>
                <span class='item-size' style='color: #ffffff'>{{ minScore }}</span>
              </v-col>
            </v-row>
            <v-row justify='center'>
              <v-col md='12' xs='4'>
                <div style='display: flex; align-items: center;'>
                  <span style='font-size: 1.5rem; color: #ffffff'>评估结果：</span>
                  <!--                  <v-rating dense small readonly half-increments :length='6' v-model='rating'-->
                  <!--                            color='yellow darken-3'-->
                  <!--                            background-color='grey darken-2'></v-rating>-->
                  <span style='font-size: 1.5rem'>{{ result }}</span>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <span style='font-size: 0.5rem'>以上魂石属性数值为系统随机生成，仅供娱乐</span>
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
  </v-container>
</template>

<script>
export default {
  name: 'StonePrediction',
  data: () => ({
    model: true,
    position: 'tian',
    mobile: false,
    dialog: false,
    rating: 6,
    items: [],
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
        icon: 'fas fa-shield-cross',
        range: { tian: { min: 2, max: 5 }, di: { min: 4, max: 10 }, huang: { min: 3, max: 7 } }
      }
    ],
    indexRule: [
      v => v.length === 4 || '请选择4个魂石词条'
    ],
    stone: null,
    maxScore: 0,
    minScore: 0,
    avgScore: 0,
    visibleChips: 3,
    screenMaxWidth: 0,
    predictResult: null
  }),
  created () {
    this.screenMaxWidth = document.body.clientWidth
    if (this.screenMaxWidth > 420) {
      this.visibleChips = 4
    }
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
        this.stone = this.items.map(i => this.properties.filter(p => p.index === i)[0])
        if (this.position === 'tian') {
          this.maxScore = this.stone.reduce((accumulator, current) => accumulator + current.score * current.range.tian.max, 0)
          this.minScore = this.stone.reduce((accumulator, current) => accumulator + current.score * current.range.tian.min, 0)
          this.avgScore = this.stone.reduce((accumulator, current) => accumulator + current.score * (current.range.tian.max + current.range.tian.min) / 2, 0)
          this.predictResult = this.stone.map(s => {
            return Math.floor(Math.random() * (s.range.tian.max - s.range.tian.min + 1) + s.range.tian.min)
          })
        } else if (this.position === 'di') {
          this.maxScore = this.stone.reduce((accumulator, current) => accumulator + current.score * current.range.di.max, 0)
          this.minScore = this.stone.reduce((accumulator, current) => accumulator + current.score * current.range.di.min, 0)
          this.avgScore = this.stone.reduce((accumulator, current) => accumulator + current.score * (current.range.di.max + current.range.di.min) / 2, 0)
          this.predictResult = this.stone.map(s => {
            return Math.floor(Math.random() * (s.range.di.max - s.range.di.min + 1) + s.range.di.min)
          })
        } else {
          this.maxScore = this.stone.reduce((accumulator, current) => accumulator + current.score * current.range.huang.max, 0)
          this.minScore = this.stone.reduce((accumulator, current) => accumulator + current.score * current.range.huang.min, 0)
          this.avgScore = this.stone.reduce((accumulator, current) => accumulator + current.score * (current.range.huang.max + current.range.huang.min) / 2, 0)
          this.predictResult = this.stone.map(s => {
            return Math.floor(Math.random() * (s.range.huang.max - s.range.huang.min + 1) + s.range.huang.min)
          })
        }
        this.dialog = true
      }
    },
    handlePositionChange () {
      this.$refs.form.reset()
    }
  },
  computed: {
    result () {
      if (this.position === 'tian') {
        if (this.avgScore <= 109) {
          return '一般，大赌伤身'
        } else if (this.avgScore <= 164) {
          return '不错，单车变摩托'
        }
        return '优质，梭哈'
      } else if (this.position === 'di') {
        if (this.avgScore <= 93) {
          return '一般，大赌伤身'
        } else if (this.avgScore <= 143) {
          return '不错，单车变摩托'
        }
        return '优质，梭哈'
      } else if (this.position === 'huang') {
        if (this.avgScore <= 96) {
          return '一般，大赌伤身'
        } else if (this.avgScore <= 145) {
          return '不错，单车变摩托'
        }
        return '优质，梭哈'
      }
      return '魂石位置数值异常'
    }
  }
}
</script>

<style scoped>
@media only screen and (device-width: 375px) and (device-height: 812px) {
  .item-size {
    font-size: 0.8rem;
  }
}

@media only screen and (min-device-width: 900px) {
  .item-size {
    font-size: 1rem;
  }
}
</style>
