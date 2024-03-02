'use server'
import { chunkArray } from "@/utils/chunkArray";
import { createClient } from "@/utils/supabase/server";
import { fetchGalleryImages } from "../galleryServer";
import { GalleryImage } from '@/types';

const supabase = createClient();

export async function parseGalleryImages(): Promise<GalleryImage[][]> {
  try {
    const data = await fetchGalleryImages();
    if (!data) {
      console.error("No data fetched from gallery images");
      return []; // Return an empty array if no data is fetched
    }

    // Assuming 'data' is already in the form of GalleryImage[] and needs to be chunked
    const chunkedData = chunkArray(data, 10);
    console.log("Chunked data:", chunkedData);
    return chunkedData;
  } catch (error) {
    console.error("Error fetching gallery images:", error);
    return []; // Return an empty array in case of an error
  }
}
