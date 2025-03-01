'''
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}


from routes import students, ai, monitoring
app.include_router(students.router)
app.include_router(ai.router)
app.include_router(monitoring.router)


'''

# Version 2
'''
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import students, ai, monitoring

# Create the FastAPI app instance
app = FastAPI()

# Enable CORS to allow requests from React on port 5173
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allow the frontend to access the API
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Include your route modules
app.include_router(students.router)
app.include_router(ai.router)
app.include_router(monitoring.router)

@app.get("/")
def read_root():
    return {"message": "Hello, World!"}

    '''

#version 3

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import students, ai, monitoring  # Ensure monitoring is correctly imported

# Create the FastAPI app instance
app = FastAPI()

# Enable CORS to allow requests from React on port 5173
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allow the frontend to access the API
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Include your route modules
app.include_router(students.router)
app.include_router(ai.router)
app.include_router(monitoring.router)  # Ensure this line is correct



@app.get("/")
def read_root():
    return {"message": "Hello, World!"}




