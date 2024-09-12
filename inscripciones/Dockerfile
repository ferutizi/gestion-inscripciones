# Usa una imagen base con OpenJDK
FROM openjdk:17-jdk-slim

# Copia el archivo JAR al contenedor
COPY target/inscripciones-0.0.1-SNAPSHOT.jar /app/inscripciones.jar

# Establece el directorio de trabajo
WORKDIR /app

# Expone el puerto en el que la aplicación estará escuchando
EXPOSE 8080

# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "inscripciones.jar"]
