'use client';

import Button from '@/components/ui/Button';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { createStripePortal } from '@/utils/stripe/server';
import Link from 'next/link';
import { Card, Flex, Box, Text } from '@chakra-ui/react';
import { Form, FormLayout, Field } from '@saas-ui/react';
import { Tables } from '@/types_db';

type Subscription = Tables<'subscriptions'>;
type Price = Tables<'prices'>;
type Product = Tables<'products'>;

type SubscriptionWithPriceAndProduct = Subscription & {
  prices:
    | (Price & {
        products: Product | null;
      })
    | null;
};

interface Props {
  subscription: SubscriptionWithPriceAndProduct | null;
}

export default function CustomerPortalForm({ subscription }: Props) {
  const router = useRouter();
  const currentPath = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: subscription?.prices?.currency!,
      minimumFractionDigits: 0
    }).format((subscription?.prices?.unit_amount || 0) / 100);

  const handleStripePortalRequest = async () => {
    setIsSubmitting(true);
    const redirectUrl = await createStripePortal(currentPath);
    setIsSubmitting(false);
    return router.push(redirectUrl);
  };

  return (
    <Box as="section" p="4" borderWidth="1px" borderRadius="lg" overflow="hidden" margin={5}>
    <Card
    p={5}
    title={
      subscription
        ? `You are currently on the ${subscription?.prices?.products?.name} plan.`
        : 'You are not currently subscribed to any plan.'
    }
  >
    <Box p={5}>
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="lg">
          {subscription ? (
            `"You are currently on the ${subscription?.prices?.products?.name} plan:  "
            "${subscriptionPrice}/${subscription?.prices?.interval}"`
          ) : (
            <Link color="teal.500" href="/">
              Choose your plan
            </Link>
          )}
        </Text>
          <Button
            variant="solid"
            colorScheme="blue"
            
            onClick={handleStripePortalRequest}
            loading={isSubmitting}
          >
            Open customer portal
            </Button>
        </Flex>
      </Box>
    </Card>
    </Box>
  );
}
