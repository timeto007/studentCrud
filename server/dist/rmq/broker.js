"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Broker = void 0;
const Exchange_1 = require("./Exchange");
const callback_api_1 = require("amqplib/callback_api");
const responseModel_1 = require("../student/dto/responseModel");
class Broker {
    constructor() {
        this.queueURLMap = {};
        this.topicNames = [];
        this.init_broker();
    }
    static getInstance() {
        if (!Broker.instance) {
            Broker.instance = new Broker();
        }
        return Broker.instance;
    }
    async init_broker() {
        try {
            console.log('Connecting to rabbitmq ' + this.rabbitmqURL);
            callback_api_1.default.connect(this.rabbitmqURL, (err, connection) => {
                if (err) {
                    console.log('from connection', err);
                }
                connection.createChannel((err, channel) => {
                    if (err) {
                        console.log('from connection', err);
                    }
                    this.channel = channel;
                    const topics = Exchange_1.default.Topics;
                    for (let i = 0; i < topics.length; i++) {
                        let topic = topics[i];
                        let topicName = topic.TopicName;
                        this.topicNames.push(topicName);
                        channel.assertExchange(topicName, 'fanout', {
                            durable: true,
                        });
                        let subscribers = topic.Subscribers;
                        for (let j = 0; j < subscribers.length; j++) {
                            let subscriber = subscribers[j];
                            let queueName = subscriber.QueueName;
                            channel.assertQueue(queueName, {
                                exclusive: false,
                            });
                            channel.bindQueue(queueName, topicName, '');
                            let queueURLMapValue = {
                                queueName: queueName,
                                OnSuccessTopicsToPush: subscriber.OnSuccessTopicsToPush,
                                OnFailureTopicsToPush: subscriber.OnFailureTopicsToPush,
                            };
                            this.queueURLMap[queueName] = queueURLMapValue;
                        }
                    }
                });
            });
        }
        catch (error) {
            console.log(error.message, 'Ckeck  rabbitmq is running ...');
        }
    }
    PublicMessageToTopic(topicName, message) {
        console.log('Message Received in broker to publish', message, topicName);
        const data = JSON.stringify(message);
        if (this.topicNames.includes(topicName)) {
            this.channel.publish(topicName, '', data);
            var response = new responseModel_1.default(200, 'SUCCESS', 'POST', `Successfully published into Topic Name : ${topicName} `, {});
        }
        else {
            var response = new responseModel_1.default(400, 'FAILED', 'POST', `Unalble to publish to Topic Name : ${topicName} `, {});
        }
        return response;
    }
    async listenToService(topicName, serviceName, callBack) {
        try {
            const queueURLMapValue = this.queueURLMap[topicName + '-' + serviceName];
            const queueName = queueURLMapValue.queueName;
            this.channel.consume(queueName, (msg) => {
                if (msg.content) {
                    let message = JSON.parse(msg.content);
                    callBack({
                        message,
                        OnSuccessTopicsToPush: queueURLMapValue.OnSuccessTopicsToPush,
                        OnFailureTopicsToPush: queueURLMapValue.OnFailureTopicsToPush,
                    });
                }
            }, { noAck: true });
        }
        catch (e) {
            setTimeout(() => {
                this.listenToService(topicName, serviceName, callBack);
            }, 5000);
        }
    }
    listenToServices(serviceName, callback) {
        let topics = Exchange_1.default.Topics;
        for (let i = 0; i < topics.length; i++) {
            let topic = topics[i];
            let topicName = topic.TopicName;
            let subscribers = topic.Subscribers;
            for (let j = 0; j < subscribers.length; j++) {
                let subscriber = subscribers[j];
                let vServiceName = subscriber.Service;
                if (vServiceName === serviceName) {
                    this.listenToService(topicName, serviceName, callback);
                }
            }
        }
    }
}
exports.Broker = Broker;
//# sourceMappingURL=broker.js.map