import {configureStore} from '@reduxjs/toolkit'
import userSlice from "./features/userSlice";
import appApi from "./service/appApi";

//persists our store   (refresh won't remove data)
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import {persistReducer} from 'redux-persist';