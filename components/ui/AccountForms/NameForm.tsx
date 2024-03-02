'use client';

import { Card, Box, Button, Flex, Input, Text, useToast, VStack } from '@chakra-ui/react';
import { Form, FormLayout, Field } from '@saas-ui/react';
import { updateName } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NameForm({ userName }: { userName: string }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    setIsSubmitting(true);

    const newName = e.currentTarget.fullName.value;

    // Check if the new name is the same as the old name
    if (newName === userName) {
      setIsSubmitting(false);
      toast({
        title: 'No Changes Detected',
        description: "The new name is the same as the current one.",
        status: 'info',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      await handleRequest(e, updateName, router); // Assuming handleRequest can be awaited
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error updating your name.',
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
      <Text fontSize="xl" mb="4">Your Name</Text>
      <Text>Please enter your full name, or a display name you are comfortable with. 64 characters maximum.</Text>
      <Form id="nameForm" onSubmit={handleSubmit}>
        <VStack spacing="4" align="stretch" my="4">
          <Input
            type="text"
            name="fullName"
            defaultValue={userName}
            placeholder="Your name"
            maxLength={64}
            isDisabled={isSubmitting}
          />
          <Flex justifyContent="flex-end">
            <Button
            colorScheme="blue"
              variant="solid"
              type="submit"
              isLoading={isSubmitting}
              loadingText="Updating..."
            >
              Update Name
            </Button>
          </Flex>
        </VStack>
      </Form>
      </Card>
    </Box>
  );
}
