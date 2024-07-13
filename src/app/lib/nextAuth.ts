import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { hostApi, header } from "../lib/config";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        id: { label: "id", type: "text" },
        username: { label: "username", type: "text" },
        email: { label: "email", type: "text" },
      },
      async authorize(credentials, req) {
        const user = {
          id: credentials.id,
          name: credentials.username,
          email: credentials.email,
        };

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60 * 30,
  },

  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account) {
        token.provider = account.provider;
      }
      if (user) {
        token.userId = user.id;
      }
      return token;
    },

    async signIn({ user, account, profile }) {
      if (account.provider === "google" || account.provider === "facebook") {
        try {
          const response = await fetch(`${hostApi}/login-social`, {
            method: "POST",
            headers: header,
            body: JSON.stringify({
              email: user.email,
              username: user.name,
              provider: account.provider,
              userId: user.id,
            }),
          });

          const data = await response.json();

          // localStorage.setItem("user_info", JSON.stringify(data));
        } catch (error) {
          console.error("Lỗi khi lưu thông tin người dùng:", error);
          return false;
        }
      }
      return true;
    },

    async session({ session, token }) {
      try {
        const response = await fetch(`${hostApi}/get-infor-user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: token.email,
            provider: token.provider,
          }),
        });

        const data = await response.json();

        if (data && data.user) {
          session.user = data.user;
        }
        return session;
      } catch (error) {
        console.error("Lỗi khi lưu thông tin người dùng:", error);
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};
