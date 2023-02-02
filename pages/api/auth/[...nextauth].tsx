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
    async signIn({ user }) {
      if (user) return true;
      return false;
    },
    async session({ session }) {
      // session.user.isLoggedIn = true;
      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
  // use env variable in production
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
  },
});
