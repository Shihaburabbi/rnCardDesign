import { call, put, select, takeLatest } from 'redux-saga/effects'
import QB, { Alert } from 'quickblox-react-native-sdk'

import {
  usersCreateFail,
  usersCreateSuccess,
  usersGetFail,
  usersGetSuccess,
  usersUpdateFail,
  usersUpdateSuccess,
} from '../actionCreators'
import {
  USERS_CREATE_REQUEST,
  USERS_GET_REQUEST,
  USERS_UPDATE_REQUEST,
} from '../constants'
import { showError } from '../NotificationService'
import axios from 'axios'

import {TOKEN,GETONETOONECHAT} from '../../App/Conestent/api'

const backgroundColors = [
  '#53c6a2',
  '#fdd762',
  '#9261d3',
  '#43dce7',
  '#ffcc5a',
  '#ea4398',
  '#4a5de1',
  '#e95555',
  '#7eda54',
  '#f9b647',
]
const getRandomColor = () => {
  return backgroundColors[backgroundColors.length * Math.random() | 0]
}

const defaultQuery = {
  append: false,
  page: 1,
  perPage: 30,
  sort: {
    ascending: false,
    field: QB.users.USERS_FILTER.FIELD.UPDATED_AT,
    type: QB.users.USERS_FILTER.TYPE.DATE
  },
}

export function* createUser(action = {}) {
  const { resolve, reject, ...userData } = action.payload
  try {
    const user = yield call(QB.users.create, userData)
    const result = usersCreateSuccess(user)
    yield put(result)
    if (resolve) resolve(result)
  } catch (e) {
    const result = usersCreateFail(e.message)
    yield put(result)
    if (reject) reject(result)
  }
}

// export function* getUsers(action = {}) {
//   try {
//     const query = action.payload || {}
//     // const savedUsers = yield select(({ users }) => users.users)
//     const filter = Object.assign({}, defaultQuery, query)
//     const headerParams = {
//       'Content-Type': `multipart/form-data`
//     };
//     var form = new FormData();
//     form.append('token', TOKEN);
    
//      const userdata = yield call(axios.post, GETONETOONECHAT, form, {headers:headerParams});
//     //  alert(JSON.stringify(userdata.data.data))
//      let responsedata=[] 

//      for( let i=0;i<userdata.data.data.length;i++){
//           responsedata.push({
//             fullName: userdata.data.data[i].fname,
//             login: userdata.data.data[i].username,
//             id: userdata.data.data[i].id,
//             lastRequestAt: '2022-09-10T09:35:05.000+0000',
//             color:'#f9b647'
//           });
//       }
//       const result = usersGetSuccess({
//         append: filter.append,
//         page: 1,
//         perPage: 10,
//         total: responsedata.length,
//         users: responsedata,
//       })
//       yield put(result)
//       return result 
//   } catch (e) {
//     const result = usersGetFail(e.message)
//     yield put(result)
//     showError('Failed to get users', e.message)
//     return result
//   }
// }

export function* getUsers(action = {}) {
  try {
    const query = action.payload || {}
    const savedUsers = yield select(({ users }) => users.users)
    const filter = Object.assign({}, defaultQuery, query)
    const response = yield call(QB.users.getUsers, filter)
    const usersWithColor = response.users.map(user => {
      const savedUser = savedUsers.find(u => u.id === user.id)
      const color = savedUser && savedUser.color ?
        savedUser.color :
        getRandomColor()
      return { ...user, color }
    })
    const result = usersGetSuccess({
      append: filter.append,
      page: response.page,
      perPage: response.perPage,
      total: response.total,
      users: usersWithColor,
    })
    yield put(result)
    return result
  } catch (e) {
    const result = usersGetFail(e.message)
    yield put(result)
    showError('Failed to get users', e.message)
    return result
  }
}

export function* updateUser(action = {}) {
  const { resolve, reject, ...userData } = action.payload
  try {
    const user = yield call(QB.users.update, userData)
    const result = usersUpdateSuccess(user)
    yield put(result)
    if (resolve) resolve(result)
  } catch(e) {
    const result = usersUpdateFail(e.message)
    yield put(result)
    if (reject) reject(result)
  }
}

export default [
  takeLatest(USERS_CREATE_REQUEST, createUser),
  takeLatest(USERS_GET_REQUEST, getUsers),
  takeLatest(USERS_UPDATE_REQUEST, updateUser),
]
