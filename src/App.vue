<script setup>
</script>

<template>
  <div id="app">
    <NewTaskButton @add-task="addTask" />

    <ul class="task-list">
      <li v-for="(task, index) in tasks" :key="index">
          <!-- {{task}} -->
           <Task
            :task="task" 
            @edit-task="editTask(index)"
            @delete-task="deleteTask(index)"
            />
      </li>
    </ul>
  </div>
</template>

<script>
import NewTaskButton from './components/NewTaskButton.vue';
import Task from './components/Task.vue'
import { getTasks, saveNewTask, deleteDBTask } from './requests';


export default {
  name: 'App',  // identifies component
  components: {
    NewTaskButton,  // need to register components to be used in this components template
    Task
  },
  data(){//automatically reactive, stores raw state of components, computed is derived from other reactive properties
    //computed updates when the data they depend on changes
    return{
      tasks:[]
    }
  },
  async created(){
    try {
      // this.tasks = await getTasks();
      const response= await getTasks();
      let newTasks=response.tasks;
      for(let i=0;i<newTasks.length;i++){ //clean the tasks to just description
        this.tasks.push(newTasks[i].description)
      }
    } catch(error){
      console.error('Could not fetch tasks: ', error)
    }
  },
  methods:{
    addTask(task){
      saveNewTask(task)
      this.tasks.push(task); //adds new task to the list
    },
    editTask(index){
      const newTask = prompt('Enter New Task');
      if(newTask){
        this.tasks[index] = newTask; //vue3 syntax to update an array by index, rather than .$set
      }
      else{
        alert('Please Enter a task')
      }
    },
    deleteTask(index){
      deleteDBTask(this.tasks[index])
      this.tasks.splice(index, 1);
    }
  }
};
</script>
