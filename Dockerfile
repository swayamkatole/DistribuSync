# Stage 1: Build the multi-module project
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy configuration and subfolder modules explicitly
COPY pom.xml .
COPY common ./common
COPY proto ./proto
COPY scheduler ./scheduler
COPY worker ./worker

# Build the system binaries while skipping test suites
RUN mvn clean package -DskipTests

# Stage 2: Deploy and run using Eclipse Temurin Java 17 Runtime
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# Copy the built jar from your primary runnable module (scheduler)
COPY --from=build /app/scheduler/target/scheduler-*.jar app.jar

EXPOSE 8080

# This executes your application jar directly using the standard Java archive runner tool
ENTRYPOINT ["java", "-jar", "app.jar"]
