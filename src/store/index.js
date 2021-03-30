import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 所有任务列表
    list: [],
    // 输入框的动态值
    inputValue: '',
    cateId: 5,
    status: 'all'
  },
  mutations: {
    initList(state, list) {
      state.list = list
    },
    // 同步 inputValue 的值
    changInputValue(state, val) {
      state.inputValue = val
    },
    addTodo(state) {
      const obj = {
        id: state.cateId,
        done: false,
        info: state.inputValue.trim()
      }
      state.list.push(obj)
      state.cateId++
    },
    removeTodo(state, id) {
      const i = state.list.findIndex(x => x.id === id)
      if (i !== -1) {
        // console.log(i)
        state.list.splice(i, 1)
      }
    },
    changeDone(state, id) {
      state.list.some(item => {
        if (item.id === id) {
          item.done = !item.done
          return true
        }
      })
    },
    // 清除已完成
    cleanDone(state) {
      state.list = state.list.filter(x => x.done === false)
    },
    // 点击按钮改变状态
    changeStatus(state, status) {
      state.status = status
    }
  },
  actions: {
    getList(context) {
      // 当前项目下的 public 中的文件
      axios.get('/list.json').then(({ data }) => {
        // 用then捕获并结构出data,调用mutations中的方法修改state中的值
        context.commit('initList', data)
        // console.log(data)
      })
    }
  },
  getters: {
    undoneList(state) {
      return state.list.filter(x => x.done === false).length
    },
    todolist(state) {
      if (state.status === 'all') {
        return state.list
      } else if (state.status === 'undone') {
        return state.list.filter(x => x.done === false)
      }
      return state.list.filter(x => x.done === true)
    }
  },
  modules: {}
})
