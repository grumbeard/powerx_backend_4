# Assignment: PowerX Backend Module Session 4

## Objectives

This assignment makes use of WebSockets and RabbitMQ message broker to implement event-driven processing.


## Requirements

- A WebSocket endpoint /heartbeat that sends heartbeat messages to clients
- A producer that publishes heartbeat messages to the heartbeat queue
- A consumer that subscribes to the heartbeat queue and writes the messages to a file log.txt (append-mode)

Heartbeat messages to send/publish:

1. Every minute: “I’m alive at ${datetime}!”
2. Every 42nd minute of the hour: “42 is the meaning to life!”


## Installation

### Step 1: Set up RabbitMQ

#### **With RabbitMQ account**

- Create an instance (e.g. on CloudAMQP) and add the AMQP URL to CLOUDAMQP environment variable in the .env file

- The admin console can be viewed at the RabbitMQ Manager provided by the chosen platform


#### **With Docker**

- Spin up an instance of RabbitMQ from a Docker image

- #### `docker run -d -p 5672:5672 -p 15672:15672 rabbitmq:3-management`

- The admin console can be viewed at `http://localhost:15672`


### Step 2: Launch Worker

- #### `npm run worker`


### Step 3: Launch App

- #### `npm run start`


### Step 4: Visit /heartbeat Endpoint

- Navigate to `localhost:3000/heartbeat` in the browser



### Step 5: View Logs

- After 5 minutes, there should be heartbeat messages logged in the `logs/log.txt` file


## Expected Outcome
1. `logs/log.txt` file is cleared
2. Every minute, for 5 minutes, a message will appear in the console stating that heartbeat was logged at the datetime of occurrence
3. At each minute, heartbeat message is appended at `logs/log.txt`
4. Heartbeat message is published and consumed, brokered by RabbitMQ exchange


### Screenshot of Empty Queue After Message Published and Consumed
![Image 20-9-21 at 3 30 PM](https://user-images.githubusercontent.com/51464365/133968976-2bcfdb3e-e197-494f-b47e-585277106655.jpg)
