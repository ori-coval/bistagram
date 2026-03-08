import base64
from io import BytesIO
from PIL import Image


def resize_base64_image(base64_url: str, max_size=(2000, 2000), quality=70) -> str:
    header, encoded = base64_url.split(",", 1)
    image_data = base64.b64decode(encoded)

    image = Image.open(BytesIO(image_data))
    w, h = image.size
    max_w, max_h = max_size

    ratio = min(max_w / w, max_h / h)
    new_size = (int(w * ratio), int(h * ratio))

    image = image.resize(new_size)
    image = image.convert("RGB")
    buffer = BytesIO()
    image.save(buffer, format="JPEG", quality=quality)
    new_base64 = base64.b64encode(buffer.getvalue()).decode("utf-8")
    return f"data:image/jpeg;base64,{new_base64}"
