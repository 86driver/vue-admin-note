<template>
  <Layout class="layout">
    <Header>
      <i-button type="success" @click="modal1 = true">新建笔记本</i-button>
      <Modal v-model="modal1" title="新建笔记本" @on-ok="modalOK" @on-cancel="modalCancel">
        <i-input max-length="5" v-model.trim="newBooksTitle" placeholder="笔记本标题不能为空，且不超过30个字符"></i-input>
      </Modal>
      <i-button @click="_exportData" type="success">导出笔记</i-button>
    </Header>
    <Content>
      <i-table
        highlight-row
        @on-current-change="seclectBook"
        :loading="tableLoading"
        :columns="columns1"
        :data="simpleBooks"
        ref="table"></i-table>
    </Content>
    <Footer>
      <Page show-elevator show-total :total="totalCount" :page-size="pageSize" @on-change="changePage" />
    </Footer>
  </Layout>
</template>

<script>
import Notebooks from '../apis/Notebooks'
import moment from 'moment'
export default {
  data () {
    return {
      columns1: [
        {
          title: '笔记本名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '创建日期',
          key: 'date',
          sortable: true,
          align: 'center'
        },
        {
          title: '笔记数量',
          key: 'count',
          align: 'center'
        },
        {
          title: '操作',
          key: 'handle',
          align: 'center',
          render: (h, params) => {
            return h('Button', {
              props: {
                type: 'primary'
              },
              on: {
                click: () => {
                  event.stopPropagation()
                  this.deleteNotebook(params.row.id)
                }
              }
            }, '删除')
          }
        }
      ],
      books: [],
      totalCount: 0,
      pageSize: 8,
      simpleBooks: [],
      modal1: false,
      newBooksTitle: '',
      tableLoading: false
    }
  },
  created() {
    this._uppdateBooks()
  },
  methods: {
    _uppdateBooks() {
      Notebooks.getNotebooks()
        .then((res) => {
          this.totalCount = res.data.length
          this._changeArray(res.data.reverse())
          this.simpleBooks = this.books.slice(0, this.pageSize)
        })
    },
    _changeArray(array) {
      array.map((value) => {
        let obj = {}
        Object.keys(value).forEach((key) => {
          switch (key) {
            case 'id':
              obj.id = value[key]
              break
            case 'userId':
              obj.author = value[key]
              break
            case 'title':
              obj.name = value[key]
              break
            case 'updatedAt':
              obj.date = moment(value[key]).format('YYYY-MM-DD HH:mm:ss')
              break
            case 'noteCounts':
              obj.count = value[key]
              break
            default:
              break
          }
        })
        this.books.push(obj)
      })
    },
    changePage(index) {
      let start = (index - 1) * this.pageSize
      let end = index * this.pageSize
      this.simpleBooks = this.books.slice(start, end)
    },
    modalOK() {
      if (this.newBooksTitle === '') {
        this.$Message.error('笔记本标题不能为空')
      } else if (this.newBooksTitle.length > 30) {
        this.$Message.error('笔记本标题不能超过30个字符')
      } else {
        Notebooks.addNotebooks({title: this.newBooksTitle})
          .then((res) => {
            this.books = [] // 添加笔记时要把之前笔记本清空
            this._uppdateBooks()
            this.$Message.success('笔记已经添加到列表中了~')
          })
          .catch((error) => {
            console.log(error)
          })
        this.newBooksTitle = '' // 清空之前输入的内容
      }
    },
    modalCancel() {
      this.newBooksTitle = '' // 清空之前输入的内容
    },
    deleteNotebook(id) {
      this.tableLoading = true
      Notebooks.deletenotebook({notebookId: id})
        .then((res) => {
          this.books = [] // 笔记本清空
          this.$Message.success('笔记本删除成功')
          this._uppdateBooks()
          this.tableLoading = false
        })
        .catch((error) => {
          this.tableLoading = false
          this.$Message.error(error.msg)
        })
    },
    seclectBook(book) {
      this.$router.push({path: 'notes', query: { notebookId: book.id }})
    },
    _exportData() {
      this.$refs.table.exportCsv({
        filename: '笔记本'
      })
    }
  }
}
</script>

<style lang='less' scoped>
.layout{
  margin: 10px;
  background: #fff;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #dcdee2;
}
.ivu-layout-header{
  height: 50px;
  padding: 0 10px;
  line-height: 50px;
  background: #fff;
  border-radius: 5px;
}
.ivu-layout-content{
  min-width: 600px;
}
.ivu-layout-footer{
  min-width: 410px;
  text-align: right;
  background: #fff;
}
</style>