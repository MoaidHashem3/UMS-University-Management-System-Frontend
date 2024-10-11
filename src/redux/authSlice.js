import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      const userData = action.payload.user || action.payload.data;
      state.user = {
        ...userData,
        quizzes: userData.quizzes,
      };
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };  // Update user data in the state
    },
    addQuizToUser(state, action) {
      const { quizId, score } = action.payload;

      console.log(action.payload)
      const existingQuiz = state.user.quizzes.find(q => q.quizId === quizId);
      if (existingQuiz) {
        existingQuiz.totalScore = score;
      } else {
        state.user.quizzes.push({ quizId, totalScore: finalScore });
      }
    },
  },
});

export const { login, logout, setUser, addQuizToUser, updateUser} = authSlice.actions;
export default authSlice.reducer;
