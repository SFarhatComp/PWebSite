# Use Node.js for building the React app
FROM node:16 AS build

# Set working directory
WORKDIR /app

# Copy package.json first (and package-lock.json if it exists)
COPY package.json ./
# Run npm install which will generate package-lock.json
RUN npm install

# Copy all project files
COPY . .

# Build the React app
RUN npm run build

# Use Python for the Flask backend
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Copy Python requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the built React app from the previous stage
COPY --from=build /app/build /app/build

# Copy the Flask app and static files
COPY app.py .
COPY content.yaml .
COPY static /app/static

# Cloud Run uses PORT environment variable - IMPORTANT CHANGE
ENV PORT 8080
EXPOSE 8080

# Set environment variables
ENV FLASK_APP=app.py
ENV FLASK_ENV=production

# Command to run the application - updated to use PORT env variable
CMD exec gunicorn --bind :$PORT --workers 4 --timeout 0 app:app 