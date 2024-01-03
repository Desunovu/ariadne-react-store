#!/bin/sh

python -m gunicorn --preload --bind 0.0.0.0:5000 wsgi:app
