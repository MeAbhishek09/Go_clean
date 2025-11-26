# --- HARD FIX FOR WINDOWS PosixPath ISSUE ---
import pathlib
# On Windows, PosixPath can't be instantiated, so we map it to WindowsPath
pathlib.PosixPath = pathlib.WindowsPath

# Now import everything else
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from PIL import Image
import numpy as np
import io
import torch

app = FastAPI()

# Allow frontend (Vite) to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "*"  # you can lock this later
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔥 Load YOLOv5 model using torch.hub with your best.pt
# Make sure best.pt is in the SAME folder as this main.py
model = torch.hub.load(
    'ultralytics/yolov5',
    'custom',
    path='best.pt',
    force_reload=True,  # force re-download / re-load, ignore old cache
    trust_repo=True     # required in newer torch versions
)


CONF_THRESHOLD = 0.5  # you can tune this

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
