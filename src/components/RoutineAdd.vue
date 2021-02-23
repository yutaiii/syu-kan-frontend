<template>
  <v-container>
    <h1>習慣新規登録</h1>

    <v-row>
      <v-col cols="3"></v-col>
      <v-col cols="6">
        <div>
          <v-form ref="routine_add_form">
            <template v-for="(r, index) in newRoutines">
              <v-text-field
                :key="index"
                label="習慣名"
                :rules="rules"
                hide-details="auto"
                v-model="newRoutines[index].name"
              >
            </v-text-field>
            </template>
          </v-form>
        </div>

        <v-btn
          class="ma-4"
          fab
          dark
          small
          color="deep-orange"
          @click="addRoutine()"
        >
          <v-icon>
            mdi-plus
          </v-icon>
        </v-btn>
      </v-col>
      <v-col cols="3"></v-col>
    </v-row>

    <v-btn
      class="ma-3"
      color="gray"
      @click="$router.go(-1)"
    >戻る</v-btn>
    <v-btn
      color="success"
      @click="onSubmitClicked()"
    >登録</v-btn>
  </v-container>

</template>

<script>
import axios from 'axios';
import firebase from 'firebase';

export default {
  name: 'RoutineAdd',
  data: () => ({
    rules: [
      value => !!value || '習慣名は必須です',
    ],
    newRoutineInitObject: {
      name: "",
      startedAt: new Date(),
    },
    newRoutines: [
      {
        name: "",
        startedAt: new Date(),
      }
    ],

  }),
  methods: {
    onSubmitClicked() {
      let userId = this.getUserId()
      if (userId = -1) {
        alert('エラーが発生しました');
      }
      console.log(userId)
      return;
      // バリデーションがOKの場合
      if (this.$refs.routine_add_form.validate()) {

        let requestParam = [];
        for (let i = 0; i < this.newRoutines.length; i++) {
          let param = {
            "name": this.newRoutines[i].name,
            "userId": 2,
            "startedAt": this.newRoutines[i].startedAt,
          };
          requestParam.push(param);
        }
        console.log(requestParam);

        // Post to API
        axios.post('http://localhost:8000/routines/create', requestParam)
          .then(res => {
            console.log('res', res)
          })
          .catch(e => {
            console.log('e', e)
          })
      }
    },
    // TODO 2回リクエストが投げられている
    // https://labor.ewigleere.net/2019/01/29/vue-axios-post-twise/
    getUserId() {
      let user = firebase.auth().currentUser;
      console.log(user.uid);
      let requestParam = {
        "firebaseUid": user.uid
      };
      axios.post('http://localhost:8000/users/find', requestParam)
      .then(res => {
        console.log("in then")
        console.log(res)
        return res.data.id;
      })
      .catch(e => {
        return -1;
      });
    },
    addRoutine() {
      this.newRoutines.push(this.newRoutineInitObject);
    }
  }
}
</script>