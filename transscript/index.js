/* Kudos to Kakulukian for inspiration */
/* https://github.com/Kakulukian/youtube-transcript */

import fetch from "node-fetch";
import { generateRequest } from "./generateRequest.js";

const innertube_regex = /"INNERTUBE_API_KEY":"([^"]+)"/;

export async function getTranscript({ url }) {
  // Fetch the initial video page and extract the INNERTUBE_KEY
  const response = await fetch(url);
  const videoPageBody = await response.text();
  const match = videoPageBody.match(innertube_regex);
  const INNERTUBE_KEY = match && match[1];

  // Make a POST request to get the transcript data
  const transcriptResponse = await fetch(`https://www.youtube.com/youtubei/v1/get_transcript?key=${INNERTUBE_KEY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(generateRequest(videoPageBody, { lang: "en" })),
  });

  const body = await transcriptResponse.json();

  if (!body.actions) {
    throw new Error("Transcript is disabled on this video");
  }

  // Extract the transcript data from the response
  const cueGroups = body.actions[0].updateEngagementPanelAction.content.transcriptRenderer.body.transcriptBodyRenderer.cueGroups;
  const transcripts = cueGroups.map((cueGroup) => {
    const cue = cueGroup.transcriptCueGroupRenderer.cues[0].transcriptCueRenderer;
    return {
      text: cue.cue.simpleText,
      duration: parseInt(cue.durationMs),
      offset: parseInt(cue.startOffsetMs),
    };
  });

  return transcripts
}