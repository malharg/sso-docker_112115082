# SSO (Single Sign-On) Project

The SSO project is designed to provide a centralized authentication system, allowing users to authenticate once and gain access to multiple systems without needing to log in again. This repository includes the necessary components to deploy the SSO service using Docker.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

These instructions will cover usage information and for the docker deployment of the project.

### Configuring Your Environment

Adjust the `.env` file according to your preferences. You might need to specify the following:
- Database connection details
- Service ports
- Any external API keys or configurations needed

### Building the Docker Containers

To get the environment set up and running, follow these steps:

1. Clone the repository:
```bash
   git clone https://github.com/your-username/SSO.git
   cd SSO
```

2. Build and start the containers in the background:
```bash 
docker-compose up --build -d 
```
3. Check the status of the containers:
```bash
docker-compose ps
```
The above commands will build the necessary Docker images, start the services defined in docker-compose.yml, and detach them to run in the background.
Accessing the Application

After the containers are up and running, you can access the SSO service at:

    http://localhost:[PORT] - Replace [PORT] with the port configured in your .env or docker-compose.yml.

### Managing the Docker Containers

To stop the containers:

```bash
docker-compose down
```

To view the logs:
```bash
docker-compose logs
```

To execute commands inside a container:
```bash
docker-compose exec [SERVICE_NAME] [COMMAND]
```
Replace [SERVICE_NAME] with the name of the service as defined in docker-compose.yml and [COMMAND] with the command you wish to execute (e.g., bash for a shell).

## Contributing

We welcome contributions to this project! Please refer to the CONTRIBUTING.md for more details on how to submit pull requests, report bugs, or request new features.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.




