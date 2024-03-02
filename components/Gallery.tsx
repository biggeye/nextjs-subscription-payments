'use client';
import React, { useState, useCallback } from 'react';
import { useBreakpointValue, Card, Box, Flex, Image, Modal, ModalBody, ModalContent, ModalOverlay, Tooltip, IconButton, ModalHeader, ModalFooter, ModalCloseButton, Button } from '@chakra-ui/react';
import { StructuredList, StructuredListCell, StructuredListItem, StructuredListButton, StructuredListIcon } from '@saas-ui/react';
import { DeleteIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { ContentItem } from '@/types';
import { Pagination } from './utils/Pagination';
import { handleGalleryEditSelection } from '@/lib/replicate/handleGalleryEditSelection';
import { ContextMenuList, ContextMenuItem, ContextMenu, ContextMenuTrigger, Web3Address } from '@saas-ui/react';
import { useRecoilState } from 'recoil';
import { userImageDataUriState, userImagePreviewState, userImageUploadState } from '@/state/replicate/prediction-atoms';
import { currentUserAvatarUrlState } from '@/state/user/user_state-atoms';
import { useUserContext } from '@/lib/user/UserProvider';
import { GalleryProps } from '@/types';

const Gallery: React.FC<GalleryProps> = ({
  contentItems,
  supabase,
  refresh,
  currentIndex,
  setCurrentIndex,
  currentGroup,
  setCurrentGroup,
  handleDelete,
}) => {
  console.log(contentItems);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState<boolean>(false);
  const [deletingContentId, setDeletingContentId] = useState<string | null>(null);
  const [userImageUpload, setUserImageUpload] = useRecoilState(userImageUploadState);
  const [userImagePreview, setUserImagePreview] = useRecoilState(userImagePreviewState);
  const [userImageDataUri, setUserImageDataUri] = useRecoilState(userImageDataUriState);

  const cardWidth = useBreakpointValue({
    base: "90vw", // Full width on smaller screens
    sm: "40vw", // Allows 2 cards in a row with a little gap
    md: "29vw", // Allows 3 cards with reasonable gaps
    lg: "20vw", // Allows 4 cards
    xl: "15vw", // Allows 5+ cards based on the screen width
  });

  const [currentUserAvatarUrl, setCurrentUserAvatarUrl] = useRecoilState(currentUserAvatarUrlState);
  const { userProfile } = useUserContext();
  const userId = userProfile.id;

  const onEdit = useCallback(async (imageUrl: string) => {
    const result = await handleGalleryEditSelection(imageUrl);
    if (result) {
      setUserImageUpload(result.file);
      setUserImagePreview(result.imagePreview);
      setUserImageDataUri(result.URI);
    }
  }, []);

  const onDelete = async (contentId: string) => {
    openDeleteConfirmModal(contentId);
  }

  const onSetProfile = async (url: string) => {
    setCurrentUserAvatarUrl(url);
    await supabase.from('users').update({ avatar_url: url }).eq({ id: userId });
  };

  const openDeleteConfirmModal = (contentId: string) => {
    setDeletingContentId(contentId);
    setIsDeleteConfirmOpen(true);
  };

  const closeDeleteConfirmModal = () => {
    setIsDeleteConfirmOpen(false);
    setDeletingContentId(null);
  };

  const confirmDeleteItem = async () => {
    if (deletingContentId) {
      await handleDelete(deletingContentId);
      closeDeleteConfirmModal();
      refresh();
    }
  };

  const handleImageClick = (itemIndex: number) => {
    setCurrentIndex(itemIndex);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentIndex(null);
  };

  const goToNextGroup = () => {
    if (currentGroup !== null && currentGroup < contentItems.length - 1) {
      setCurrentGroup(currentGroup + 1);
    }
  };

  const goToPreviousGroup = () => {
    if (currentGroup !== null && currentGroup > 0) {
      setCurrentGroup(currentGroup - 1);
    }
  };

  // Render gallery UI for the current group with pagination controls
  return (
    <Box mt={9}>
      {currentGroup !== null && contentItems[currentGroup] && (
        <><Flex direction="row" wrap="wrap" justifyContent="space-around" gap="5px" mb={5}>
          {contentItems[currentGroup].map((item, itemIndex) => (
            <Tooltip key={item.content_id} label={item.prompt} hasArrow bg="lightBlue" color="white">
              <ContextMenu>
                <ContextMenuTrigger>
                  <Card key={item.content_id} boxShadow="xl" p={5} width={cardWidth}>
                    <Image
                      boxShadow="sm"
                      borderRadius="lg"
                      width="full"
                      src={item.url}
                      alt={item.title}
                      onClick={() => handleImageClick(itemIndex)}
                      className="element-fade-in"
                      _hover={{
                        transform: 'scale(1.05)',
                        transition: 'transform .75s',
                      }}
                    />
                    <Box mt={2}>
                      <p>{item.name}</p>
                    </Box>
                    {item.prompt &&
                      <p>{item.prompt}</p>
                    }
                  </Card>
                </ContextMenuTrigger>
              </ContextMenu>
              <ContextMenuList>
              <ContextMenuItem onClick={() => onEdit(item.url)}>Edit</ContextMenuItem>
               <ContextMenuItem onClick={() => onSetProfile(item.url)}>Set Profile Avatar</ContextMenuItem>
               <ContextMenuItem onClick={() => onDelete(item.content_id)}>Delete</ContextMenuItem>

              </ContextMenuList>
            </Tooltip>
          ))}
        </Flex>
          <Pagination
            totalGroups={contentItems.length}
            currentGroup={currentGroup}
            setCurrentGroup={(newGroup) => setCurrentGroup(newGroup)}
          />
        </>
      )}
      {
        isModalOpen && currentGroup !== null && currentIndex !== null && (
          <Modal isOpen={isModalOpen} onClose={closeModal} motionPreset="slideInBottom" size="xl">
            <ModalOverlay />
            <ModalContent bgGradient="linear(to-b, silver, seasalt)">
              <ModalBody p={5}>
                <Box textAlign="center" className="fade-in-from-top">
                  <Image
                    borderRadius="lg"
                    src={contentItems[currentGroup][currentIndex].url}
                    alt={contentItems[currentGroup][currentIndex].title}
                    boxShadow="xl"
                  />
                  <Box mt={3} fontWeight="bold" fontSize="lg" color="onyx">
                    {contentItems[currentGroup][currentIndex].name}
                  </Box>
                  <Box fontSize="md" color="gray.600">
                    {contentItems[currentGroup][currentIndex].prompt}
                  </Box>
                  <IconButton
                    aria-label="Delete item"
                    icon={<DeleteIcon />}

                    onClick={() => openDeleteConfirmModal(contentItems[currentGroup][currentIndex].content_id)}
                  />
                </Box>
              </ModalBody>

            </ModalContent>
          </Modal>
        )
      }
      <Modal isOpen={isDeleteConfirmOpen} onClose={closeDeleteConfirmModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this item?
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={confirmDeleteItem}>
              Delete
            </Button>
            <Button variant="ghost" onClick={closeDeleteConfirmModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box >
  );
};

export default Gallery;
