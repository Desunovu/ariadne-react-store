FROM python:3.10-alpine


WORKDIR /app
COPY . .
RUN pip install -r ./requirements.txt

ENV FLASK_APP="store_backend.py"
ENTRYPOINT ["sh", "./docker-entrypoint.sh"]