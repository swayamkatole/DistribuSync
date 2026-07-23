# Stage 1: Build the multi-module project using standard Maven 3.9 + Java 17
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy the main pom.xml file
COPY pom.xml .

# Copy your actual sub-module directories
COPY common ./common
COPY proto ./proto
COPY scheduler ./scheduler
COPY worker ./worker

# Build the project binaries while skipping the unit test suites
RUN mvn clean package -DskipTests

# Stage 2: Deploy and run using Eclipse Temurin Java 17 Runtime image
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# Copy the built jar from your primary runnable module (scheduler)
COPY --from=build /app/scheduler/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
