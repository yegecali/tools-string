/**
 * Utilidades para operaciones de Hash
 */

import CryptoJS from 'crypto-js'

export interface HashResult {
  success: boolean
  message: string
  hash?: {
    algorithm: string
    hex: string
    base64: string
    input: string
  }
}

/**
 * Generar hash MD5
 */
export function hashMD5(text: string, salt: string = ''): HashResult {
  try {
    if (!text.trim()) {
      return { success: false, message: 'Por favor ingresa texto' }
    }
    const textToHash = salt ? text + salt : text
    const hashObj = CryptoJS.MD5(textToHash)
    const hex = hashObj.toString()
    const base64 = CryptoJS.enc.Base64.stringify(hashObj)

    return {
      success: true,
      message: '✅ MD5 generado',
      hash: { algorithm: 'MD5', hex, base64, input: textToHash },
    }
  } catch (error) {
    return { success: false, message: `❌ Error: ${(error as Error).message}` }
  }
}

/**
 * Generar hash SHA1
 */
export function hashSHA1(text: string, salt: string = ''): HashResult {
  try {
    if (!text.trim()) {
      return { success: false, message: 'Por favor ingresa texto' }
    }
    const textToHash = salt ? text + salt : text
    const hashObj = CryptoJS.SHA1(textToHash)
    const hex = hashObj.toString()
    const base64 = CryptoJS.enc.Base64.stringify(hashObj)

    return {
      success: true,
      message: '✅ SHA1 generado',
      hash: { algorithm: 'SHA1', hex, base64, input: textToHash },
    }
  } catch (error) {
    return { success: false, message: `❌ Error: ${(error as Error).message}` }
  }
}

/**
 * Generar hash SHA256
 */
export function hashSHA256(text: string, salt: string = ''): HashResult {
  try {
    if (!text.trim()) {
      return { success: false, message: 'Por favor ingresa texto' }
    }
    const textToHash = salt ? text + salt : text
    const hashObj = CryptoJS.SHA256(textToHash)
    const hex = hashObj.toString()
    const base64 = CryptoJS.enc.Base64.stringify(hashObj)

    return {
      success: true,
      message: '✅ SHA256 generado',
      hash: { algorithm: 'SHA256', hex, base64, input: textToHash },
    }
  } catch (error) {
    return { success: false, message: `❌ Error: ${(error as Error).message}` }
  }
}

/**
 * Generar hash SHA512
 */
export function hashSHA512(text: string, salt: string = ''): HashResult {
  try {
    if (!text.trim()) {
      return { success: false, message: 'Por favor ingresa texto' }
    }
    const textToHash = salt ? text + salt : text
    const hashObj = CryptoJS.SHA512(textToHash)
    const hex = hashObj.toString()
    const base64 = CryptoJS.enc.Base64.stringify(hashObj)

    return {
      success: true,
      message: '✅ SHA512 generado',
      hash: { algorithm: 'SHA512', hex, base64, input: textToHash },
    }
  } catch (error) {
    return { success: false, message: `❌ Error: ${(error as Error).message}` }
  }
}

/**
 * Generar salt aleatorio
 */
export function generateRandomSalt(length: number = 8): string {
  return Math.random().toString(36).substring(2, length + 2)
}

/**
 * Generar hash basado en algoritmo
 */
export function generateHash(
  text: string,
  algorithm: 'MD5' | 'SHA1' | 'SHA256' | 'SHA512',
  salt: string = '',
): HashResult {
  switch (algorithm) {
    case 'MD5':
      return hashMD5(text, salt)
    case 'SHA1':
      return hashSHA1(text, salt)
    case 'SHA256':
      return hashSHA256(text, salt)
    case 'SHA512':
      return hashSHA512(text, salt)
    default:
      return { success: false, message: 'Algoritmo no soportado' }
  }
}

/**
 * Validar formato hexadecimal
 */
export function isValidHex(hex: string): boolean {
  return /^[a-f0-9]+$/i.test(hex)
}

/**
 * Validar formato Base64
 */
export function isValidBase64(base64: string): boolean {
  try {
    return btoa(atob(base64)) === base64
  } catch {
    return false
  }
}

