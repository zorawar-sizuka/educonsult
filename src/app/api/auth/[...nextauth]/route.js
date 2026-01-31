// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { prisma } from "@/lib/prisma"; // Your Prisma client
// import bcrypt from "bcrypt";

// const handler = NextAuth({ 
//     debug: true,
//   adapter: PrismaAdapter(prisma), // Stores sessions in DB
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         console.log('[AUTH DEBUG] Credentials received:', { email: credentials?.email }); // Safe log (no pw)
      
//         if (!credentials?.email || !credentials?.password) {
//           console.log('[AUTH DEBUG] Missing email/password');
//           return null;
//         }
      
//         try {
//           const user = await prisma.user.findUnique({
//             where: { email: credentials.email.toLowerCase().trim() }, // Normalize for safety
//           });
//           console.log('[AUTH DEBUG] User found:', user ? { id: user.id, email: user.email, role: user.role } : 'None');
      
//           if (!user || user.role !== "ADMIN") {
//             console.log('[AUTH DEBUG] Invalid user or role');
//             return null;
//           }
      
//           const isValidPassword = await bcrypt.compare(credentials.password, user.password);
//           console.log('[AUTH DEBUG] Password match:', isValidPassword); // True/False
      
//           if (!isValidPassword) {
//             console.log('[AUTH DEBUG] Password mismatch');
//             return null;
//           }
      
//           console.log('[AUTH DEBUG] Auth success for:', user.email);
//           return {
//             id: user.id,
//             email: user.email,
//             role: user.role,
//           };
//         } catch (error) {
//           console.error('[AUTH DEBUG] Error in authorize:', error);
//           return null;
//         }
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/admin/login", // Custom login page
//   },
//   session: {
//     strategy: "jwt", // Or "database" for DB sessions
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.role = user.role;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.sub;
//         session.user.role = token.role;
//       }
//       return session;
//     },
//   },
//   secret: process.env.AUTH_SECRET,
// });

// export { handler as GET, handler as POST }; 












// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { prisma } from "@/lib/prisma";
// import bcrypt from "bcrypt";

// export const authOptions = {
//   debug: true,
//   // adapter: PrismaAdapter(prisma),
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         console.log("[AUTH DEBUG] Credentials received:", { email: credentials?.email });

//         if (!credentials?.email || !credentials?.password) {
//           console.log("[AUTH DEBUG] Missing email/password");
//           return null;
//         }

//         try {
//           const user = await prisma.user.findUnique({
//             where: { email: credentials.email.toLowerCase().trim() },
//           });

//           console.log(
//             "[AUTH DEBUG] User found:",
//             user ? { id: user.id, email: user.email, role: user.role } : "None"
//           );

//           if (!user || user.role !== "ADMIN") {
//             console.log("[AUTH DEBUG] Invalid user or role");
//             return null;
//           }

//           const isValidPassword = await bcrypt.compare(credentials.password, user.password);
//           console.log("[AUTH DEBUG] Password match:", isValidPassword);

//           if (!isValidPassword) {
//             console.log("[AUTH DEBUG] Password mismatch");
//             return null;
//           }

//           return { id: user.id, email: user.email, role: user.role };
//         } catch (error) {
//           console.error("[AUTH DEBUG] Error in authorize:", error);
//           return null;
//         }
//       },
//     }),
//   ],
//   pages: { signIn: "/admin/login" },
//   session: { strategy: "jwt" },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) token.role = user.role;
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user.id = token.sub;
//         session.user.role = token.role;
//       }
//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };













//FINAL CODE FOR LOGIN//
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase().trim() },
        });

        if (!user || user.role !== "ADMIN") return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return { id: user.id, email: user.email, role: user.role };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
    error: "/admin/login", // Optional: handle errors on same page
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id ;
        session.user.role = token.role ;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };