# Marketing Analytics Demo Application

This is an interactive web application built with Next.js, designed to showcase various marketing analytics technologies. It includes demos for Durable Measurement, Machine Learning Modeling, Value-Based Bidding, MTA & MMM Attribution, and Geo & Pre/Post Lift Studies.

## Features

-   Interactive demos for five different marketing analytics technologies.
-   Responsive design with a hamburger menu for navigation.
-   Dark mode support based on OS preference.
-   Dockerized for easy deployment.
-   Deployment on Google Cloud Run.

## Technologies

-   **Next.js:** A React framework for building web applications.
-   **Tailwind CSS:** A utility-first CSS framework.
-   **Docker:** A platform for containerization.
-   **Google Cloud Run:** A serverless compute platform.

## Prerequisites

Before you begin, ensure you have the following installed:

-   [Node.js](https://nodejs.org/) (version 18 or later) and npm (or yarn/pnpm).
-   [Docker Desktop](https://www.docker.com/products/docker-desktop) (or Docker Engine).
-   [Google Cloud SDK (gcloud CLI)](https://cloud.google.com/sdk/docs/install)
-   A Google Cloud Platform (GCP) project.

## Setup Instructions

1.  **Clone the repository:**

    ```bash
    git clone [YOUR_REPOSITORY_URL]
    cd [YOUR_REPOSITORY_NAME]
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:3000`.

## Build and Deploy with Docker and Google Cloud Run

### 1. Build the Docker Image

1.  Ensure you have a `Dockerfile` in the root directory of your project. If you do not, create one using these instructions:
```dockerfile
    # Use a Node.js base image
    FROM node:18-alpine AS builder

    # Set the working directory
    WORKDIR /app

    # Copy package.json and package-lock.json
    COPY package*.json ./

    # Install dependencies
    RUN npm install

    # Copy the rest of the application
    COPY . .

    # Build the Next.js app
    RUN npm run build

    # Stage 2: Production image
    FROM node:18-alpine

    # Set working directory
    WORKDIR /app

    # Copy production dependencies from builder
    COPY --from=builder /app/package*.json ./
    RUN npm install --production

    # Copy built Next.js app from the builder
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/public ./public
    RUN if [ -f /app/next.config.js ]; then \
        COPY --from=builder /app/next.config.js ./; \
    fi

    # Expose port 3000 (default Next.js port)
    EXPOSE 3000

    # Command to start the application
    CMD ["npm", "start"]
```
2.  Build the Docker image, targeting the `amd64` architecture:

    ```bash
    docker build --platform linux/amd64 -t marketing-demo-app .
    ```
3.  Tag the image so it's ready to push to your Google Container Registry:
    ```bash
    docker tag marketing-demo-app gcr.io/[YOUR_PROJECT_ID]/bonfire
    ```

    Replace `[YOUR_PROJECT_ID]` with your Google Cloud project ID (e.g. `as-dev-pat`).
    *   The tag that you use, should match the application name.

### 2. Push the Docker Image to Google Container Registry (GCR)

1.  Authenticate your Docker client with your Google Cloud account:

    ```bash
    gcloud auth configure-docker
    ```

2.  Push the image to GCR:

    ```bash
    docker push gcr.io/[YOUR_PROJECT_ID]/bonfire
    ```

    Replace `[YOUR_PROJECT_ID]` with your Google Cloud Project ID.

### 3. Deploy to Google Cloud Run using `gcloud` CLI

1.  Deploy your service using the gcloud CLI:

    ```bash
    gcloud run deploy bonfire-app \
        --image gcr.io/[YOUR_PROJECT_ID]/bonfire \
        --region us-central1 \
        --allow-unauthenticated \
        --platform managed
    ```

    Replace `[YOUR_PROJECT_ID]` with your Google Cloud project ID, and the region with your desired region.
    *  This command will deploy your application to Cloud Run, and provide you with a URL where your service will be available.

## Accessing Your Deployed Application

Once your application is deployed, copy the URL provided by the `gcloud run deploy` command, and paste it into your browser.

## Additional Notes

-   For a production environment, consider setting up proper authentication and authorization.
-   You can customize the Dockerfile and Cloud Run settings as needed.
-   If you encounter any issues or errors, please refer to the Docker, Google Cloud Run, and Google Cloud SDK documentation.

## Further Steps

-   You can use `npm run build` to create a production build of your application.
-   You can extend this app by connecting to an external data source, and/or displaying more complex data visualizations.

## Contributing

If you want to contribute to this project, please open an issue first to discuss your idea before making a pull request.
