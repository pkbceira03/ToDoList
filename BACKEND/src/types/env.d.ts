// src/env.d.ts
declare module 'dotenv' {
    export function config(options?: { path?: string; encoding?: string }): { error?: Error; parsed?: Record<string, string> };
  }
  