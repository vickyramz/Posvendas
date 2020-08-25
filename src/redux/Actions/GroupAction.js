import  {GROUP_LIST} from '../const';
export function saveList(user) {
  saveListsuccess(user);
}
export function saveListsuccess(user) {
  console.log('vicky',user)
  return {
    type: GROUP_LIST,
    user,
  };
}
