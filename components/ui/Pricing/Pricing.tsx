'use client';

import React, { useState } from 'react';
import { Flex, Box, Text, Button, VStack, HStack, Link } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import LogoCloud from '@/components/ui/LogoCloud';
import type { Tables } from '@/types_db';
import { getStripe } from '@/utils/stripe/client';
import { checkoutWithStripe } from '@/utils/stripe/server';
import { getErrorRedirect } from '@/utils/helpers';
import { usePathname } from 'next/navigation';

type Subscription = Tables<'subscriptions'>;
type Product = Tables<'products'>;
type Price = Tables<'prices'>;

interface ProductWithPrices extends Product {
  prices: Price[];
}

interface PriceWithProduct extends Price {
  product: Product | null;
}

interface SubscriptionWithProduct extends Subscription {
  price: PriceWithProduct | null;
}

interface Props {
  user: any | null | undefined;
  products: ProductWithPrices[];
  subscription: any | null;
}

export default function Pricing({ user, products, subscription }: Props) {
  const intervals = Array.from(
    new Set(
      products.flatMap((product) =>
        product?.prices?.map((price) => price?.interval)
      )
    )
  );
  const router = useRouter();
  const [billingInterval, setBillingInterval] = useState<'lifetime' | 'year' | 'month'>('month');
  const [priceIdLoading, setPriceIdLoading] = useState<string>();
  const currentPath = usePathname();

  const handleStripeCheckout = async (price: Price) => {
    setPriceIdLoading(price.id);

    if (!user) {
      setPriceIdLoading(undefined);
      return router.push('/signin/signup');
    }

    const { errorRedirect, sessionId } = await checkoutWithStripe(
      price,
      currentPath
    );

    if (errorRedirect) {
      setPriceIdLoading(undefined);
      return router.push(errorRedirect);
    }

    if (!sessionId) {
      setPriceIdLoading(undefined);
      return router.push(
        getErrorRedirect(
          currentPath,
          'An unknown error occurred.',
          'Please try again later or contact a system administrator.'
        )
      );
    }

    const stripe = await getStripe();
    stripe?.redirectToCheckout({ sessionId });

    setPriceIdLoading(undefined);
  };
  if (!products.length) {
    return (
      <Box bg="black">
        <VStack maxW="6xl" px="4" py="8" mx="auto" spacing="24" textAlign="center">
          <Text fontSize="6xl" fontWeight="extrabold" color="white">
            No subscription pricing plans found.
          </Text>
          <Link href="https://dashboard.stripe.com/products" isExternal color="pink.500">
            Create them in your Stripe Dashboard.
          </Link>
          <LogoCloud />
        </VStack>
      </Box>
    );
  }

  return (
    <Box bg="black">
      <VStack maxW="6xl" px="4" py="8" mx="auto" spacing="24">
        <VStack>
          <Text fontSize="6xl" fontWeight="extrabold" color="white">
            Pricing Plans
          </Text>
          <Text fontSize="2xl" color="zinc.200">
            Start building for free, then add a site plan to go live.
          </Text>
          <HStack>
            <Button onClick={() => setBillingInterval('month')} colorScheme={billingInterval === 'month' ? 'pink' : 'gray'}>
              Monthly billing
            </Button>
            <Button onClick={() => setBillingInterval('year')} colorScheme={billingInterval === 'year' ? 'pink' : 'gray'}>
              Yearly billing
            </Button>
          </HStack>
        </VStack>
        <Flex wrap="wrap" justify="center" gap="6">
          {products.map((product) => {
            const price = product.prices.find((p) => p.interval === billingInterval);
            if (!price) return null;
            return (
              <VStack key={product.id} bg="zinc.900" p="6" rounded="lg" shadow="md" borderWidth="1px" borderColor={subscription?.price?.product?.id === product.id ? 'pink.500' : 'transparent'}>
                <Text fontSize="2xl" fontWeight="bold" color="white">
                  {product.name}
                </Text>
                <Text color="zinc.300">{product.description}</Text>
                <Text fontSize="5xl" fontWeight="extrabold">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: price.currency || undefined }).format((price.unit_amount ?? 0) / 100)} / {billingInterval}
                </Text>
                <Button isLoading={priceIdLoading === price.id} onClick={() => handleStripeCheckout(price)}>
                  {subscription ? 'Manage' : 'Subscribe'}
                </Button>
              </VStack>
            );
          })}
        </Flex>
        <LogoCloud />
      </VStack>
    </Box>
  );
}