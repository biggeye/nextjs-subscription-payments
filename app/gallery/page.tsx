'use client';
import React, { useEffect, useState } from 'react';
import { useUserContext } from '@/lib/user/UserProvider';
import { createClient } from '@/utils/supabase/client';
import Gallery from '@/components/Gallery';
import { ContentItem } from '@/types';
import { contentItemsState, currentIndexState, currentGroupState } from '@/state/user/gallery-atoms';
import { useRecoilState } from 'recoil';
import { chunkArray } from '@/utils/chunkArray';
import { Box } from '@chakra-ui/react';
import { parseGalleryImages } from '@/lib/user/getGalleryItems';

const GalleryPage: React.FC = () => {
  const [contentItems, setContentItems] = useRecoilState(contentItemsState);
  const [currentIndex, setCurrentIndex] = useRecoilState<number | null>(currentIndexState);
  const [currentGroup, setCurrentGroup] = useRecoilState<number | null>(currentGroupState);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const supabase = createClient();
  const { userProfile } = useUserContext();
  const userId = userProfile?.id;

  useEffect(() => {
    async function getData() {
      const chunkedData = await parseGalleryImages();

      if (chunkedData && currentGroup === null) {
        setContentItems(chunkedData);
        setCurrentGroup(0);
      } else if (currentGroup === null) {

        setContentItems([]);
        setCurrentGroup(0);
      }
    }
    getData();
  }, [userId, currentGroup, setContentItems, setCurrentGroup]);
  


// Log the current states for troubleshooting
console.log("Current states - contentItems:", contentItems, "currentIndex:", currentIndex, "currentGroup:", currentGroup);


  const handleDelete = async (contentId: string) => {
    try {
      const { error } = await supabase
        .from('master_content')
        .delete()
        .eq('content_id', contentId);
      if (error) throw error;
  
      let newContentItems = [...contentItems];
      if (currentGroup !== null && currentIndex !== null) {
        newContentItems[currentGroup] = newContentItems[currentGroup].filter(item => item.content_id !== contentId);
        setContentItems(newContentItems);
  
        if (newContentItems[currentGroup]?.length === 0) {
          newContentItems.splice(currentGroup, 1);
          setCurrentGroup(currentGroup > 0 ? currentGroup - 1 : null);
        }
  
        if (newContentItems[currentGroup]?.length <= currentIndex) {
          setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : null);
        }
      }
  
      setRefreshKey(prevKey => prevKey + 1);
    } catch (error) {
      console.error("Error deleting content:", error);
    }
  };
  
  return (
    <Box
    position="relative"
      h="92vh"
      textAlign="center"
      sx={{
        background: 'linear-gradient(to bottom, rgba(209,212,212,0.65) 0%,rgba(0,0,0,0) 100%)'
      }}
    >
      <Gallery
        contentItems={contentItems}
        supabase={supabase}
        refresh={() => setRefreshKey(k => k + 1)}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        currentGroup={currentGroup}
        setCurrentGroup={setCurrentGroup}
        handleDelete={handleDelete}
      />
    </Box>
  );
};

export default GalleryPage;
