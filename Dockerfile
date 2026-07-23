# Stage 1: Build the multi-module project
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy the pom files and source modules explicitly
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

# This targets the executable spring-boot jar directly inside the scheduler module output path
COPY --from=build /app/scheduler/target/scheduler-*.jar app.jar

EXPOSE 8080

# This executes the class directly so you don't hit manifest issues
ENTRYPOINT ["java", "-cp", "app.jar", "org.springframework.boot.loader.launch.JarLauncher"]
