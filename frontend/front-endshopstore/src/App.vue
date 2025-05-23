<template>
  <div class="container grid" >

    <h1>📝 Todo App</h1>
    <form @submit.prevent="addTodo" class="grid" >
      <input v-model="profileInputs.username" placeholder="เพิ่มรายการ username" >
      <input v-model="profileInputs.age" placeholder="อายุ" >

      <input v-model="profileInputs.bio" placeholder=" Short Bio ">
      <input v-model="profileInputs.gender" placeholder= "เพศ">

      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl" type="submit">เพิ่ม</button>
    </form>

    <ul>
      <li v-for="(value, key) in todos"> id: {{key}}, {{value}} </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import axios from 'axios'

  const todos = ref([])           // เก็บรายการ todo

  //let todolist = ["MakeCoffee", "Listsample", "3"]

  interface ProfileInputs {
    username: string,
    age: number,
    bio: String,
    gender: 'male'|'female'|'other',
  }

  const profileInputs = ref<ProfileInputs>({
    username: '',
    age: 0,
    bio: '',
    gender: 'male'
  })



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
    try {
      const res = await axios.post('http://localhost:3000/api/todos', profileInputs.value)
      todos.value.push(res.data)

      // เคลียร์ input หลังจากเพิ่ม
      profileInputs.value = {
        username: '',
        age: 0,
        bio: '',
        gender: 'male'
      }

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
