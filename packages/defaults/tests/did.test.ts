import * as did from "../src/did"

describe("publicKeyToDid", () => {

  it("handles RSA Keys", async () => {
    const pubkey = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnzyis1ZjfNB0bBgKFMSvvkTtwlvBsaJq7S5wA+kzeVOVpVWwkWdVha4s38XM/pa/yr47av7+z3VTmvDRyAHcaT92whREFpLv9cj5lTeJSibyr/Mrm/YtjCZVWgaOYIhwrXwKLqPr/11inWsAkfIytvHWTxZYEcXLgAXFuUuaS3uF9gEiNQwzGTU1v0FqkqTBr4B8nW3HCN47XUu0t8Y0e+lf4s4OxQawWD79J9/5d3Ry0vbV3Am1FtGJiJvOwRsIfVChDpYStTcHTCMqtvWbV6L11BWkpzGXSW4Hv43qa+GSYOD2QU68Mb59oSk2OB+BtOLpJofmbGEGgvmwyCI9MwIDAQAB"
    // old: const expectedDid = "did:key:z13V3Sog2YaUKhdGCmgx9UZuW1o1ShFJYc6DvGYe7NTt689NoL2RtpVs65Zw899YrTN9WuxdEEDm54YxWuQHQvcKfkZwa8HTgokHxGDPEmNLhvh69zUMEP4zjuARQ3T8bMUumkSLGpxNe1bfQX624ef45GhWb3S9HM3gvAJ7Qftm8iqnDQVcxwKHjmkV4hveKMTix4bTRhieVHi1oqU4QCVy4QPWpAAympuCP9dAoJFxSP6TNBLY9vPKLazsg7XcFov6UuLWsEaxJ5SomCpDx181mEgW2qTug5oQbrJwExbD9CMgXHLVDE2QgLoQMmgsrPevX57dH715NXC2uY6vo2mYCzRY4KuDRUsrkuYCkewL8q2oK1BEDVvi3Sg8pbC9QYQ5mMiHf8uxiHxTAmPedv8"
    const expectedDid = "did:key:z4MXj1wBzi9jUstyNvmiK5WLRRL4rr9UvzPxhry1CudCLKWLyMbP1WoTwDfttBTpxDKf5hAJEjqNbeYx2EEvrJmSWHAu7TJRPTrE3QodbMfRvRNRDyYvaN1FSQus2ziS1rWXwAi5Gpc16bY3JwjyLCPJLfdRWHZhRXiay5FWEkfoSKy6aftnzAvqNkKBg2AxgzGMinR6d1WiH4w5mEXFtUeZkeo4uwtRTd8rD9BoVaHVkGwJkksDybE23CsBNXiNfbweFVRcwfTMhcQsTsYhUWDcSC6QE3zt9h4Rsrj7XRYdwYSK5bc1qFRsg5HULKBp2uZ1gcayiW2FqHFcMRjBieC4LnSMSD1AZB1WUncVRbPpVkn1UGhCU"
    const result = did.publicKeyToDid(pubkey, "rsa")
    expect(result).toEqual(expectedDid)
  })

  it("handles Ed25519 Keys", async () => {
    const pubkey = "Hv+AVRD2WUjUFOsSNbsmrp9fokuwrUnjBcr92f0kxw4="
    const expectedDid = "did:key:z6MkgYGF3thn8k1Fv4p4dWXKtsXCnLH7q9yw4QgNPULDmDKB"
    const result = did.publicKeyToDid(pubkey, "ed25519")
    expect(result).toEqual(expectedDid)
  })

  it("handles BLS12-381 Keys", async () => {
    const pubkey = "Hv+AVRD2WUjUFOsSNbsmrp9fokuwrUnjBcr92f0kxw4="
    const expectedDid = "did:key:z6HpYD1br5P4QVh5rjRGAkBfKMWes44uhKmKdJ6dN2Nm9gHK"
    const result = did.publicKeyToDid(pubkey, "bls12-381")
    expect(result).toEqual(expectedDid)
  })

  it("handles NIST P-256 Keys", async () => {
    const pubkey = "BEgg6smRlRQXKqzJHu0w5/nHcy7zYNxFXwTKUyyCOoDMztUvQn5VZg668v4MecHGUZTeHkaZhSraK7RtJuXfWp4="
    const expectedDid = "did:key:zDnaeVHXWgKUpJFc8AUfRDuRWfsAQejmZu5HrERh41iGumZVu"
    const result = did.publicKeyToDid(pubkey, "p256")
    expect(result).toEqual(expectedDid)
  })

})

