import { EDWARDS_DID_PREFIX } from "../prefixes"
import { didFromKeyBytes, keyBytesFromDid } from "../util"

export const didToPublicKey = (did: string): Uint8Array => {
  return keyBytesFromDid(did, EDWARDS_DID_PREFIX)
}

export const publicKeyToDid = (pubkey: Uint8Array): string => {
  return didFromKeyBytes(pubkey, EDWARDS_DID_PREFIX)
}
