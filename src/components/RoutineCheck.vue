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
export default {
  name: 'RoutineCheck',
  data () {
    return {
      routines: [
        {
          name: "routine 1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabb",
          acheived: false,
        },
        {
          name: "routine 2",
          acheived: false,
        },
        {
          name: "routine 3",
          acheived: false,
        }
      ],
      checkbox: true,
    }
  },methods: {
    updateAcheived(index) {
      this.routines[index].acheived = !this.routines[index].acheived;
    }
  },
}
</script>

<style scoped>
.routine-checkbox >>> label {
  font-size: 20px;
  word-break: break-all;
}
</style>