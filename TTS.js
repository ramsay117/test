import axios from 'axios';
import fs from 'fs/promises';

// Configuration
const MURF_API_KEY = 'ap2_439ce239-d996-4c89-a091-25312c44b67a';
const MURF_BASE_URL = 'https://api.murf.ai';

// Create axios instance
const murfClient = axios.create({
  baseURL: MURF_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Generate auth token
async function generateAuthToken() {
  try {
    const response = await murfClient.get('/v1/auth/token', {
      headers: {
        'api-key': MURF_API_KEY,
      },
    });
    return response.data.token;
  } catch (error) {
    throw new Error(`Auth failed: ${error.message}`);
  }
}

// Generate speech from text
async function generateSpeech(token, text, voiceId = 'en-US-cooper') {
  try {
    const response = await murfClient.post(
      '/v1/speech/generate',
      {
        text,
        voiceId,
        format: 'MP3',
        sampleRate: 48000,
        speed: 1.0,
        model: 'GEN2',
      },
      {
        headers: {
          token: token,
        },
      },
    );

    // Download audio from the provided URL
    const audioResponse = await axios.get(response.data.audioFile, {
      responseType: 'arraybuffer',
    });

    return audioResponse.data;
  } catch (error) {
    throw new Error(`Speech generation failed: ${error.message}`);
  }
}

// Save audio file
async function saveAudioFile(audioBuffer, filename) {
  try {
    await fs.mkdir('./audio', { recursive: true });
    const outputPath = `./audio/${filename}.mp3`;
    await fs.writeFile(outputPath, audioBuffer);
    console.log(`Audio saved to: ${outputPath}`);
    return outputPath;
  } catch (error) {
    throw new Error(`File save failed: ${error.message}`);
  }
}

// Main function
async function main() {
  try {
    console.log('Generating auth token...');
    const token = await generateAuthToken();

    console.log('Generating audio...');
    const audioBuffer = await generateSpeech(
      token,
      'Yes Madam! Tons of text-to-speech tools out there—like this one from your awesome friend Shubham! Just say Myo is yours and boom, the world gets better!',
      'en-IN-aarav', // You can change this to any valid voice ID
    );

    const filename = `speech_${Date.now()}`;
    await saveAudioFile(audioBuffer, filename);

    console.log('Done! Audio file generated successfully.');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run it
main();
