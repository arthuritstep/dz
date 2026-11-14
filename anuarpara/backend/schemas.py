from pydantic import BaseModel, Field

class UserCreate(BaseModel):
    username: str

class TransactionCreate(BaseModel):
    user_id: int
    amount: float = Field(gt=0)