describe("didToPublicKey", () => {

  it("handles old RSA Keys", async () => {
    const toDecode = "did:key:z13V3Sog2YaUKhdGCmgx9UZuW1o1ShFJYc6DvGYe7NTt689NoL2RtpVs65Zw899YrTN9WuxdEEDm54YxWuQHQvcKfkZwa8HTgokHxGDPEmNLhvh69zUMEP4zjuARQ3T8bMUumkSLGpxNe1bfQX624ef45GhWb3S9HM3gvAJ7Qftm8iqnDQVcxwKHjmkV4hveKMTix4bTRhieVHi1oqU4QCVy4QPWpAAympuCP9dAoJFxSP6TNBLY9vPKLazsg7XcFov6UuLWsEaxJ5SomCpDx181mEgW2qTug5oQbrJwExbD9CMgXHLVDE2QgLoQMmgsrPevX57dH715NXC2uY6vo2mYCzRY4KuDRUsrkuYCkewL8q2oK1BEDVvi3Sg8pbC9QYQ5mMiHf8uxiHxTAmPedv8"
    const expectedKey = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnzyis1ZjfNB0bBgKFMSvvkTtwlvBsaJq7S5wA+kzeVOVpVWwkWdVha4s38XM/pa/yr47av7+z3VTmvDRyAHcaT92whREFpLv9cj5lTeJSibyr/Mrm/YtjCZVWgaOYIhwrXwKLqPr/11inWsAkfIytvHWTxZYEcXLgAXFuUuaS3uF9gEiNQwzGTU1v0FqkqTBr4B8nW3HCN47XUu0t8Y0e+lf4s4OxQawWD79J9/5d3Ry0vbV3Am1FtGJiJvOwRsIfVChDpYStTcHTCMqtvWbV6L11BWkpzGXSW4Hv43qa+GSYOD2QU68Mb59oSk2OB+BtOLpJofmbGEGgvmwyCI9MwIDAQAB"
    const { publicKey, type } = did.didToPublicKey(toDecode)
    expect(publicKey).toEqual(expectedKey)
    expect(type).toEqual("rsa")
  })

  it("handles standardized RSA Keys", async () => {
    const toDecode = "did:key:z4MXj1wBzi9jUstyNvmiK5WLRRL4rr9UvzPxhry1CudCLKWLyMbP1WoTwDfttBTpxDKf5hAJEjqNbeYx2EEvrJmSWHAu7TJRPTrE3QodbMfRvRNRDyYvaN1FSQus2ziS1rWXwAi5Gpc16bY3JwjyLCPJLfdRWHZhRXiay5FWEkfoSKy6aftnzAvqNkKBg2AxgzGMinR6d1WiH4w5mEXFtUeZkeo4uwtRTd8rD9BoVaHVkGwJkksDybE23CsBNXiNfbweFVRcwfTMhcQsTsYhUWDcSC6QE3zt9h4Rsrj7XRYdwYSK5bc1qFRsg5HULKBp2uZ1gcayiW2FqHFcMRjBieC4LnSMSD1AZB1WUncVRbPpVkn1UGhCU"
    const expectedKey = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnzyis1ZjfNB0bBgKFMSvvkTtwlvBsaJq7S5wA+kzeVOVpVWwkWdVha4s38XM/pa/yr47av7+z3VTmvDRyAHcaT92whREFpLv9cj5lTeJSibyr/Mrm/YtjCZVWgaOYIhwrXwKLqPr/11inWsAkfIytvHWTxZYEcXLgAXFuUuaS3uF9gEiNQwzGTU1v0FqkqTBr4B8nW3HCN47XUu0t8Y0e+lf4s4OxQawWD79J9/5d3Ry0vbV3Am1FtGJiJvOwRsIfVChDpYStTcHTCMqtvWbV6L11BWkpzGXSW4Hv43qa+GSYOD2QU68Mb59oSk2OB+BtOLpJofmbGEGgvmwyCI9MwIDAQAB"
    const { publicKey, type } = did.didToPublicKey(toDecode)
    expect(publicKey).toEqual(expectedKey)
    expect(type).toEqual("rsa")
  })

  it("handles Ed25519 Keys", async () => {
    const toDecode = "did:key:z6MkgYGF3thn8k1Fv4p4dWXKtsXCnLH7q9yw4QgNPULDmDKB"
    const expectedKey = "Hv+AVRD2WUjUFOsSNbsmrp9fokuwrUnjBcr92f0kxw4="
    const { publicKey, type } = did.didToPublicKey(toDecode)
    expect(publicKey).toEqual(expectedKey)
    expect(type).toEqual("ed25519")
  })

  it("handles BLS12-381 Keys", async () => {
    const toDecode = "did:key:z6HpYD1br5P4QVh5rjRGAkBfKMWes44uhKmKdJ6dN2Nm9gHK"
    const expectedKey = "Hv+AVRD2WUjUFOsSNbsmrp9fokuwrUnjBcr92f0kxw4="
    const { publicKey, type } = did.didToPublicKey(toDecode)
    expect(publicKey).toEqual(expectedKey)
    expect(type).toEqual("bls12-381")
  })

  it("handles NIST P-256 Keys", async () => {
    const toDecode = "did:key:zDnaeVHXWgKUpJFc8AUfRDuRWfsAQejmZu5HrERh41iGumZVu"
    const expectedKey = "BEgg6smRlRQXKqzJHu0w5/nHcy7zYNxFXwTKUyyCOoDMztUvQn5VZg668v4MecHGUZTeHkaZhSraK7RtJuXfWp4="
    const { publicKey, type } = did.didToPublicKey(toDecode)
    expect(publicKey).toEqual(expectedKey)
    expect(type).toEqual("p256")
  })

})
