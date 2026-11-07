
import { encode, decode } from 'gpt-tokenizer'

// Uses the package's default o200k_base encoding.
export function tokenizeText(text) {
  const tokenIds = encode(text)

  return {
    originalText: text,
    tokenCount: tokenIds.length,
    tokenIds,
    tokens: tokenIds.map((id) => ({
      id,
      text: decode([id])
    }))
  }
}

export function countTextTokens(text) {
  return encode(text).length
}
