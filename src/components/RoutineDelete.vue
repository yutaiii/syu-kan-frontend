<template>
  <v-container>
    <h1>習慣削除</h1>
    <h3>削除する習慣にチェックをつけてください</h3>

    <v-alert
      v-model="errorDialog"
      dismissible
      color="orange"
      border="left"
      elevation="2"
      colored-border
    >
      削除する場合は1つ以上にチェックをつけてください。
    </v-alert>

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
    errorDialog: false,
  }),
  created: function() {
    let targetUrl = 'http://localhost:8000/users/' + String(this.$store.getters.userId) + '/routines';
    axios.get(targetUrl)
      .then(res => {
        this.routines = res.data;
      })
      .catch(() => {
        alert('エラーが発生しました');
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
        this.errorDialog = true;
        return;
      }

      let targetUrl = 'http://localhost:8000/users/' + String(this.$store.getters.userId) + '/routines';

      // deleteの場合は{data: hoge}として送信しないとエラーになる
      // https://github.com/axios/axios/issues/3220
      // https://qiita.com/reflet/items/d5658d5d69e8e1ccd489#delete-%E5%89%8A%E9%99%A4
      axios.delete(targetUrl, {data: requestParam})
        .then(() => {
          let newRoutines = [];
          for (let i = 0; i < this.routines.length; i++) {
            if (!this.routines[i].deleteFlag) {
              newRoutines.push(this.routines[i]);
            }
          }
          this.routines = newRoutines;
          alert('削除が完了しました');
        })
        .catch(() => {
          alert('削除に失敗しました');
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