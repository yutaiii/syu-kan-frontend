<template>
  <v-container>
    <v-row justify="center" align-content="center">
      <v-col cols="3"></v-col>
      <v-col cols="6">

        <v-row>
          <v-col class="text-right">
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="ma-2"
                  fab
                  dark
                  small
                  color="blue-grey lighten-2"
                  v-bind="attrs"
                  v-on="on"
                  to="/routine-edit"
                >
                  <v-icon>
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </template>
              <span>習慣編集</span>
            </v-tooltip>
          </v-col>
        </v-row>

        <v-stepper v-model="stepper">
          <v-stepper-header>
            <v-stepper-step
              :complete="stepper > 1"
              step="1"
            >
              今日の成果登録
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              :complete="stepper > 2"
              step="2"
            >
              登録完了
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <v-row justify="center" align-content="center">
                <v-col cols="12">
                  <template v-for="(r, index) in routines">
                    <v-checkbox
                      class="routine-checkbox"
                      :key="index"
                      :input-value="r.achieved"
                      :label="r.name"
                      @change="updateAchieved(index)"
                    ></v-checkbox>
                  </template>
                </v-col>
              </v-row>
              <v-btn
                class="ma-3"
                color="gray"
                to="/"
              >ホームに移動</v-btn>
              <v-btn
                class="ma-3"
                color="success"
                @click="onRegisterClick()"
              >登録</v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
              <div>登録完了。今日も1日お疲れ様でした！</div>
              <v-btn
                class="ma-3"
                color="success"
                to="/"
              >ホームに移動</v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
      <v-col cols="3"></v-col>
    </v-row>

  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'RoutineCheck',
  data () {
    return {
      routines: [],
      registeredRoutines: [],
      checkbox: true,
      stepper: 1,
    }
  },methods: {
    updateAchieved(index) {
      this.routines[index].achieved = !this.routines[index].achieved;
    },
    onRegisterClick() {
      let requestParams = [];
      for(let i = 0; i < this.routines.length; i++) {
        let param = {
          "routineId": this.routines[i].id,
          "date" : new Date(),
          "achieved": this.routines[i].achieved ? true : false
        };
        requestParams.push(param);
      }

      // Post to API
      axios.post('http://localhost:8000/progress', requestParams)
        .then(() => {
          this.stepper = 2;
        })
        .catch(() => {
          alert('エラーが発生しました');
        });
    },
  },
  created: function() {
    let targetUrl = 'http://localhost:8000/users/' + String(this.$store.getters.userId) + '/routines';
    axios.get(targetUrl)
    .then(res => {
      this.routines = res.data;
    })
    .catch(() => {
      alert('エラーが発生しました');
    });

    // 今日の進捗が登録されているか確認
    targetUrl = 'http://localhost:8000/users/' + String(this.$store.getters.userId) + '/progress/today';
    axios.get(targetUrl)
    .then(res => {
      this.registeredRoutines = res.data;
      // すでに今日の進捗が提出済みの習慣を見つけて
      // チェックボックスにチェックをつける
      for (let r of this.routines) {
        for (let rr of this.registeredRoutines) {
          if (r.id === rr.routineId) {
            r.achieved = true;
          }
        }
      }

      // TODO delete insert
      // upsertでも良いかも
    })
    .catch(() => {
      alert('エラーが発生しました');
    });
  }
}
</script>

<style scoped>
.routine-checkbox >>> label {
  font-size: 20px;
  word-break: break-all;
}
</style>