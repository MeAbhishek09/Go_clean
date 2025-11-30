FROM python:3.10-slim

WORKDIR /app

# Copy requirements and install Python deps
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy rest of backend code (including main.py, best.pt, etc.)
COPY . .

ENV PORT=8000
EXPOSE 8000

CMD ["python", "main.py"]
