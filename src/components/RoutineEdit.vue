<template>
  <v-container>
    <h1>習慣編集</h1>

    <v-row justify="center" align-content="center">
      <v-col cols="3"></v-col>
      <v-col cols="6">
        <v-form ref="routine_edit_form">
          <template v-for="(r, index) in routines">
            <v-text-field
              :key="index"
              :label="'習慣名' + parseInt(index + 1, 10)"
              :rules="rules"
              hide-details="auto"
              v-model="routines[index].name"
            >
          </v-text-field>
          </template>
        </v-form>

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

export default {
  name: 'RoutineEdit',
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
    onSubmitClicked() {
      // バリデーションがOKの場合
      if (this.$refs.routine_edit_form.validate()) {
        let requestParam = [];
        for (let i = 0; i < this.routines.length; i++) {
          let param = {
            "id": this.routines[i].id,
            "name": this.routines[i].name,
            "startedAt": this.routines[i].startedAt,
          };
          requestParam.push(param);
        }

        // Post to API
        axios.put('http://localhost:8000/routines/update', requestParam)
          .then(() => {
            alert('習慣の更新が完了しました');
          })
          .catch(() => {
            alert('習慣の更新に失敗しました');
          })
      }
    },
    addRoutine() {
      this.routines.push(this.routineInitObject);
    }
  }
}
</script>