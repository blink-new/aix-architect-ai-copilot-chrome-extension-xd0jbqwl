import { createClient } from '@blinkdotnew/sdk'

export const blink = createClient({
  projectId: 'aix-architect-ai-copilot-chrome-extension-xd0jbqwl',
  authRequired: false // For Chrome extension, we'll handle auth differently
})