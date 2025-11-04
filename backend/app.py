from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import torch
from PIL import Image
import io

app = FastAPI()

# ✅ Allow requests from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change to ["http://localhost:5173"] if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Load your trained YOLOv5 model
MODEL_PATH = "rC:\Users\NAMRATA\OneDrive\Documents\Go_clean\Garbage_model\garbage-detection-yolov5.ipynb"  # put your model here
model = torch.hub.load("ultralytics/yolov5", "custom", path=MODEL_PATH, force_reload=True)

@app.post("/detect")
async def detect_image(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")

    # 🔍 Run YOLOv5 detection
    results = model(image)
    detections = results.pandas().xyxy[0].to_dict(orient="records")

    output = []
    for d in detections:
        output.append({
            "name": d["name"],
            "confidence": float(d["confidence"]),
            "xmin": float(d["xmin"]),
            "ymin": float(d["ymin"]),
            "xmax": float(d["xmax"]),
            "ymax": float(d["ymax"]),
        })

    return {"detections": output}
