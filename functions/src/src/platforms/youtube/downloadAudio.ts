import { Context } from "telegraf";
// import ytdl from "ytdl-core";

import ytdl from "@distube/ytdl-core";
import ytdlAgent from "../../functions/createYtdlAgent";

export default async function downloadAudio(
  link: string,
  quality: string,
  ctx: Context,
  message_id: number
) {
  try {
    const message = await ctx.reply("Please Wait... \n\n" + "Downloading audio..", {
      reply_to_message_id: message_id,
    });
    // await ctx.answerCbQuery("Generating Link Please Wait....");

    const res = await ytdl.getInfo(link,{agent:ytdlAgent()});

    const downloadLink = res.formats.find(
      (format) => format.audioQuality === quality
    )?.url;

    // console.log(downloadLink);

    if (!downloadLink) {
      ctx.reply("Sorry we can't download this audio", {
        reply_to_message_id: message_id,
      });
      return;
    }

    await ctx.deleteMessage(message.message_id);
    
    ctx.reply(downloadLink, {
      reply_to_message_id: message_id,
    });
  } catch (error) {
    console.log(error);
    ctx.reply("Sorry we can't download this video", {
      reply_to_message_id: message_id,
    });
  }
}
