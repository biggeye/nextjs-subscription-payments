'use client'
import React, { useEffect, useState } from 'react';
import { Card, Box, Link } from '@chakra-ui/react';
import { DataTable, ColumnDef } from '@saas-ui/react'; // Adjust if ColumnDef import is incorrect
import { parseGalleryImages } from '@/lib/user/getGalleryItems';
import { GalleryImage } from '@/types';

const ContentTables = () => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    const fetchGalleryImages = async () => {
        const chunkedData = await parseGalleryImages();
        // Flatten the array of arrays into a single array
        const flattenedData = chunkedData.flat();
        setGalleryImages(flattenedData);
      };
      
    fetchGalleryImages();
  }, []);

  // Correcting the property names based on the error messages
  const columns: ColumnDef<GalleryImage>[] = [
    {
      header: 'Content ID', // Adjusted to lowercase 'header'
      accessorKey: 'content_id', // Assuming accessorKey is correct; adjust based on actual library usage
      cell: ({ row }) => <Link href={row.original.url} isExternal>{row.original.content_id}</Link>,
    },
    {
      header: 'Prompt', // Adjusted to lowercase 'header'
      accessorKey: 'prompt', // Assuming accessorKey is correct; adjust based on actual library usage
    },
  ];

  return (
    
        <Card>
      <DataTable
        columns={columns}
        data={galleryImages}
        isSelectable
        isSortable
        onSelectedRowsChange={(selected) => console.log(selected)}
        size={{base: "xs", md: "sm", lg: "md"}}
      />
      </Card>
    
  );
};
export default ContentTables;
