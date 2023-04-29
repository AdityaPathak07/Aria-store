import {configureStore} from '@reduxjs/toolkit'
import { combineReducers } from '@reduxjs/toolkit'
import { newProductReducer, newReviewReducer,productDetailsReducer, productsReducer, productReducer, productReviewsReducer, reviewReducer } from './reducers/ProductReducer';
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import storage from 'redux-persist/lib/storage'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from './reducers/orderReducer';


export const rootReducers = combineReducers({
  products: productsReducer,
  productDetails : productDetailsReducer,
  user : userReducer,
  profile : profileReducer,
  forgotPassword : forgotPasswordReducer,
  cart : cartReducer,
  newOrder : newOrderReducer,
  myOrders : myOrdersReducer,
  orderDetails : orderDetailsReducer,
  newReview : newReviewReducer,
  newProduct : newProductReducer,
  product : productReducer,
  allOrders : allOrdersReducer,
  order : orderReducer,
  allUsers : allUsersReducer,
  userDetails : userDetailsReducer,
  productReviews : productReviewsReducer,
  review : reviewReducer,
})

const persistConfig = {
  key: 'root',
  storage: storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducers)
 
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export default store;
