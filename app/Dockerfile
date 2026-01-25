FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY . .

RUN chmod +x mvnw

EXPOSE 10000

CMD ["java", "-jar", "target/*.jar"]
