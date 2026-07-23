# Stage 1: Build the application using Maven
FROM maven:3.9.4-eclipse-temurin-17 AS build
WORKDIR /app

# Copy the pom.xml files and download dependencies
COPY pom.xml .
# If you have a parent pom and module poms, copy them all. 
# For simplicity, we copy everything:
COPY . .

# Build the project (skip tests to speed up deployment)
RUN mvn clean package -DskipTests

# Stage 2: Run the application
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# IMPORTANT: You must change "scheduler" and the .jar name below 
# to match your actual compiled module.
COPY --from=build /app/scheduler/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
