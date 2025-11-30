import os
import pathlib

# Apply this hack ONLY on Windows
if os.name == "nt":
    pathlib.PosixPath = pathlib.WindowsPath

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from PIL import Image
import numpy as np
import io
import torch
import uvicorn


app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # you can restrict after deployment
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load YOLOv5 model
model = torch.hub.load(
    'ultralytics/yolov5',
    'custom',
    path='best.pt',
    trust_repo=True,
)

CONF_THRESHOLD = 0.5


@app.post("/detect")
async def detect(file: UploadFile = File(...)):
    image_bytes = await file.read()
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    results = model(img, size=640)

    detections = []
    for *box, conf, cls_id in results.xyxy[0].tolist():
        if conf < CONF_THRESHOLD:
            continue
        x1, y1, x2, y2 = box
        detections.append({
            "class": model.names[int(cls_id)],
            "confidence": float(conf),
            "box": [float(x1), float(y1), float(x2), float(y2)],
        })

    has_garbage = len(detections) > 0
    max_conf = max((d["confidence"] for d in detections), default=0.0)

    return JSONResponse({
        "hasGarbage": has_garbage,
        "max_confidence": max_conf,
        "detections": detections,
    })


# -------------------------
#     RUN ON RENDER
# -------------------------
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)
