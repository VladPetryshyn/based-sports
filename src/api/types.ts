export interface ContentI {
  title: string;
  description: string;
  authorUsername: string;
  id: string;
  isLiked: boolean;
  isDisliked: boolean;
  isOwner: boolean;
  likes: number;
  dislikes: number;
}
export interface WorkoutI extends ContentI {
  content: { time: string, title: string }[]
}
export interface PostI extends ContentI {
  content: string;
}
