from fastapi import APIRouter, Depends
from models.user import User

router = APIRouter()

@router.get("/students")
def get_students():
    return [{"id": 1, "name": "John Doe"}]
