import React, { useState } from "react";
import { Icon } from "shared/UI/icon/icon";
import { signIn, SignInResponse } from "next-auth/react";

export const MainLayoutHeader = () => {
  const {login} = useLogin();

  const onLogin = () => {
    login("credentials", {
      data: {email: "admin@example.com", password: "123456"}
    })
  }

  return (
    <header className="flex h-24 bg-blue-700 shadow-header">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-full">
          <div className="flex grow w-2/5 justify-between items-center">
            <Icon className={"h-[14px] w-[31px] cursor-pointer hover:opacity-80"} name={"menu"} section={"menu"} />
            <div className="flex-col justify-center text-center text-white font-medium">
              <p className="cursor-pointer hover:opacity-80">8 911 920 55 87</p>
              <p className="cursor-pointer hover:opacity-80">manager@spectrrum-tbc.ru</p>
            </div>
            <div className="text-white font-medium">
              <span className="mr-2 cursor-pointer hover:opacity-80 text-yellow-200">РУС</span>
              <span className="cursor-pointer hover:opacity-80">ENG</span>
            </div>
          </div>
          <div className="h-full z-10 mx-[130px]">
            <Icon className={"w-[344px] h-[159px] z-10"} name={"logo"} section={"logo"} />
          </div>
          <div className="flex grow w-2/5 justify-around items-center">
            <Icon className={"h-[31px] w-[31px] stroke-white cursor-pointer hover:opacity-80"} name={"search"}
                  section={"search"} />
            <div onClick={onLogin}>
              <Icon className={"h-[31px] w-[31px] cursor-pointer hover:opacity-80"} name={"profile"}
                    section={"profile"} />
            </div>
            <Icon className={"h-[31px] w-[31px] cursor-pointer hover:opacity-80"} name={"cart"} section={"cart"} />
          </div>
        </div>
      </div>
    </header>
  );
};

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ok, setOk] = useState<boolean>();
  const [status, setStatus] = useState<number>();
  const [error, setError] = useState<string | undefined>(undefined);

  const login = async (
    provider: string,
    options?: {
      data: {email: string; password: string;};
      onSuccess?: (res?: SignInResponse | undefined) => void;
      onError?: (res?: SignInResponse | undefined) => void;
      redirect?: boolean | undefined;
      callbackUrl?: string | undefined;
    }
  ) => {
    setIsLoading(true);
    const res = await signIn(provider, {
      ...options?.data,
      redirect: options?.redirect || false,
      callbackUrl: options?.callbackUrl
    });
    setIsLoading(false);
    setStatus(status);
    setOk(ok);

    if (res?.ok) {
      setError(undefined);
      if (options?.onSuccess) {
        options.onSuccess(res);
      }
      return;
    }
    if (!res?.ok) {
      if (res?.status === 401) {
        setError("No");
      } else {
        setError("No");
      }

      if (options?.onError) {
        options.onError(res);
      }
      return;
    }

    setStatus(status);
    setOk(ok);
  };

  return {
    login,
    error,
    status,
    isSuccess: ok,
    isLoading
  };
};
