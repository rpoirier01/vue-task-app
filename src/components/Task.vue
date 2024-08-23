<template>
    <div class="task-item">
      <span class="task-text">{{ task }}</span>
      <button class="edit-button" @click="onEdit">Edit</button>
      <button class="delete-button" @click="onDelete">Delete</button>
    </div>
</template>

<script>
    export default{
        name: 'Task', //name of our component
        props: {
            task:{ //not really necessary, more for typescript
                type: String,
                required: true
            }
        },
        methods: {
            onEdit(){
                this.$emit('edit-task');
            },
            onDelete(){
                this.$emit('delete-task');
            }
        }
    }

</script>