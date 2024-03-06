export const constants = {
  CURRENT_TOKEN: 'CURRENT_TOKEN',
};

const apiUrl = 'http://localhost:8000/api';

export const apiEndpoint = {
  AuthEndpoint: {
    login: `${apiUrl}/login`,
    logout: `${apiUrl}/logout`,
    loggedUser: `${apiUrl}/user`,
  },
  TodoEndpoint: {
    getAllTodo: `${apiUrl}/todo`,
    addTodo: `${apiUrl}/todo`,
    updateTodo: `${apiUrl}/todo`,
  },
};
