import { webcrypto } from "one-webcrypto"
import { NamedCurve, KeyType, PrivateKeyJwk } from "../types.js"

export const ALG = "ECDSA"
export const DEFAULT_CURVE = "P-256"
export const DEFAULT_HASH_ALG = "SHA-256"

export const generateKeypair = async (
  namedCurve: NamedCurve = DEFAULT_CURVE
): Promise<CryptoKeyPair> => {
  return await webcrypto.subtle.generateKey(
    {
      name: ALG,
      namedCurve,
    },
    false,
    [ "sign", "verify" ]
  )
}

export const importKeypairJwk = async (
  privKeyJwk: PrivateKeyJwk,
  namedCurve: NamedCurve = DEFAULT_CURVE,
  exportable = false
): Promise<CryptoKeyPair> => {
  const privateKey = await webcrypto.subtle.importKey(
    "jwk",
    privKeyJwk,
    {
      name: ALG,
      namedCurve,
    },
    exportable,
    ["sign" ]
  )
  const { kty, crv, x, y} = privKeyJwk
  const pubKeyJwk = { kty, crv, x, y}
  const publicKey = await webcrypto.subtle.importKey(
    "jwk",
    pubKeyJwk,
    {
      name: ALG,
      namedCurve,
    },
    true,
    [ "verify" ]
  )
  return { privateKey, publicKey }
}

export const exportKey = async (key: CryptoKey): Promise<Uint8Array> => {
  const buf = await webcrypto.subtle.exportKey("raw", key)
  return new Uint8Array(buf)
}

export const importKey = async (
  key: Uint8Array,
  namedCurve: NamedCurve
): Promise<CryptoKey> => {
  return await webcrypto.subtle.importKey(
    "raw",
    key.buffer,
    { name: ALG, namedCurve },
    true,
    [ "verify" ]
  )
}

export const sign = async (
  msg: Uint8Array,
  privateKey: CryptoKey
): Promise<Uint8Array> => {
  const buf = await webcrypto.subtle.sign(
    { name: ALG, hash: { name: DEFAULT_HASH_ALG } },
    privateKey,
    msg.buffer
  )
  return new Uint8Array(buf)
}

export const verify = async (
  msg: Uint8Array,
  sig: Uint8Array,
  pubKey: Uint8Array,
  namedCurve: NamedCurve
): Promise<boolean> => {
  return await webcrypto.subtle.verify(
    { name: ALG, hash: { name: DEFAULT_HASH_ALG } },
    await importKey(pubKey, namedCurve),
    sig.buffer,
    msg.buffer
  )
}

export const toKeyType = (namedCurve: NamedCurve): KeyType => {
  switch (namedCurve) {
    case "P-256":
      return "p256"
    default:
      throw new Error(`Unsupported namedCurve: ${namedCurve}`)
  }
}
