# Marketing Analytics Demo Application

This interactive web application, built with Next.js, is designed to showcase key marketing analytics technologies. It provides a series of interactive demos, enabling users to explore the functionality of Durable Measurement, Machine Learning Modeling, Value-Based Bidding, MTA & MMM Attribution, and Geo & Pre/Post Lift Studies. This application is designed for deployment in a cloud environment.

## Architectural Overview

The application is built using modern JavaScript and follows a component-based architecture using React. Key components are developed with reusability, maintainability, and scalability in mind. The Next.js App Router provides clear routing logic, separating server-side rendering from client-side interactivity, making the application both fast and robust.

## Key Features

-   **Interactive Demos:** Provides hands-on demos of five distinct marketing analytics technologies.
-   **Responsive Design:** Fully responsive layout, optimized for various screen sizes using Tailwind CSS's responsive utilities.
-   **Dark Mode Support:** Utilizes OS preference for dark mode, improving user experience across different environments, and can be easily extended.
-   **Dockerized:** Containerized with Docker, ensuring consistent deployment across different environments. A multi-stage Dockerfile is used for an optimized image size.
-   **Cloud Deployment:** Designed for deployment on Google Cloud Run, a serverless compute platform.
-   **Brand Aligned:** Consistent styling via Tailwind CSS and a custom color and font palette.
-   **Component-Based:** Clear separation of concerns via a modular component design.

## Technologies

-   **Next.js (v13+)**: A React framework that includes server-side rendering, client-side navigation, and other built-in features.
-   **React (v18+)**: For reusable and interactive UI components. Utilizes React Hooks for state management.
-   **Tailwind CSS (v3+)**: A utility-first CSS framework for consistent and efficient styling.
-    **react-syntax-highlighter**: For code formatting and presentation.
    **react-chartjs-2**: For displaying graphs and data visualizations.
-   **Docker**: A platform for containerization. The application includes a multi-stage docker file for optimized deployments.
-   **Google Cloud Run**: A serverless compute platform for scalable deployments.
-   **NPM**: For managing application dependencies.

## Prerequisites

Before deployment, ensure you have the following installed:

-   **Node.js** (v18 or later) and npm (or yarn/pnpm) for local development.
-   **Docker Desktop** (or Docker Engine) for building container images.
-   **Google Cloud SDK (gcloud CLI)** for cloud resource management.
-   A Google Cloud Platform (GCP) project with the appropriate permissions.

## Deployment Instructions

### 1. Local Development Setup

1.  **Clone the repository:**
    ```bash
    git clone [YOUR_REPOSITORY_URL]
    cd [YOUR_REPOSITORY_NAME]
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:3000`.

### 2. Docker Build & Push

1.  **Dockerfile:** A `Dockerfile` is located at the root of the project. It follows a multi-stage build process for optimized deployments:
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

2.  **Build the Docker Image:**
    ```bash
    docker build --platform linux/amd64 -t marketing-demo-app .
    ```
3.  **Tag the Docker Image:**
    ```bash
     docker tag marketing-demo-app gcr.io/[YOUR_PROJECT_ID]/bonfire
    ```
    Replace `[YOUR_PROJECT_ID]` with your Google Cloud Project ID. The tag should match the application name.

4.  **Authenticate Docker with Google Cloud:**
    ```bash
    gcloud auth configure-docker
    ```
5.  **Push the Docker Image to Google Container Registry (GCR):**
    ```bash
    docker push gcr.io/[YOUR_PROJECT_ID]/bonfire
    ```

### 3. Deploy to Google Cloud Run

1.  **Deploy the Service:**
    ```bash
    gcloud run deploy bonfire-app \
        --image gcr.io/[YOUR_PROJECT_ID]/bonfire \
        --region us-central1 \
        --allow-unauthenticated \
        --platform managed
    ```
    Replace `[YOUR_PROJECT_ID]` with your Google Cloud project ID, and the region with your desired region. This will deploy your application to Cloud Run.

## Accessing the Deployed Application

Once deployed, access your application via the URL provided by the `gcloud run deploy` command.

## Considerations for Production

-   **Authentication and Authorization:**  Configure proper authentication and authorization to secure your application for production use.
-   **CI/CD Pipeline:** Implement a robust CI/CD pipeline using tools like GitHub Actions to automate the build, test, and deployment processes.
-   **Monitoring and Logging:** Integrate with monitoring tools to track performance, usage and error logs.
-    **Automated Testing:** Consider integration with automated tests, such as unit, integration, and end-to-end tests.
-   **Scalability:** Google Cloud Run will automatically scale the application based on demand.

## Further Development

-   Explore integrating with more data sources via APIs.
-   Consider extending the application's capabilities with more complex data visualizations, and interactive charts.
-   Implement data persistence, so that users can save their changes, and resume from where they left off.
-   Add user authentication for multi-user demos.

## Contributing

Contributions are welcome! Please open an issue to discuss your idea before submitting a pull request.