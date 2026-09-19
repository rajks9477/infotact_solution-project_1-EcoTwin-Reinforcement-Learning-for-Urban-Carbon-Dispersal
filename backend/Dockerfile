# EcoTwin - Production FastAPI Backend Container
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Python requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend codebase and models
COPY backend/ ./backend/
COPY simulation/ ./simulation/
COPY rl/ ./rl/

EXPOSE 8000

# Run FastAPI with Uvicorn ASGI server
CMD ["uvicorn", "backend.app:app", "--host", "0.0.0.0", "--port", "8000"]