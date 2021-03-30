<template>
  <div id="app">
    <div class="header">
      <a-input placeholder="请输入任务" class="my_ipt" @change="handleValueChange" />
      <a-button type="primary" @click="addTodoList">添加事项</a-button>
    </div>
    <a-list bordered :dataSource="todolist" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="changeDoneById(item.id)">{{ item.info }}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="removeTodoById(item.id)">删除</a>
      </a-list-item>
      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{undoneList}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="status === 'all' ? 'primary' : 'default'" @click="changeButton('all')">全部</a-button>
          <a-button :type="status === 'undone' ? 'primary' : 'default'" @click="changeButton('undone')">未完成</a-button>
          <a-button :type="status === 'done' ? 'primary' : 'default'" @click="changeButton('done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clean">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'app',
  data() {
    return {}
  },
  methods: {
    ...mapActions(['getList']),
    ...mapMutations(['changInputValue', 'addTodo']),
    // 监听输入框的值改变
    handleValueChange(e) {
      this.changInputValue(e.target.value)
      // console.log(e.target.value)
    },
    // 添加任务
    addTodoList() {
      if (this.inputValue.trim() === '') return this.$message.warning('不能为空')
      this.addTodo()
    },
    // id 删除任务
    removeTodoById(id) {
      this.$store.commit('removeTodo', id)
      // console.log(id)
    },
    changeDoneById(id) {
      // console.log(id)
      // 也可以通过 e.target.checked 接受复选框的值
      this.$store.commit('changeDone', id)
    },
    // 清除已完成
    clean() {
      this.$store.commit('cleanDone')
    },
    // 点击按钮改变状态
    changeButton(status) {
      console.log(status)
      this.$store.commit('changeStatus', status)
    }
  },
  created() {
    this.getList()
  },
  computed: {
    ...mapState(['inputValue', 'status']),
    ...mapGetters(['undoneList', 'todolist'])
  }
}
</script>

<style scoped>

#app {
  padding: 50px 10px 10px;
}
.header {
  padding-left: 100px;
  display: flex;
  justify-content: center;
}
.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin: 20px auto 0;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
