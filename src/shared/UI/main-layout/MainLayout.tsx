import React, {FC, ReactNode} from 'react';
import {MainLayoutHeader} from "widgets/main-layout-header";
import {MainLayoutFooter} from "widgets/main-layout-footer";

interface MainLayout {
  children: ReactNode
}

export const MainLayout: FC<MainLayout> = ({children}) => {
  return (
      <div className='flex flex-col min-h-screen'>
        <MainLayoutHeader />
        <main className='relative h-full max-h-full grow'>
          {children}
        </main>
        <MainLayoutFooter />
      </div>
  );
};
