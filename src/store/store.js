import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from '../reducer';
import logger from 'redux-logger';

export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV === 'development', // 개발환경 true , 배포환경 false
    middleware: (getDefaultMiddleware) => {
        // rtk의 기존 미들웨어 설정을 불러옴
        if (process.env.NODE_ENV === 'development') {
            return [...getDefaultMiddleware(), logger];
        }
    },
});
