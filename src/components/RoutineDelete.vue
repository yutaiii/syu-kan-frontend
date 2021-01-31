<template>
  <v-container>
    <h1>習慣削除</h1>
    <h3>削除する習慣にチェックをつけてください</h3>

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
              <v-icon
                slot="append"
                @click="onDeleteClickd()"
              >
                mdi-trash-can
              </v-icon>
            </v-text-field>
          </template>
        </v-form>

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
      @click="onSubmitClicked()"
    >削除</v-btn>
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
    axios.get('http://localhost:8000/routines')
      .then(res => {
        this.routines = res.data;
      })
      .catch(e => {
        console.log('e', e)
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
          .then(res => {
            console.log('res', res)
          })
          .catch(e => {
            console.log('e', e)
          })
      }
    },
    onDeleteClickd() {
      console.log('delete')
    }
  }
}
</script>