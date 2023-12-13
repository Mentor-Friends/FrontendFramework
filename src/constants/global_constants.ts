/************************************************
 * Please define all the global constants and variables here
 *************************************************/
import boomconsoleLogo from "../../public/boomcosole-logo.png";

export const baseAPIUrl = "https://devboom.freeschema.com";
export const mySiteUrl = "localhost:4000";
// export const baseAPIUrl = "https://apischema.freeschema.com";
// export const mySiteUrl = "https://boomconsole.com";

export const globalPrefix: string = "boom2023_";
export const logo: string = boomconsoleLogo;

export enum captureTypes {
  Document = "Document",
  Image = "Image",
  Chatgpt = "extension_chatgpt",
  TracedUrls = "traced_url",
  ChatgptAll = "extension_chatgpt_all",
  VisualText = "visual_text",
  PollData = "poll",
  URL = "url",
  OnlyImages = "only_images",
  Screenshot = "screenshot",
  ALL = "all",
  GoogleBard = "extension_googlebard",
  YouChat = "extension_youchat",
  PoeChat = "extension_poechat",
  linkedin = "extension_linkedin",
  monster = "extension_monster",
  indeed = "extension_indeed",
  maps = "extension_maps",
  whatsapp = "extension_whatsapp",
}
