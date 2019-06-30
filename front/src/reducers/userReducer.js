export default function(state = {}, action) {
  switch (action.type) {
    case 'CREATE_SESSION':
      return {
        ...state,
        user: action.user,
      };
    case 'DELETE_SESSION':
      return {
        ...state,
        user: '',
      };
    default:
      return state;
  }
}
