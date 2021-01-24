<template>
  <v-container>
    <v-row justify="center" align-content="center">
      <v-col cols="4"></v-col>
      <v-col cols="4">
        <template v-for="(r, index) in routines">
          <v-checkbox
            class="routine-checkbox"
            :key="index"
            :input-value="r.acheived"
            :label="r.name"
            @change="updateAcheived(index)"
          ></v-checkbox>
        </template>
      </v-col>
      <v-col cols="4"></v-col>
    </v-row>
    <v-btn
      color="success"
    >登録</v-btn>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'RoutineCheck',
  data () {
    return {
      routines: [],
      checkbox: true,
    }
  },methods: {
    updateAcheived(index) {
      this.routines[index].acheived = !this.routines[index].acheived;
    }
  },
  created: function() {
    axios.get('http://localhost:8000/routines')
      .then(res => {
        this.routines = res.data;
      })
      .catch(e => {
        console.log('e', e)
      })
  }
}
</script>

<style scoped>
.routine-checkbox >>> label {
  font-size: 20px;
  word-break: break-all;
}
</style>