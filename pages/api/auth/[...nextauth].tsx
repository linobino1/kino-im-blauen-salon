import payload from 'payload';
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
          const res = await payload.login({
            collection: 'users',
            data: {
              email: credentials.email,
              password: credentials.password,
            },
          });
          return res.user;
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Persist the the users role to the token right after signin
      const res = token;

      if (user) {
        res.role = user.role;
      }
      return res;
    },
    async session({ session, token }) {
      // add the users role to session.user
      const res = session;

      if (session?.user) {
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
