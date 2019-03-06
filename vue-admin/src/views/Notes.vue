<template>
  <Layout class="layout">
    <Sider class="sider" width="200">
      <Card dis-hover :padding="0" :bordered="false">
        <p slot="title">
          <Dropdown @on-click="selectNoteBooks" placement="bottom-start" class="dropdown-title">
            切换笔记本
            <Icon type="ios-arrow-down" />
            <DropdownMenu slot="list">
              <DropdownItem :name="item.id" v-for="(item, index) in noteBooks" :key="index">
                {{item.title}}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </p>
        <Icon class="add" slot="extra" @click.prevent="addNotes = true" color="#515a6e" size="24" type="md-add-circle" />
        <Modal v-model="addNotes" title="新建笔记" @on-ok="_addNotesOK" @on-cancel="_addNotesCancel">
          <i-input max-length="5" v-model.trim="newBooksTitle" placeholder="笔记本标题不能为空，且不超过30个字符"></i-input>
        </Modal>
        <CellGroup @on-click="selectNotes">
          <Cell :selected="num === index" :name="index" style="border-bottom: 1px solid rgb(238, 238, 238)" v-for="(item, index) in noteDetail" :key="index">
            {{item.title}}
          </Cell>
          <Cell v-if="noteDetail.length === 0">该笔记本下暂无笔记</Cell>
        </CellGroup>
      </Card>
    </Sider>
    <Layout style="min-width: 400px">
      <Header class="inner-header">
        <Row>
          <i-col :xs="0" :sm="0" :md="14">笔记本名称：{{showNoteBook.title}}</i-col>
          <i-col :xs="12" :sm="12" :md="5">
            <Button :loading="saveLoading" @click="_saveNote" type="primary">保存笔记</Button>
            </i-col>
          <i-col :xs="12" :sm="12" :md="5">
            <Button :loading="deleteLoading" @click="_deleteNote" type="primary">放入回收站</Button>
            </i-col>
        </Row>
      </Header>
      <Content class="inner-content">
        <mavon-editor @change="_getEdit" class="mavon-editor" :value="noteContent" :toolbarsFlag="false"></mavon-editor>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import Notebooks from '../apis/Notebooks'
import Notes from '../apis/Notes'
import Auth from '../apis/Auth'
export default {
  data () {
    return {
      noteBooks: [], // 所有笔记本
      showNoteBook: {}, // 所有笔记本的第一条数据，默认展示
      noteDetail: [], // 某个笔记本中的所有笔记
      noteContent: '', // 某个笔记本中的某条笔记的内容
      saveLoading: false, // 保存按钮loading
      deleteLoading: false, // 删除按钮loading
      num: 0, // 某条笔记高亮
      addNotes: false, // 点击+号新建笔记
      newBooksTitle: '', // 同步之前的笔记
      editContent: '', // 正在编辑的笔记内容
      editRenderContent: '' // 正在编辑的笔记内容(格式化之后)
    }
  },
  created() {
    if (Object.keys(this.$route.query).length === 0) {
      Notebooks.getNotebooks()
        .then((res) => {
          this.noteBooks = res.data.reverse()
          this.showNoteBook = this.noteBooks[0] // 从侧边栏进入笔记本详情时默认显示第一条
          Notes.getAllNotes({notebookId: this.showNoteBook.id})
            .then((res) => {
              this.noteDetail = res.data
              this._getNoteContent(this.noteDetail)
            })
            .catch((error) => {
              this.$Message.error(error.msg)
            })
        })
        .catch((error) => {
          this.$Message.error(error.msg)
        })
    }
  },
  watch: {
    $route: {
      handler(to, from) {
        if (to.path === '/notes' && Object.keys(to.query).length !== 0) {
          Notes.getAllNotes({notebookId: to.query.notebookId})
            .then((res) => {
              this.noteDetail = res.data
              this._getNoteContent(this.noteDetail)
              Notebooks.getNotebooks()
                .then((res) => {
                  // 修改笔记本名字
                  this.noteBooks = res.data.reverse()
                  this.showNoteBook = this.noteBooks.filter((value) => {
                    // eslint-disable-next-line
                    return value.id == to.query.notebookId
                  })[0]
                })
                .catch((error) => {
                  this.$Message.error(error.msg)
                })
            })
            .catch((error) => {
              this.$Message.error(error.msg)
            })
        }
      },
      immediate: true
    }
  },
  methods: {
    selectNoteBooks(id) {
      Notes.getAllNotes({notebookId: id})
        .then((res) => {
          this.noteDetail = res.data
          this.showNoteBook = this.noteBooks.filter((value) => {
            return value.id === id
          })[0]
          this._getNoteContent(this.noteDetail)
        })
        .catch((error) => {
          this.$Message.error(error.msg)
        })
    },
    selectNotes(index) {
      this.num = index
      this.noteContent = '' // 清空上一个编辑区内容
      this._getNoteContent(this.noteDetail, index)
    },
    _getNoteContent(note, index = 0) {
      if (note.length) {
        this.noteContent = note[index].content
      } else {
        this.noteContent = ''
      }
    },
    _addNotesOK() {
      Notes.addNote({notebookId: this.showNoteBook.id}, {title: this.newBooksTitle, content: ''})
        .then((res) => {
          this.noteDetail.push(res.data)
          this.$Message.success('添加笔记成功')
        })
        .catch((error) => {
          this.$Message.error(error.msg)
        })
    },
    _addNotesCancel() {
      this.newBooksTitle = ''
    },
    _saveNote() {
      let _that = this // 因为要使用到setTimout, 所以事先保存this
      this.saveLoading = true
      // 2秒内不能再次点击
      setTimeout(function() {
        _that.saveLoading = false
      }, 2000)
      if (this.editContent === this.noteContent) {
        this.$Message.warning('未做任何修改')
        return false
      } else {
        Auth.getInfo()
          .then((res) => {
            let _note = this.noteDetail[this.num]
            Notes.updateNote({noteId: _note.id, title: _note.title, content: this.editContent})
              .then((res) => {
                _note.content = this.editContent // 视觉上保存
                this.$Message.success('修改成功')
              })
              .catch((error) => {
                this.$Message.error(error.msg)
              })
          })
          .catch((error) => {
                this.$Message.error(error.msg)
          })
      }
    },
    _deleteNote() {
      let _that = this // 因为要使用到setTimout, 所以事先保存this
      this.deleteLoading = true
      setTimeout(function() {
        _that.deleteLoading = false
      }, 2000)
      Auth.getInfo()
        .then((res) => {
          let _note = this.noteDetail[this.num]
          Notes.deleteNote({noteId: _note.id})
            .then((res) => {
              this.noteDetail.splice(this.num, 1) // 视觉上删除笔记
              this.$Message.success('该笔记已放入回收站')
            })
            .catch((error) => {
              this.$Message.error(error.msg)
            })
        })
        .catch((error) => {
          this.$Message.error(error.msg)
        })
    },
    _getEdit(value, render) {
      this.editContent = value
      this.editRenderContent = render
    }
  }
}
</script>

<style lang='less' scoped>
.layout{
  border-top: 1px solid #f8f8f8;
  position: relative;
  height: 100%;
}
.sider{
  background: #fff;
  border-right: 1px solid #f8f8f8;
}
.dropdown-title:hover, .add:hover{
  cursor: pointer;
}
.inner-content{
  height: 100%;
}
.inner-header{
  background: #fff;
  height: 51px;
  line-height: 51px;
  color: #000;
  font-size: 18px;
}
.mavon-editor{
  height: 100%;
}
</style>