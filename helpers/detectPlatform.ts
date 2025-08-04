import type { Request } from "express";
const detectPlatform = (req: Request): 'web' | 'mobile' => {
  const platform = req.headers['x-client-platform'] || req.query.platform;


  return platform === 'mobile' ? 'mobile' : 'web'
}

module.exports = detectPlatform;
