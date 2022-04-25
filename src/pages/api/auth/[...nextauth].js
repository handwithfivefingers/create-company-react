import NextAuth from "next-auth";
// import Auth0Provider from "next-auth/providers/auth0"
import CredentialsProvider from "next-auth/providers/credentials";
// import EmailProvider from "next-auth/providers/email";
import connectDB from "../../../config/connectDB";
import { User } from "./../../../server/models";
import bcrypt from "bcryptjs";

connectDB();
const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: {
          label: "Phone",
          type: "phone",
          placeholder: "123456789",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        const resp = await User.findOne({ phone: credentials.phone });
        if (resp) {
          let pass = await authenticate(credentials.password, resp.hash_password);
          let { _id: id, name, email, phone, role } = resp;
          if (pass) {
            console.log(id, name, email, phone, role);
            return {
              id,
              name,
              email,
              phone,
              role,
            };
          }
        }
        return null;
      },
    }),
  ],
  secret: process.env.SECRET,
  page: {
    signIn: "/login",
  },
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
        session.role = token.role;
      }
      return session;
    },
  },
  session: {
    jwt: true,
  },
};

export default (req, res) => NextAuth(req, res, options);

const authenticate = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
