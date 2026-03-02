FROM python:3.14 as fast


RUN pip3.14 install "fastapi[standard]"

COPY ./fast.py ./fast.py


CMD ["fastapi", "run", "./fast.py", "--port", "80"]