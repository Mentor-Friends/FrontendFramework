export type TFolderType = {
  order_no?: number;
  category_name: string;
  category_id: number;
};
export type TBoomgpt = {
  title: string;
  short_desc: string;
  source_url: string;
  image: string;
  created_at: string | number;
  data_type: string;
  boom_folder: TFolderType;
  comment: any[];
  question?: string;
  answer?: string;
  note?: string;
  order_no?: number;
};


export type TCrm = {
  title: string;
  created_at: string | number;
  data_type: string;
  boom_folder: TFolderType;
  note?: string;
  order_no?: number;
  crm_data: any
};
