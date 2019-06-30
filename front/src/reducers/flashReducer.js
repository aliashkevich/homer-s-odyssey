export default function(state = {}, action) {
  switch (action.type) {
    case 'CREATE_SESSION':
      return {
        ...state,
        message: action.message,
      };
    case 'DELETE_SESSION':
      return {
        ...state,
        message: '',
      };
    default:
      return state;
  }
}
