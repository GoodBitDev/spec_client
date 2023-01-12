import { NextApiRequest, NextApiResponse } from "next";
import { parseJwt } from "shared/config/jwt";
import { AuthApi } from "shared/api/auth";

const handlerLogin = async (req: NextApiRequest, res: NextApiResponse) => {
  const nowUnix = (+new Date() / 1e3) | 0;
  try {
    const { data } = await AuthApi.login();
    const { access, refresh } = data;

    const access_token_decoded: { exp: number } = parseJwt(access);
    const refresh_token_decoded: { exp: number } = parseJwt(refresh);


    console.log("access", access);
    console.log("refresh", refresh);
    console.log("access_token_decoded", access_token_decoded);
    console.log("refresh_token_decoded", refresh_token_decoded)

    res.setHeader("Set-Cookie", [
      `token=${access}; Max-Age=${
        access_token_decoded.exp - nowUnix
      }; Path=/`,
      `refresh_token=${refresh}; Max-Age=${
        refresh_token_decoded.exp - nowUnix
      }; Path=/; HttpOnly=true`,
    ]);
    res.redirect("/")

    console.log("RES", res.hasHeader("Set-Cookie"))

  } catch (e) {
    res.status(401);
    res.send({ message: "error_while_login" });
  }

};

export default handlerLogin;
