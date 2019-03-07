<template>
  <div class="trash">
    <Card class="card" v-for="(item, index) in trashNotes" :key="index">
      <p slot="title" class="title">
          {{item.title}}
      </p>
      <Icon @click="_confirmRevert(item.id, index)" slot="extra" color="#01A82D" size="24" type="md-sync" />
      <Icon @click="_confirmDelete(item.id, index)" slot="extra" color="#999" size="24" type="md-trash" />
      <p class="note-content">
        {{item.content}}
      </p>
    </Card>
    <div class="no-trash" v-if="trashNotes.length === 0">
      回收站空空如也~
    </div>
  </div>
</template>

<script>
import Trash from '../apis/Trash'
export default {
  data () {
    return {
      trashNotes: []
    }
  },
  created() {
    this.getTrash()
  },
  methods: {
    getTrash() {
      Trash.getTrash()
        .then((res) => {
          this.trashNotes = res.data
        })
        .catch((error) => {
          this.$Message.error(error.msg)
        })
    },
    _confirmRevert(id, index) {
      Trash.revertNote({noteId: id})
        .then((res) => {
          this.trashNotes.splice(index, 1) // 视觉上删除笔记
          console.log(res)
          this.$Message.success('回收成功')
        })
        .catch((error) => {
          this.$Message.error(error.msg)
        })
    },
    _confirmDelete(id, index) {
      this.$Modal.confirm({
        title: '确定要删除该笔记吗？',
        content: `<p>删除后不可撤回</p>`,
        onOk: () => {
          Trash.deleteNote({noteId: id})
            .then((res) => {
              this.trashNotes.splice(index, 1) // 视觉上删除笔记
              this.$Message.success('删除成功')
            })
            .catch((error) => {
              this.$Message.error(error.msg)
            })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.trash{
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px 0 0 10px;
}
.card{
  width: 200px;
  display: inline-block;
  margin: 10px;
}
.title{
  max-width: 120px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.note-content{
  height: 100px;
  overflow: auto;
}
.no-trash{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
</style>