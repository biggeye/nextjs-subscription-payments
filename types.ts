export type AuthProvider =
  | 'apple'
  | 'azure'
  | 'bitbucket'
  | 'discord'
  | 'facebook'
  | 'github'
  | 'gitlab'
  | 'google'
  | 'keycloak'
  | 'linkedin'
  | 'notion'
  | 'slack'
  | 'spotify'
  | 'twitch'
  | 'twitter'
  | 'workos';



// User State
export interface UserProfile {
  id: string | null;
  full_name: string | null;
  username: string | null;
  avatar_url: string | null;
  website: string | null;
  email: string | null;
};

export interface UserState {
  profile: boolean;
  loading: boolean;
  error: string | null;
};

export interface UserContextType {
  userState: UserState;
  setUserState: React.Dispatch<React.SetStateAction<UserState>>;
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  supabase: any;
};

export interface UserDetailsResponse {
  userId?: string;
  profile?: UserProfile;
  error?: string;
}

// Gallery State
export type GalleryImage = {
  content_id: string;
  url: string;
  prompt: string;
}

export type GalleryScript = {
  content_id: string;
  content: string;
  prompt: string; 
}


export interface GalleryAvatar {
  content_id: string; // Adjust types according to your actual data structure
  url: string;
  name: string;
}

export interface GalleryProps {
  contentItems: ContentItem[][];
  supabase: any; // Consider replacing `any` with a more specific type if available
  refresh: () => void;
  currentIndex: number | null;
  setCurrentIndex: (index: number | null) => void;
  currentGroup: number | null;
  setCurrentGroup: (group: number | null) => void;
  handleDelete: (contentId: string) => Promise<void>;
}

export type ContentItem = {
  content_id: string;
  name?: string;
  title?: string;
  url: string;
  created_by?: string;
  created_at?: Date;
  content?: string;
  model_id?: string;
  prediction_id?: string;
  prompt?: string;
  is_public?: boolean;
};



export type currentIndex = {
  url: string;
  content_type: string;
  prompt?: string;
  model_id?: string;

};


// Replicate
export interface SelectedModel {
  id: string,
  name: string,
  friendlyname: string,
  example?: string,
  url?: string,
  shortdesc: string,
  inputtype: string,
};

// Leap AI
type WorkflowStatus = 'completed' | 'running' | 'failed';

interface WorkflowOutput {
  images: string[];
  user_id: string;
  avatar_name: string;
  avatar_description: string;
  photo_style: string;
  frame_style: string;
}

interface WorkflowWebhookRequestBody {
  id: string;
  version_id: string;
  status: WorkflowStatus;
  created_at: string;
  started_at: string | null;
  ended_at: string | null;
  workflow_id: string;
  error: string | null;
  input: Record<string, any>;
  output: WorkflowOutput | null;
}


export interface UploadAvatarProps {
  image: File[] | File,
  userId: string,
  name: string,
  modelId: string,
  predictionId: string,
  prompt: string
}


export interface UploadWebsiteSummaryProps {
  content: string,
  userId: string,
  modelId: string,
  predictionId: string,
  prompt: string
}


export interface VoiceData {
  id: string,
  name: string,
  gender: string,
  locale: string,
  language: string,
  access: string,
  provider: string,
  styles: [],
  config: {
    modelId: string
  }
}



// D-ID
export interface IceServer {
  urls: string[];
};

export type StreamId = string;
export type SessionId = string;
export type SdpOffer = string; // or an object if it's more complex
export type IceServers = IceServer[]; // Array of IceServer objects
export type SessionClientAnswer = string; // or an object if it's more complex
export type Candidate = string; // or an object if it's more complex
export type SdpMid = string;
export type SdpMLineIndex = number; // Assuming it's a number
