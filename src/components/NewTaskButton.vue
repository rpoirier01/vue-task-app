<template>
    <button @click="createNewTask">New Task</button>
</template>

<script>
    export default{
        name:'NewTaskButton',
        methods:{
            createNewTask(){
                const task = prompt('Enter Task Name'); //this will just open a popup
                if(task){
                    this.$emit('add-task', task);//sends a signal to the app.vue that a task is added
                }
                else{
                    alert('Please Enter a task')
                }
            }
        }
    }
</script>