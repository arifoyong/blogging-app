import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || ''
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
     }),
  ],
  callbacks: {
    async session({session, token} : any) {
      session.user.name = `${session?.user?.name}_${token.sub}`
      return session
    }
  },
  secret: 'default secret key'
}

const nextAuth = NextAuth(authOptions)

export { nextAuth as GET, nextAuth as POST}