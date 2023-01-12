import { NextApiRequest, NextApiResponse } from "next";
import { parseJwt } from "shared/config/jwt";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { cookies } = req;
  const nowUnix = (+new Date() / 1e3) | 0;
  const CustomerApi = new CustomApi();

  try {
    const { access_token } =
      await CustomerApi.customerCustomRefreshTokenRequestWrapper({
        body: {
          refresh_token: cookies["refresh_token"],
        },
      });
    const access_token_decoded: { exp: number } = parseJwt(access_token);
    res.setHeader("Set-Cookie", [
      `token=${access_token}; Max-Age=${
        access_token_decoded.exp - nowUnix
      }; Path=/`,
    ]);
    res.status(200);
    res.send({ token: access_token });
  } catch (error) {
    // we don't want to send status 401 here.
    res.send(error);
  }
};
