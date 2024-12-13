import { decodeBase64url as osloDecodeBase64Url, encodeBase64url as osloEncodeBase64Url } from "@oslojs/encoding"

export function encodeBase64url(str: string) {
    const data: Uint8Array = new TextEncoder().encode(str)
    return osloEncodeBase64Url(data)
}

export function decodeBase64url(str: string) {
    return new TextDecoder().decode(osloDecodeBase64Url(str))
}
