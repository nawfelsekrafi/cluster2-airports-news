export interface INews {
    id: number;
    title: string;
    content: string;
    content_name?: string;
    news_text?: string;
    image_preview?: string;
    created_at?: string;
    is_archived?: boolean;
}
  