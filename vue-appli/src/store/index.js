import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { // 1
    gender: '',
    year: '',
    month: '',
    day: '',
    question1: '',
    question2: '',
    question3: '',
    step3Text: ''
  },
  getters: { // 2
    gender: state => state.gender,
    year: state => state.year,
    month: state => state.month,
    day: state => state.day,
    question1: state => state.question1,
    question2: state => state.question2,
    question3: state => state.question3,
    step3Text: state => state.step3Text
  },
  mutations: { // 3
    setGender: function(state, gender){
      state.gender = gender
    },
    setYear: function(state, year){
      state.year = year
    },
    setMonth: function(state, month){
      state.month = month
    },
    setDay: function(state, day){
      state.day = day
    },
    setQuestion1: function(state, question1){
      state.question1 = question1
    },
    setQuestion2: function(state, question2){
      state.question2 = question2
    },
    setQuestion3: function(state, question3){
      state.question3 = question3
    },
    setStep3Text: function(state, step3Text){
      state.step3Text = step3Text
    }
  },
  actions: { // 4
    getGender: function({ commit }, gender ) {
      commit('setGender', gender)
    },
    getYear: function({ commit }, year ) {
      commit('setYear', year)
    },
    getMonth: function({ commit }, month ) {
      commit('setMonth', month)
    },
    getDay: function({ commit }, day ) {
      commit('setDay', day)
    },
    getQuestion1: function({ commit }, question1 ) {
      commit('setQuestion1', question1)
    },
    getQuestion2: function({ commit }, question2 ) {
      commit('setQuestion2', question2)
    },
    getQuestion3: function({ commit }, question3 ) {
      commit('setQuestion3', question3)
    },
    getStep3Text: function({ commit }, step3Text ) {
      commit('setStep3Text', step3Text)
    }
  }
})