FROM python:3.12-slim

ARG UPLOAD_DIR=/app/uploads

ENV UPLOAD_DIR=${UPLOAD_DIR}

RUN apt-get update && apt-get upgrade -y && apt-get clean

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

RUN mkdir -p $UPLOAD_DIR

COPY . .

EXPOSE 5000

CMD ["python", "main.py"]

