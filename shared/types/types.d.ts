export type Config = {
  public_url: string;
  api_url: string;
}

export type UploadResult = {
  success: false
  error: string
} | {
  success: true
  download_key: string
  delete_key: string
}
