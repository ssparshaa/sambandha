/**
 * Shared types between client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Memory card image properties
 */
export interface ImageProps {
  _id: string;
  image: string | null;
  audio?: string | null;
  title: string;
  description?: string;
  date: string;
}
