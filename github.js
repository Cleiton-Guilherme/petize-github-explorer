import { z } from 'zod'

export const GitHubUserSchema = z.object({
  id: z.number(),
  login: z.string(),
  name: z.string().nullable(),
  avatar_url: z.string().url(),
  bio: z.string().nullable(),
  public_repos: z.number(),
  followers: z.number(),
  following: z.number(),
  blog: z.string().nullable().optional(),
  twitter_username: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  company: z.string().nullable().optional(),
  html_url: z.string().url(),
})

export const GitHubRepoSchema = z.object({
  id: z.number(),
  name: z.string(),
  full_name: z.string(),
  description: z.string().nullable(),
  html_url: z.string().url(),
  stargazers_count: z.number(),
  forks_count: z.number(),
  language: z.string().nullable(),
  updated_at: z.string(),
  created_at: z.string(),
  fork: z.boolean(),
  private: z.boolean(),
  topics: z.array(z.string()).optional(),
})

export const GitHubReposSchema = z.array(GitHubRepoSchema)

/** @typedef {z.infer<typeof GitHubUserSchema>} GitHubUser */
/** @typedef {z.infer<typeof GitHubRepoSchema>} GitHubRepo */
