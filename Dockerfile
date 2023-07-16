FROM python:3.10-alpine


WORKDIR /app
COPY . .
RUN pip install -r ./requirements.txt

ENTRYPOINT ["sh", "/app/docker-entrypoint.sh"]
