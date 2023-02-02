// import { JWT } from 'next-auth/jwt';
import { RolesEnum } from '../collections/Users';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the
   * `SessionProvider` React Context
   */
  interface Session {
    user: {
      email: string
      name: string
      role: RolesEnum
    }
  }

  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    email: string
    name: string
    role: RolesEnum
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    // PayloadCMS token
    id: string
    email: string
    createdAt: string
    updatedAt: string
    name: string
    role: RolesEnum
  }
}
