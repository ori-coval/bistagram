from setuptools import setup, find_packages

setup(
    name="bistagram_backend",
    version="0.1",
    author="Adir & Dor & Ori",
    packages=find_packages(),
    install_requires=[
        "fastapi[standard]",
        "uvicorn",
        "sqlalchemy",
        "bcrypt==4.3.0",
        "python-multipart",
        "aiofiles",
        "python-jose",
        "pymysql",
        "cryptography"
    ],
)