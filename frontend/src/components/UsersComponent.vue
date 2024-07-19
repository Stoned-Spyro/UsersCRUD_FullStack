<template>
    <div>
      <div>Hello</div>    
    </div>
</template>
<script>
import UserApiService from '../services/userApiService'
export default{
  
  name: 'users-component',
  data() {
    return {
      users: [],
    }
  },
  methods: {
    retrieveUsers(){
      UserApiService.getAll()
        .then(res => {
          this.users = res.data;
          console.log(res.data)
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  mounted() {
    this.retrieveUsers();
  }
  
}
</script>
<style scoped>

</style>

