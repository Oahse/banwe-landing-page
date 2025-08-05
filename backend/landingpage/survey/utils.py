from Crypto.Cipher import AES
import base64
import json

# AES requires block size multiple of 16, so add padding
BLOCK_SIZE = 16
ENCRYPTION_KEY = 'A7f9X2mV4Qe8LtCp'  # Must be 16 chars for AES-128 ECB

def pad(s):
    return s + (BLOCK_SIZE - len(s) % BLOCK_SIZE) * chr(BLOCK_SIZE - len(s) % BLOCK_SIZE)

def encrypt_data(data, key):
    raw = pad(json.dumps(data))
    cipher = AES.new(key.encode('utf-8'), AES.MODE_ECB)
    encrypted = cipher.encrypt(raw.encode('utf-8'))
    return base64.b64encode(encrypted).decode('utf-8')
