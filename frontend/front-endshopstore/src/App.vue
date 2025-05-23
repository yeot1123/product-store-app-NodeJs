<template>
  <div class="container">

    <h1>📝 Todo App</h1>
    <form class="" @submit.prevent="addTodo">
      <input v-model="newTodo" placeholder="เพิ่มรายการ..." />
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl" type="submit">เพิ่ม</button>
    </form>

    <ul>
      <li v-for="todo in todolist"> {{todo}} </li>
    </ul>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'

  const todos = ref([])           // เก็บรายการ todo
  const newTodo = ref('')         // สำหรับ input ใหม่

  let todolist = ["MakeCoffee", "Listsample", "3"]


  // ดึง todos จาก backend
  const fetchTodos = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/todos')
      todos.value = res.data
    } catch (err) {
      console.error('ดึงข้อมูลล้มเหลว:', err)
    }
  }

  // เพิ่ม todo
  const addTodo = async () => {
    if (!newTodo.value.trim()) return

    try {
      const res = await axios.post('http://localhost:3000/api/todos', {
        text: newTodo.value
      })
      todos.value.push(res.data)   // เพิ่มลง list
      newTodo.value = ''           // ล้าง input
    } catch (err) {
      console.error('เพิ่มข้อมูลล้มเหลว:', err)
    }
  }

  // โหลดเมื่อเปิดหน้า
  onMounted(fetchTodos)
</script>

<style scoped>
  .container {
    max-width: 400px;
    margin: 40px auto;
    font-family: sans-serif;
  }
  form {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  input {
    flex: 1;
    padding: 8px;
  }
  button {
    padding: 8px 16px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
</style>
