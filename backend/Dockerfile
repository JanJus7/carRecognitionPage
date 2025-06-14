FROM python:3.11-slim

ENV UPLOAD_DIR=/app/uploads

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

RUN mkdir -p $UPLOAD_DIR

COPY . .

EXPOSE 5000

CMD ["python", "main.py"]

