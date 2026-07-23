# Stage 1: Build all modules
FROM maven:3.9.4-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Stage 2: Base image for running
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
# Copy both jars
COPY --from=build /app/scheduler/target/*.jar scheduler.jar
COPY --from=build /app/worker/target/*.jar worker.jar
