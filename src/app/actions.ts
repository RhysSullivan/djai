"use server"
import { ElevenLabsClient } from "elevenlabs"

const elevenlabs = new ElevenLabsClient();

export async function generateAudio() {
    try {
        const audio = await elevenlabs.textToSpeech.convert("l55wMtEYx1fC2eCBz4Ez", {
            text: "Hello, world!",
            model_id: "eleven_multilingual_v2",
        });
        let data = Buffer.from([]);
        audio.on("data", (lister) => {
            console.log(lister)
            data = Buffer.concat([data, lister]);
        });
        await new Promise((resolve) => {
            console.log("ended")
            audio.on("end", resolve);
        });
        return data;
    } catch (error) {
        console.error(error);
    }
}

