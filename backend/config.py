class Settings:
    HOST: str = '0.0.0.0'
    PORT: int = 8000
    API_V1_STR: str = '/api'
    ENVIRONMENT: str = 'development'
    CORS_ORIGINS: list = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:3000",
        "*"
    ]

settings = Settings()
