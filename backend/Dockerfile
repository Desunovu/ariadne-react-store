FROM python:3.10-alpine

RUN mkdir "backend"
WORKDIR /backend
COPY /backend/requirements.txt ./
RUN pip install -r ./requirements.txt

COPY /backend/ ./
ENTRYPOINT ["sh", "/backend/docker-entrypoint.sh"]
