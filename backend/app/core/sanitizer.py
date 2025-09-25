# app/core/sanitizer.py
import bleach

def sanitize_text(value):
    if value is None:
        return None
    if not isinstance(value, str):
        return value
    return bleach.clean(value, strip=True)

def sanitize_dict(data: dict) -> dict:
    """Recorre un diccionario y limpia solo los valores str"""
    return {k: sanitize_text(v) if isinstance(v, str) else v for k, v in data.items()}