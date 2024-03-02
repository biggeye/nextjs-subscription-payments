'use client'
import React, { useCallback } from 'react';
import { Box, ChakraProvider } from '@chakra-ui/react';
import { AppShell, SaasProvider } from '@saas-ui/react';
import { UserProvider } from "@/lib/user/UserProvider";
import { RecoilRoot } from "recoil";
import { sciLiveTheme } from "./theme";
import NavbarComponent from '@/components/ui/Navbar/Navbar';


interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  
  const onError = React.useCallback((error: any) => {
    console.log(error)
  }, [])

  return (
    <ChakraProvider theme={sciLiveTheme}>
      <SaasProvider  onError={onError}>
        <UserProvider>
          <RecoilRoot>
            <AppShell
              navbar={<NavbarComponent />}>
              {children}
            </AppShell>
          </RecoilRoot>
        </UserProvider>
      </SaasProvider>
    </ChakraProvider>
  );
};

export default ClientLayout;
