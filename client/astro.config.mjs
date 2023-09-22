import * as dotenv from 'dotenv'
import { loadEnv } from "vite";

const {
  PUBLIC_SANITY_STUDIO_PROJECT_ID,
  PUBLIC_SANITY_STUDIO_DATASET,
  PUBLIC_SANITY_PROJECT_ID,
  PUBLIC_SANITY_DATASET,
} = loadEnv(import.meta.env.MODE, process.cwd(), "");
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

dotenv.config()

// Different environments use different variables
const projectId = process.env.SANITY_STUDIO_API_PROJECT_ID || PUBLIC_SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_API_DATASET || PUBLIC_SANITY_STUDIO_DATASET;

import sanity from "@sanity/astro";
import react from "@astrojs/react";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  adapter: vercel(),
  integrations: [sanity({
    projectId,
    dataset,
    studioBasePath: "/admin",
    useCdn: false,
    // `false` if you want to ensure fresh data
    apiVersion: "2023-09-22" // Set to date of setup to use the latest API version
  }),tailwind(), react()]
});