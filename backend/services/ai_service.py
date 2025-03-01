# import google.generativeai as genai
# from config import GEMINI_API_KEY

# genai.configure(api_key=GEMINI_API_KEY)

# def get_hint(question):
#     model = genai.GenerativeModel("gemini-pro")
#     response = model.generate_content(question)
#     return response.text

import google.generativeai as genai
from config import GEMINI_API_KEY
import logging
import traceback

# Configure logging
logging.basicConfig(level=logging.DEBUG)

genai.configure(api_key=GEMINI_API_KEY)

def get_hint(question):
    try:
        logging.debug(f"Generating hint for question: {question}")

        model = genai.GenerativeModel("gemini-2.0-flash")
        response = model.generate_content(question)

        # Log full response structure
        logging.debug(f"Raw AI Response: {response}")

        # Ensure response is valid before accessing .text
        if hasattr(response, "text"):
            return response.text
        else:
            logging.error("Response object has no attribute 'text'")
            return "Error: AI response is invalid."

    except Exception as e:
        logging.error(f"Gemini API error: {e}")
        traceback.print_exc()  # Print the full error traceback
        return f"Error: {str(e)}"

