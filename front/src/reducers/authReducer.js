export default function(state = {}, action) {
  switch (action.type) {
    case 'CREATE_SESSION':
      return {
        ...state,
        token: action.token,
        user: action.user,
        message: action.message,
      };
    case 'DELETE_SESSION':
      return {
        ...state,
        token: '',
        user: '',
        message: '',
      };
    default:
      return state;
  }
}
