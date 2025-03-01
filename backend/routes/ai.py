'''

from fastapi import HTTPException
from fastapi import APIRouter
from services.ai_service import get_hint

router = APIRouter()

@router.post("/ai/hint")
def ai_hint(question: str):
    try:
        hint = get_hint(question)
        return {"hint": hint}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    '''




# from fastapi import HTTPException, APIRouter
# from pydantic import BaseModel
# from services.ai_service import get_hint

# router = APIRouter()

# # Define a Pydantic model for the request body
# class AIRequest(BaseModel):
#     question: str

# @router.post("/ai/hint")
# def ai_hint(request: AIRequest):
#     try:
#         hint = get_hint(request.question)  # Access question properly
#         return {"hint": hint}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# from fastapi import HTTPException, APIRouter
# from pydantic import BaseModel
# from services.ai_service import get_hint

# router = APIRouter()

# # Existing model and endpoint for general AI hints
# class AIRequest(BaseModel):
#     question: str

# @router.post("/ai/hint")
# def ai_hint(request: AIRequest):
#     try:
#         hint = get_hint(request.question)
#         return {"hint": hint}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# # New model for screen-sharing endpoint
# class ScreenRequest(BaseModel):
#     question: str

# @router.post("/ai/screen")
# def ai_screen(request: ScreenRequest):
#     try:
#         # Here you can add any screen-specific logic if needed.
#         # For now, we reuse the get_hint function.
#         feedback = get_hint(request.question)
#         return {"feedback": feedback}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# from fastapi import HTTPException, APIRouter
# from pydantic import BaseModel
# from services.ai_service import get_hint

# router = APIRouter()

# # Model for the /ai/hint endpoint (unchanged)
# class AIRequest(BaseModel):
#     question: str

# @router.post("/ai/hint")
# def ai_hint(request: AIRequest):
#     try:
#         hint = get_hint(request.question)
#         return {"hint": hint}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# # Model for the /ai/screen endpoint
# class ScreenRequest(BaseModel):
#     question: str
#     # Optional additional context from the screen (e.g., OCR extracted text or manual input)
#     screen_context: str = None

# @router.post("/ai/screen")
# def ai_screen(request: ScreenRequest):
#     try:
#         # Here you can add any screen-specific logic if needed.
#         # For example, if screen_context is provided, combine it with the question.
#         prompt = request.question
#         if request.screen_context:
#             prompt = f"Screen Context: {request.screen_context}\nQuestion: {request.question}"
        
#         # Call the Gemini AI integration using the constructed prompt.
#         feedback = get_hint(prompt)
#         return {"feedback": feedback}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# backend/routes/ai.py
from fastapi import APIRouter, HTTPException
from models.screen_request import ScreenRequest
from services.ai_service import get_hint  # Assume this calls Gemini AI
from pydantic import BaseModel

router = APIRouter()

# Existing /ai/hint endpoint remains unchanged...
class AIRequest(BaseModel):
    question: str

@router.post("/ai/hint")
def ai_hint(request: AIRequest):
    try:
        hint = get_hint(request.question)
        return {"hint": hint}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# New endpoint for screen sharing queries
@router.post("/ai/screen")
def ai_screen(request: ScreenRequest):
    try:
        # Build a prompt that includes the screen context if provided.
        prompt = request.question
        if request.screen_context:
            prompt = f"Screen Context: {request.screen_context}\nQuestion: {request.question}"
        
        # Call your Gemini AI integration (here using get_hint for example)
        feedback = get_hint(prompt)
        return {"feedback": feedback}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))