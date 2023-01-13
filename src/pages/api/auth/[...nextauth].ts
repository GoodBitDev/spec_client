import { getLogger } from "loglevel";
import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthApi } from "shared/api/auth";
import http from "shared/config/instance";

const log = getLogger("next-auth");
log.enableAll();

async function refreshToken(token: JWT): Promise<JWT | undefined | null> {
  try {
    const response = await AuthApi.refreshToken({
      refresh: token.refreshToken
    });
    const refreshedTokens = await response;
    // @ts-ignore
    return { ...token, accessToken: refreshedTokens?.access,
      accessTokenExpires: Date.now() + 1000 * 60 * 60 * 24 * 7
    };
  } catch (error) {
    log.error("refreshToken", error);

    return token;
  }
}

async function tokenWithUser(token: JWT): Promise<any> {
  try {
    const access = token.accessToken as string;
    http.defaults.headers.common["Authorization"] = `Bearer ${access}`;
    const response = await AuthApi.current();
    const awaitedResponse = await response;
    // @ts-ignore

    return { ...token, user: { username: awaitedResponse.username,email: awaitedResponse.email } };
  } catch (e) {
    log.error("tokenWithUser", e);
    return undefined;
  }
}

export const authOptions: NextAuthOptions = {
  debug: true,
  pages: {
    signIn: "/",
    signOut: "/",
    verifyRequest: "/",
    newUser: "/"
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60 // 24 hours
  },
  logger: {
    error(code, metadata) {
      log.error({ code, metadata });
    },
    warn(code) {
      log.warn({ code });
    },
    debug(code, metadata) {
      log.debug({ code, metadata });
    }
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      // @ts-ignore
      async authorize(credentials) {
        try {
          const response = await AuthApi.login({
            email: credentials?.email || "",
            password: credentials?.password || ""
          });

          return {
            ...response,
            accessTokenExpires: Date.now() + 1000 * 60 * 60 * 24 * 7
          };
        } catch (e) {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      log.debug("signin", { user, account });
      if (user && account) {
        account.token = {
          access: (user as any).access,
          refresh: (user as any).refresh,
          accessTokenExpires: (user as any).accessTokenExpires
        };
        return true;
      } else {
        return false;
      }
    },
    async jwt({ token, account, user }) {
      if (account && user) {
        token = {
          ...token,
          accessToken: (account as any).token.access,
          accessTokenExpires: (account as any).token.accessTokenExpires,
          refreshToken: (account as any).token.refresh
        };
        if (Date.now() >= (token as any).accessTokenExpires) {
          return refreshToken(tokenWithUser(token) as unknown as JWT);
        }
        return tokenWithUser(token);
      }
      return tokenWithUser(token);
    },
    async session({ session, token }) {
      (session as any).user = token.user;
      // @ts-ignore
      session.accessToken = token.accessToken;
      // @ts-ignore
      session.refreshToken = token.refreshToken;
      return session;
    }
  }
};

export default NextAuth(authOptions);
