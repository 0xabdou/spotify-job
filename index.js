const core = require('@actions/core');
const fetch = require("node-fetch");

const doTheJob = async () => {
  try {
    const secret = core.getInput('secret');
    console.log("SECRET IS: ", secret);
    const response = await fetch(
      "https://www.abdou.dev/api/spotify/update-liked-songs",
      {
        method: "PUT",
        body: JSON.stringify({secret})
      }
    );
    const message = await response.text();
    if (response.status !== 201) {
      core.setFailed(message);
    } else {
      core.setOutput(message);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
};

void doTheJob();