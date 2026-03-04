FROM python:3.14 AS fast

COPY . .

RUN pip3.14 install .


CMD ["fastapi", "run", "./main.py", "--port", "80"]