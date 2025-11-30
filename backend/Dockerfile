# Use official PyTorch CPU image (already has torch etc.)
FROM pytorch/pytorch:2.0.1-cpu

# Install system libs needed by OpenCV (cv2)
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy requirements and install Python deps
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend code (main.py, best.pt, etc.)
COPY . .

ENV PORT=8000
EXPOSE 8000

CMD ["python", "main.py"]
