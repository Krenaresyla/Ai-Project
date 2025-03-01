from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Construct the database URL
SQLALCHEMY_DATABASE_URL = f"postgresql://{os.getenv('TUTOR_USER')}:{os.getenv('SECUREPASSWORD')}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('AI_TUTORING')}"

# Debugging: Print the database URL to check if environment variables are loading correctly
#print("EMAA Ellki Krenki", SQLALCHEMY_DATABASE_URL)

# Create engine and session
engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
