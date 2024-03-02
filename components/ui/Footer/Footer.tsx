'use client'
import React from 'react';
import NextLink from 'next/link';
import { Flex, Box, Link, Text, VStack, Image } from '@chakra-ui/react';
import Logo from '@/components/icons/Logo';
import GitHub from '@/components/icons/GitHub';

export default function Footer() {
  return (
    <Box as="footer" mx="auto" maxW="1920px" px="6" bg="zinc.900">
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        justify="space-between"
        align="center"
        gap="8"
        py="12"
        color="white"
        borderY="1px"
        borderColor="zinc.600"
        bg="zinc.900"
      >
        <Box flex="1">
          <NextLink href="/" passHref>
            <Link display="flex" alignItems="center" fontWeight="bold">
              <Box mr="2" border="1px" borderColor="zinc.700" p="1" borderRadius="full">
                <Logo />
              </Box>
              ACME
            </Link>
          </NextLink>
        </Box>

        <VStack as="ul" flex="1" spacing="4" align="start">
          {['Home', 'About', 'Careers', 'Blog'].map((item) => (
            <Box as="li" key={item}>
              <NextLink href="/" passHref>
                <Link _hover={{ color: 'zinc.200' }}>{item}</Link>
              </NextLink>
            </Box>
          ))}
        </VStack>

        <VStack as="ul" flex="1" spacing="4" align="start">
          <Text as="li" fontWeight="bold">
            LEGAL
          </Text>
          {['Privacy Policy', 'Terms of Use'].map((item) => (
            <Box as="li" key={item}>
              <NextLink href="/" passHref>
                <Link _hover={{ color: 'zinc.200' }}>{item}</Link>
              </NextLink>
            </Box>
          ))}
        </VStack>

        <Flex justify="end" flex="1" alignItems="start">
          <Link href="https://github.com/vercel/nextjs-subscription-payments" aria-label="Github Repository" isExternal>
            <GitHub />
          </Link>
        </Flex>
      </Flex>

      <Flex direction={{ base: 'column', md: 'row' }} justify="between" align="center" py="12" bg="zinc.900">
        <Text>
          &copy; {new Date().getFullYear()} ACME, Inc. All rights reserved.
        </Text>
        <Flex alignItems="center">
          <Text>Crafted by</Text>
          <Link href="https://vercel.com" isExternal aria-label="Vercel.com Link" ml="4">
            <Image src="/vercel.svg" alt="Vercel.com Logo" h="6" />
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}
