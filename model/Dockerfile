FROM python:3.12-slim

ENV PIP_DEFAULT_TIMEOUT=300

WORKDIR /app

COPY requirements_docker.txt .

RUN pip install --no-cache-dir -r requirements_docker.txt

COPY . .

CMD ["python", "predict_server.py"]
