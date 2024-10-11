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
        enrolledCourses: userData.enrolledCourses || [], // Ensure enrolledCourses exists
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
    updateUser(state, action) {
      state.user = { ...state.user, ...action.payload }; // Update user data in the state
    },
    addQuizToUser(state, action) {
      const { quizId, score } = action.payload;
      const existingQuiz = state.user.quizzes.find(q => q.quizId === quizId);
      if (existingQuiz) {
        existingQuiz.totalScore = score;
      } else {
        state.user.quizzes.push({ quizId, totalScore: score });
      }
    },
    // New action to enroll in a course
    enrollCourse(state, action) {
      const courseId = action.payload; 
      if (!state.user.enrolledCourses.includes(courseId)) {
        state.user.enrolledCourses.push(courseId);
      }
    },
  },
});

export const { login, logout, setUser, addQuizToUser, updateUser, enrollCourse } = authSlice.actions;
export default authSlice.reducer;
