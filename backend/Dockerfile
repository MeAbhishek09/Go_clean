FROM python:3.10-slim

# Install system libs needed by OpenCV (cv2)
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy requirements and install Python deps (WITHOUT torch/torchvision here)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install CPU-only PyTorch + torchvision
RUN pip install --no-cache-dir \
    torch==2.2.1 \
    torchvision==0.17.1 \
    --index-url https://download.pytorch.org/whl/cpu

# Copy the backend code (main.py, best.pt, etc.)
COPY . .

ENV PORT=8000
EXPOSE 8000

CMD ["python", "main.py"]
