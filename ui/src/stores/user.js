import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import apollo from '@/apollo';
import gql from 'graphql-tag';
import log from 'loglevel';

// const SIG_EXPIRED_MSG = 'Signature has expired';

// // refresh jwt token
// backend.interceptors.response.use((response) => response, async (error) => {
//   const errorMessage = error.response?.data;
//   switch (error.response?.status) {
//     case 401:
//       if (errorMessage === SIG_EXPIRED_MSG) {
//         if (!error.config.retry) {
//           // eslint-disable-next-line no-param-reassign
//           error.config.retry = true;
//           backend.defaults.xsrfCookieName = 'csrf_refresh_token';
//           await backend.post('/auth/refresh/');
//           backend.defaults.xsrfCookieName = 'csrf_access_token';
//           return backend(error.config);
//         }
//         if (!window.location.href.includes('login')) {
//           window.location.href = '/login';
//         }
//       }
//       break;
//     default:
//       break;
//   }
//   return error.response;
// });

export default defineStore('user', () => {
  const user = useLocalStorage('user', {});

  async function fetchUser() {
    apollo
      .query({
        query: gql`
          query me {
            meUser {
              user {
                email
                name
              }
            }
          }
        `,
      })
      .then((res) => {
        user.value = res.data.meUser.user;
        log.debug('me', user.value);
      });
  }

  async function login(email, password) {
    apollo
      .mutate({
        mutation: gql`
          mutation login($email: String!, $password: String!) {
            loginUser(email: $email, password: $password) {
              user {
                email
                name
              }
            }
          }
        `,
        variables: {
          email,
          password,
        },
      })
      .then(() => {
        log.debug('login succes');
        fetchUser();
      });
  }

  async function logout() {
    apollo
      .mutate({
        mutation: gql`
          mutation logoutUser {
            logoutUser
          }
        `,
      })
      .then(() => {
        user.value = undefined;
        log.debug('logged out user');
      });
  }

  return {
    user,
    login,
    logout,
  };
});
