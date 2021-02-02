<template>
  <v-container>
    <h1>習慣削除</h1>
    <h3>削除する習慣にチェックをつけてください</h3>

    <v-row justify="center" align-content="center" class="mt-3">
      <v-col cols="3"></v-col>
      <v-col cols="6">
        <template v-for="(r, index) in routines">
          <v-checkbox
            class="routine-checkbox"
            :key="index"
            :input-value="r.acheived"
            :label="r.name"
            @change="deleteChecked(index)"
          ></v-checkbox>
        </template>

      </v-col>
      <v-col cols="3"></v-col>
    </v-row>

    <v-btn
      class="ma-3"
      color="gray"
      @click="$router.go(-1)"
    >戻る</v-btn>
    <v-btn
      color="error"
      @click="onDeleteClickd()"
    >削除</v-btn>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RoutineDelete',
  data: () => ({
    routines: [],
    rules: [
      value => !!value || '習慣名は必須です',
    ],
    routineInitObject: {
      name: "",
      startedAt: new Date(),
    },
  }),
  created: function() {
    axios.get('http://localhost:8000/routines')
      .then(res => {
        this.routines = res.data;
      })
      .catch(e => {
        console.log('e', e)
      })
  },
  methods: {
    deleteChecked(index) {
      this.routines[index].deleteFlag = !this.routines[index].deleteFlag;
    },
    onDeleteClickd() {
      let requestParam = [];
      for (let i = 0; i < this.routines.length; i++) {
        if (!this.routines[i].deleteFlag) {
          continue;
        }

        let param = {
          "id": this.routines[i].id,
        };
        requestParam.push(param);
      }
      // 1つ以上チェックされているか？
      if (requestParam.length < 1) {
        // TODO pop upにしたい
        console.log("error")
        return;
      }

      // Post to API
      axios.post('http://localhost:8000/routines/delete', requestParam)
        .then(res => {
          // TODO pop upにしたい
          console.log('res', res)
        })
        .catch(e => {
          console.log('e', e)
        })
  }
  }
}
</script>

<style scoped>
.routine-checkbox >>> label {
  font-size: 20px;
  word-break: break-all;
}
/* Vueがつける既存のmargin,paddingをなくす */
.v-input--selection-controls{
  margin-top: 0px;
  padding-top: 0px;
}
</style>