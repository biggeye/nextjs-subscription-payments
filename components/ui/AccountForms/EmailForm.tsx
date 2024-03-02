'use client';

import { Card, VStack, Box, Button, Flex, Input, Text, useToast } from '@chakra-ui/react';
import { Form } from '@saas-ui/react'; // Assuming you'd use Form for structured handling
import { updateEmail } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function EmailForm({ userEmail }: { userEmail: string | undefined }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    setIsSubmitting(true);

    const newEmail = e.currentTarget.newEmail.value;

    // Check if the new email is the same as the old email
    if (newEmail === userEmail) {
      toast({
        title: 'No Changes Detected',
        description: "The new email is the same as the current one.",
        status: 'info',
        duration: 5000,
        isClosable: true,
      });
      setIsSubmitting(false);
      return;
    }

    try {
      await handleRequest(e, updateEmail, router); // Assuming handleRequest can be awaited
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error updating your email.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box as="section" p="4" borderWidth="1px" borderRadius="lg" overflow="hidden" margin={5}>
      <Card p={5}>
        <Text fontSize="xl" mb="4">Your Email</Text>
        <Text mb="4">Please enter the email address you want to use to login. We will email you to verify the change.</Text>
        <Form id="emailForm" onSubmit={handleSubmit}>
        <VStack spacing="4" align="stretch" my="4">
            <Input
              name="newEmail"
              defaultValue={userEmail ?? ''}
              placeholder="Your email"
              maxLength={64}
              isDisabled={isSubmitting}
            />
                   <Flex justifyContent="flex-end">
            <Button
              variant="solid"
              type="submit"
              isLoading={isSubmitting}
              loadingText="Updating..."
              colorScheme="blue"
            >
              Update Email
            </Button>
          </Flex>
          </VStack>
        </Form>
      </Card>
    </Box>
  );
}
