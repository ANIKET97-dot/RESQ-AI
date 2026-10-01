from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.api.router import router

app = FastAPI(
    title="RESQAI Backend API",
    description="AI-Powered Disaster Intelligence & Emergency Decision-Support Platform API",
    version="1.0.0"
)

# Enable CORS for local frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/")
def root():
    return {
        "app": "RESQAI",
        "tagline": "Connect information. Understand risk. Respond faster.",
        "status": "Operational",
        "demo_mode": True,
        "disclaimer": "DEMO DATA — NOT LIVE EMERGENCY INFORMATION"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
