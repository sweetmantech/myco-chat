import { base } from 'wagmi/chains'

// STACK EVENTS
export const FIRST_SMART_WALLET_LOGIN_EVENT = 'first_smart_wallet_login'
export const MESSAGE_SENT_EVENT = 'message_sent'
export const SMART_WALLET_LOGIN_POINT = 11
export const MESSAGE_SENT_POINT = 1
export const CHAT_POINT_SYSTEM_ID = 4026
export const SETUP_NEW_CONTRACT_EVENT = 'setup_new_contract'
export const SETUP_NEW_CONTRACT_POINT = 55
export const CHAIN_ID = base.id
export const COMMENT = 'myco.wtf'
export const REFERRAL_RECIPIENT = '0x74d57BFDcF3C8fe5B6FF6661D4896A45A3269393'

// Vercel AI SDK
export const AI_MODEL = "gpt-4o-mini"

// Suggestions
export const SUGGESTIONS = [
  "What did I create this week???",
  "What's my Zora score???",
]

// IPFS
export const ONE_MB = 1024 * 1024
export const MAX_FILE_SIZE = 5 * ONE_MB
export const PROFILE_APP_URL = process.env.NEXT_PUBLIC_PROFILE_APP_URL || 'https://profile.myco.wtf'
export const API_APP_URL = 'https://api.myco.wtf'
export const SUPPORTED_FILES = ['image', 'audio', 'video']

export const SYSTEM_PROMPT = `\
You are a helpful assistant that can create tokens on the chain.
You can create a token by calling the create tool.
Messages inside [] means that it is a UI element or a user event.
`; 