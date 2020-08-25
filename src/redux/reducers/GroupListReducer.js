import {GROUP_LIST} from '../const';
const initialState = {
  GroupList: [],
};
export default function GroupListData(state = initialState, action) {
  switch (action.type) {
    case GROUP_LIST:
      return {
        ...state,
        IsGroupList: true,
        GroupList: action.user,
      };
    default:
      return state;
  }
}
