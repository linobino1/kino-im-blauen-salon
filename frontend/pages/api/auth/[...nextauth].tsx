import apollo from '@/graphql/apollo';
import { gql } from '@apollo/client';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: 'login',
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      type: 'credentials',
      async authorize(credentials) {
        try {
          const res = await apollo.mutate({
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
              email: credentials?.email,
              password: credentials?.password,
            },
          });
          return res.data.loginUser.user;
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // add the users role to session.user
      const res: any = session;

      if (session?.user && res.user) {
        res.user.role = token.role;
      }

      return res;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
  },
});
