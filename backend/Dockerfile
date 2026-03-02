FROM python:3.14 as fast

RUN pip3.14 install "fastapi[standard]"
RUN pip3.14 install fastapi uvicorn sqlalchemy databases pymysql aiomysql cryptography

COPY . .

CMD ["fastapi", "run", "./main.py", "--port", "80"]