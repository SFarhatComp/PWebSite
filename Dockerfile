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
COPY static /app/static

# Expose the port the app runs on
EXPOSE 5000

# Set environment variables
ENV FLASK_APP=app.py
ENV FLASK_ENV=production

# Command to run the application
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"] 