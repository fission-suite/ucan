# UCANs
[![NPM](https://img.shields.io/npm/v/ucans)](https://www.npmjs.com/package/ucans)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://github.com/fission-suite/blob/master/LICENSE)
[![Built by FISSION](https://img.shields.io/badge/⌘-Built_by_FISSION-purple.svg)](https://fission.codes)
[![Discord](https://img.shields.io/discord/478735028319158273.svg)](https://discord.gg/zAQBDEq)
[![Discourse](https://img.shields.io/discourse/https/talk.fission.codes/topics)](https://talk.fission.codes)

UCANs are simply JWTs that contain special keys.
At a high level, UCANs (“User Controlled Authorization Network”) are a way of doing authorization ("what you can do") where users are fully in control. There's no all-powerful authorization server, or server of any kind required. Everything that a users is allowed to do is captured directly in a key or token, and can be sent to anyone that knows how to interpret this format. This works server -> server, client -> server, or p2p.

**OAuth is designed for a centralized world, UCAN is the distributed user controlled version.**

Read more in the whitepaper: https://whitepaper.fission.codes/access-control/ucan


## Structure
 ### Header
 `alg`, Algorithm, the type of signature.

 `typ`, Type, the type of this data structure, JWT.

 `uav`, UCAN version.
 ### Payload

 `att`, Attenuation, a list of resources and capabilities that the ucan grants.

 `aud`, Audience, the ID of who it's intended for.

 `exp`, Expiry, unix timestamp of when the jwt is no longer valid.

 `fct`, Facts, an array of extra facts or information to attach to the jwt.

 `iss`, Issuer, the ID of who sent this.

 `nbf`, Not Before, unix timestamp of when the jwt becomes valid.

 `prf`, Proof, an optional nested token with equal or greater privileges.

 ### Signature
 A signature (using `alg`) of the base64 encoded header and payloaded concatenated together and delimited by `.`

## Build params
Use `ucan.build` to help in formatting and signing a ucan. It takes the following parameters
```ts
export type BuildParams = {
  // to/from
  audience: string
  issuer: Keypair

  // capabilities
  capabilities: Array<Capability>

  // time bounds
  lifetimeInSeconds?: number // expiration overrides lifetimeInSeconds
  expiration?: number
  notBefore?: number

  // proof / other info
  facts?: Array<Fact>
  proof?: string

  // in the weeds
  ucanVersion?: string
}
```
### Capabilities
`capabilities` is an array of resources and permission level formatted as:
```ts
{
  $TYPE: $IDENTIFIER,
  "cap": $CAPABILITY
}
```

## Example
```ts
import * as ucan from 'ucans'

// in-memory keypair
const keypair = await ucan.keypair.create(ucan.KeyTypes.Edwards)
const u = await ucan.build({
  audience: audience.did(), //recipient
  issuer: keypair, //signing key
  capabilities: [ // permissions for ucan
    {
      "wnfs": "boris.fission.name/public/photos/",
      "cap": "OVERWRITE"
    },
    {
      "wnfs": "boris.fission.name/private/4tZA6S61BSXygmJGGW885odfQwpnR2UgmCaS5CfCuWtEKQdtkRnvKVdZ4q6wBXYTjhewomJWPL2ui3hJqaSodFnKyWiPZWLwzp1h7wLtaVBQqSW4ZFgyYaJScVkBs32BThn6BZBJTmayeoA9hm8XrhTX4CGX5CVCwqvEUvHTSzAwdaR",
      "cap": "APPEND"
    },
    {
      "email": "boris@fission.codes",
      "cap": "SEND"
    }
  ]
})
const token = ucan.encode(u) // base64 jwt-formatted auth token

// You can also use your own signing function if you're bringing your own key management solution
const { header, payload } = await ucan.buildParts(...)
const u = await ucan.addSignature(header, payload, signingFn)
```

## UCAN Toucan
![](https://ipfs.runfission.com/ipfs/QmcyAwK7AjvLXbGuL4cqG5nufEKJquFmFGo2SDsaAe939Z)
