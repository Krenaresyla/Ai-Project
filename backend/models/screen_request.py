from pydantic import BaseModel

class ScreenRequest(BaseModel):
    question: str
    screen_context: str = ""