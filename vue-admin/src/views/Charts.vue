<template>
  <div class="container" ref="chart1">111111</div>
</template>

<script>
import Notebook from '../apis/Notebooks'
export default {
  data () {
    return {
      allNotebooks: [],
      myChart: {}
    }
  },
  created() {
    Notebook.getNotebooks()
      .then((res) => {
        this.allNotebooks = res.data
        this.myChart.setOption({
          xAxis: {
            data: this._changeNotebooks('title')
          },
          tooltip: {},
          series: [{
            name: '笔记数',
            data: this._changeNotebooks('noteCounts')
          }]
        })
      })
      .catch((error) => {
        this.$Message.error(error.msg)
      })
  },
  mounted() {
    this.draw()
  },
  methods: {
    _changeNotebooks(val) {
      let _data = []
      this.allNotebooks.map((value) => {
        _data.push(value[val])
      })
      return _data
    },
    draw() {
      this.myChart = this.$echarts.init(this.$refs.chart1)
      this.myChart.setOption({
        title: { text: '笔记本中的笔记数目' },
        xAxis: {
          data: [],
          axisLabel: {
            interval: 0,
            rotate: 40
          }
        },
        yAxis: {},
        series: [{
            name: '笔记数',
            type: 'bar',
            data: []
        }]
      })
    }
  }
}
</script>

<style lang='less' scoped>
.container{
  height: 100%;
  width: 100%;
}
</style>