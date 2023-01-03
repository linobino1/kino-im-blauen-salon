import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';
import apollo from '@/apollo';
import gql from 'graphql-tag';
import log from 'loglevel';

export default defineStore('user', () => {
  const user = useLocalStorage('user', {});

  function isInsider() {
    return ['admin', 'student'].includes(user.value?.role);
  }

  async function fetchUser() {
    apollo
      .query({
        query: gql`
          query me {
            meUser {
              user {
                email
                name
                role
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
                role
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
    isInsider,
  };
});
